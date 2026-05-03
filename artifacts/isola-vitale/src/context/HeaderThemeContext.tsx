import React, { createContext, useContext, useState } from 'react';

interface HeaderThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
}

const HeaderThemeContext = createContext<HeaderThemeContextType>({ theme: 'dark', setTheme: () => {} });

export function HeaderThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState('dark');

  return (
    <HeaderThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </HeaderThemeContext.Provider>
  );
}

export function useHeaderTheme() {
  return useContext(HeaderThemeContext);
}
