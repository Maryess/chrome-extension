import { ReactNode, useEffect, useState } from "react";
import { getFromChromeStorage, setToChromeStorage } from "shared/lib/helpers/chromeStorage";
import { getFromLocalStorage, setToLocalStorage } from "shared/lib/helpers/localStorage";
import { Theme, ThemeContext } from "./context";

const themes:Theme[] = ['pink', 'blue', 'green', 'coffee', 'dark'];

export const Provider = ({ children }: { children: ReactNode })=>{
    const [theme,setThemeState] = useState<Theme>('pink')

    useEffect(() => {
        const loadTheme = async () => {
            if (typeof chrome !== 'undefined' && chrome.storage) {
                await getFromChromeStorage<Theme>('themeColor').then((storedTheme)=>{
                    if(storedTheme){
                        setThemeState(storedTheme)
                        document.documentElement.setAttribute('data-theme', storedTheme);
                    }
                })
            } else {
                const stored =getFromLocalStorage('themeColor');
                if(stored && theme.includes(stored)){
                    setThemeState(stored as Theme);
                    document.documentElement.setAttribute('data-theme', stored);
                }
            }      
            }
        loadTheme();
    }, []);

    const setTheme = (newTheme:Theme) => {
        setThemeState(newTheme)
        if (typeof chrome !== 'undefined' && chrome.storage) {
            setToChromeStorage('themeColor', newTheme)
        }else{
            setToLocalStorage('themeColor', newTheme)
        }
        document.documentElement.setAttribute('data-theme',newTheme)
    }

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}
