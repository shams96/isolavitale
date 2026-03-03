"use client";
import { useEffect } from 'react';
import { useHeaderTheme } from '@/context/HeaderThemeContext';

export default function ThemeSetter({ theme }) {
    const { setTheme } = useHeaderTheme();

    useEffect(() => {
        setTheme(theme);
        return () => setTheme('dark'); // Restore default on unmount
    }, [theme, setTheme]);

    return null;
}
