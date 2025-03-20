"use client";

import { useCookie } from '@/hooks/useCookie';
import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
    theme: "light" | "dark";
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [mounted, setMounted] = useState(false);
    const [systemTheme, setSystemTheme] = useState<"light" | "dark">(() => {
        // Ensure theme is set before hydration by checking system preference
        return typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    });

    // Ensure client-side rendering only
    useEffect(() => {
        setMounted(true);
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const updateTheme = () => setSystemTheme(mediaQuery.matches ? "dark" : "light");
        mediaQuery.addEventListener("change", updateTheme);
        return () => mediaQuery.removeEventListener("change", updateTheme);
    }, []);

    // Load theme from cookies
    const [theme, setTheme] = useCookie<Theme>('theme', 'system', {
        expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
        path: '/'
    });

    // Apply the theme class immediately to prevent FOUC
    useEffect(() => {
        if (theme === "system") {
            document.documentElement.className = systemTheme;
        } else {
            document.documentElement.className = theme;
        }
    }, [theme, systemTheme]);

    // Prevent flashing incorrect theme on first render
    if (!mounted) return null;

    return (
        <ThemeContext.Provider value={{ theme: theme === "system" ? systemTheme : theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
