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
                const settings = await getFromChromeStorage<{ theme?: Theme }>('settingsData');
                if (settings?.theme && themes.includes(settings.theme)) {
                    setThemeState(settings.theme);
                    document.documentElement.setAttribute('data-theme', settings.theme);
                }
            } 
        }
        loadTheme();
    }, []);
    

    const setTheme = async (newTheme: Theme) => {
        setThemeState(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    
        if (typeof chrome !== 'undefined' && chrome.storage) {
            const currentSettings = await getFromChromeStorage<Record<string, any>>('settingsData') || {};
            const updatedSettings = {
                ...currentSettings,
                theme: newTheme,
            };
            await setToChromeStorage('settingsData', updatedSettings);
        } else {
            setToLocalStorage('themeColor', newTheme); 
        }
    };
    

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}
