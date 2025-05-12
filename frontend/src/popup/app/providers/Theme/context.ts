import { createContext, useContext } from "react";

export type Theme = 'pink' | 'blue' | 'green' | 'coffee' | 'dark' ;

interface IThemeContext{
    theme:string;
    setTheme:(theme:Theme)=>void;
}

export const ThemeContext = createContext<IThemeContext>({
    theme: 'pink',
    setTheme: () => {},
  });
  
  export const useTheme = () => useContext(ThemeContext);