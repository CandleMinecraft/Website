import { useState, useEffect } from 'react';

type CookieOptions = {
  expires?: Date;
  path?: string;
  secure?: boolean;
  sameSite?: 'Strict' | 'Lax' | 'None';
};

const canUseCookies = (isConsentCookie: boolean = false): boolean => {
  try {
    // Wenn es der Consent-Cookie selbst ist, prüfen wir nur die technische Verfügbarkeit
    if (isConsentCookie) {
      document.cookie = 'cookietest=1';
      const result = document.cookie.indexOf('cookietest=') !== -1;
      document.cookie = 'cookietest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT';
      return result;
    }

    // Für alle anderen Cookies prüfen wir auch die Zustimmung
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

  console.log(`[Cookie Debug] Setting cookie: ${cookieString}`);
  document.cookie = cookieString;
};

const getCookie = (name: string): string | null => {
  const cookies = document.cookie.split(';');
  const cookieName = encodeURIComponent(name);

  for (const cookie of cookies) {
    const [key, value] = cookie.trim().split('=');
    if (key === cookieName) {
      console.log(`[Cookie Debug] Getting cookie ${name}: ${decodeURIComponent(value)}`);
      return decodeURIComponent(value);
    }
  }

  console.log(`[Cookie Debug] Cookie ${name} not found`);
  return null;
};

export function useCookie<T>(
  key: string,
  initialValue: T,
  options: CookieOptions = {}
): [T, (value: T) => void] {
  const isConsentCookie = key === 'cookieConsent';
  const cookiesAllowed = canUseCookies(isConsentCookie);
  console.log(`[Cookie Debug] Cookie ${key} - Can use cookies: ${cookiesAllowed}, Is consent cookie: ${isConsentCookie}`);

  const [state, setState] = useState<T>(() => {
    if (!cookiesAllowed) {
      console.log(`[Cookie Debug] Using initial value for ${key}: ${JSON.stringify(initialValue)}`);
      return initialValue;
    }
    
    try {
      const cookieValue = getCookie(key);
      const value = cookieValue ? JSON.parse(cookieValue) : initialValue;
      console.log(`[Cookie Debug] Initializing ${key} with value: ${JSON.stringify(value)}`);
      return value;
    } catch (error) {
      console.log(`[Cookie Debug] Error parsing cookie ${key}, using initial value:`, error);
      return initialValue;
    }
  });

  const setValue = (value: T): void => {
    console.log(`[Cookie Debug] Setting value for ${key}: ${JSON.stringify(value)}`);
    console.log(`[Cookie Debug] Can use cookies: ${cookiesAllowed}`);
    
    setState(value);
    if (cookiesAllowed) {
      console.log(`[Cookie Debug] Saving ${key} to cookie`);
      setCookie(key, JSON.stringify(value), options);
    } else {
      console.log(`[Cookie Debug] Not saving ${key} to cookie - cookies not allowed`);
    }
  };

  // Lösche den Cookie wenn er nicht mehr verwendet werden darf
  useEffect(() => {
    if (!cookiesAllowed) {
      console.log(`[Cookie Debug] Cookies not allowed - deleting cookie ${key}`);
      const expires = new Date(0);
      setCookie(key, '', { ...options, expires });
    }
  }, [cookiesAllowed, key]);

  return [state, setValue];
}