import React, { createContext, useContext, useState, useEffect } from "react";
import {useAuth} from './auth';

const ThemeContext = createContext({
    theme: null,
    themeType: null,
    changeTheme: null,
});

const ThemeProvider = ({ children }) => {
  const lightTheme = {
    gradientFirstColor: '#FEA76A',
    gradientSecondColor: '#E36771',
    textColor: '#212121',
    textMuted: '#444',
    white: '#FFF',
    border: '#212121',
    muted: 'rgba(0,0,0,0.3)',
  };

  const darkTheme = {
    gradientFirstColor: '#2F3C43',
    gradientSecondColor: '#1C222C',
    textColor: '#212121',
    textMuted: '#444',
    white: '#FFF',
    border: '#212121',
    muted: 'rgba(0,0,0,0.3)',
  };

  const {user} = useAuth();

  const [theme, setTheme] = useState(lightTheme);
  const [themeType, setThemeType] = useState('light');

  useEffect(() => {
    if (user && user.darkTheme){
      changeTheme('dark');
    } else {
      changeTheme('light');
    }
  }, [user]);

  function changeTheme(type = 'light') {
    setThemeType(type);

    if (type === 'light') {
      return setTheme(lightTheme);
    } else if (type === 'dark') {
      return setTheme(darkTheme);
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, changeTheme, themeType, }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
    const context = useContext(ThemeContext);
  
    if (!context) {
      throw new Error('useTheme must be used within an ThemeProvider.');
    }
  
    return context;
}
  
export {ThemeProvider, useTheme};