import { useState, useEffect } from 'react';

type CookieOptions = {
  expires?: Date;
  path?: string;
  secure?: boolean;
  sameSite?: 'Strict' | 'Lax' | 'None';
};

const canUseCookies = (isConsentCookie: boolean = false): boolean => {
  try {
    // For the consent cookie itself, only check technical availability
    if (isConsentCookie) {
      document.cookie = 'cookietest=1';
      const result = document.cookie.indexOf('cookietest=') !== -1;
      document.cookie = 'cookietest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT';
      return result;
    }

    // For other cookies, also check for user consent
    const consentValue = document.cookie
      .split(';')
      .find(cookie => cookie.trim().startsWith('cookieConsent='));
    
    return consentValue?.includes('true') ?? false;
  } catch (e) {
    return false;
  }
};

const setCookie = (name: string, value: string, options: CookieOptions = {}): void => {
  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  if (options.expires) {
    cookieString += `; expires=${options.expires.toUTCString()}`;
  }

  if (options.path) {
    cookieString += `; path=${options.path}`;
  }

  if (options.secure) {
    cookieString += '; secure';
  }

  if (options.sameSite) {
    cookieString += `; samesite=${options.sameSite}`;
  }

  document.cookie = cookieString;
};

const getCookie = (name: string): string | null => {
  const cookies = document.cookie.split(';');
  const cookieName = encodeURIComponent(name);

  for (const cookie of cookies) {
    const [key, value] = cookie.trim().split('=');
    if (key === cookieName) {
      return decodeURIComponent(value);
    }
  }

  return null;
};

export function useCookie<T>(
  key: string,
  initialValue: T,
  options: CookieOptions = {}
): [T, (value: T) => void] {
  const isConsentCookie = key === 'cookieConsent';
  
  // Create a reactive state for cookie consent by polling document.cookie
  const [cookiesAllowed, setCookiesAllowed] = useState<boolean>(canUseCookies(isConsentCookie));
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCookiesAllowed(canUseCookies(isConsentCookie));
    }, 500); // poll every 500ms (adjust as needed)
    return () => clearInterval(interval);
  }, [isConsentCookie]);

  const [state, setState] = useState<T>(() => {
    if (!cookiesAllowed) {
      return initialValue;
    }
    
    try {
      const cookieValue = getCookie(key);
      const value = cookieValue ? JSON.parse(cookieValue) : initialValue;
      return value;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: T): void => {
    
    setState(value);
    if (cookiesAllowed) {
      setCookie(key, JSON.stringify(value), options);
    } else {
    }
  };

  // When cookies become allowed (e.g. consent granted), sync the current state to cookie.
  useEffect(() => {
    if (cookiesAllowed) {
      setCookie(key, JSON.stringify(state), options);
    }
  }, [cookiesAllowed, state, key]);

  // When cookies are disallowed, delete the cookie.
  useEffect(() => {
    if (!cookiesAllowed) {
      const expires = new Date(0);
      setCookie(key, '', { ...options, expires });
    }
  }, [cookiesAllowed, key]);

  return [state, setValue];
}
