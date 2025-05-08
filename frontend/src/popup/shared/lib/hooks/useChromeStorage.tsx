import { useEffect, useState } from "react";

type ChromeStorageType = <T>(
    key: string,
    defaultValue: T
  ) => readonly [T, (value: T) => void];

export const useChromeStorage:ChromeStorageType  = (key,defaultValue)=> {
    const [value, setValue] = useState(defaultValue);

    const storage = chrome.storage.local;

    useEffect(() => {
        storage.get([key], (result) => {
        if (result[key] !== undefined) {
            setValue(result[key]);
        }
        });
    }, [key]);

    const saveValue = (newValue:typeof defaultValue) => {
        setValue(newValue);
        storage.set({ [key]: newValue });
    };

    return [value, saveValue];
}
