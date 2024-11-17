import React, { createContext, useContext, useState } from 'react';

// Define the ThemeContext
const ThemeContext = createContext();

// Define the ThemeProvider component
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState({
        primary: '#3498db',
        secondary: '#2ecc71',
        accent: '#e74c3c',
        background: '#ecf0f1',
        text: '#2c3e50'
    });

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Custom hook to use the ThemeContext
export const useTheme = () => {
    return useContext(ThemeContext);
};