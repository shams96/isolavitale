"use client";
import React, { createContext, useContext, useState } from 'react';

const HeaderThemeContext = createContext();

export function HeaderThemeProvider({ children }) {
    const [theme, setTheme] = useState('dark'); // 'dark' (light text) or 'light' (dark text)

    return (
        <HeaderThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </HeaderThemeContext.Provider>
    );
}

export function useHeaderTheme() {
    return useContext(HeaderThemeContext);
}
