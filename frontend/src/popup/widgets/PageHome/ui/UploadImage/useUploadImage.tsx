import { ChangeEvent, useEffect, useState } from "react";
import { getFromLocalStorage, setToLocalStorage } from "../../../../shared/lib/helpers/localStorage";
import { getFromChromeStorage, setToChromeStorage } from "../../../../shared/lib/helpers/chromeStorage";

export const useUploadImages = () => {
    const [file,setFile] = useState<File | null>(null)
    const [imageValue,setImageValue] = useState<string>('')

    const uploadImage = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setFile(file);
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            const path = event.target.result as string;
            setImageValue(path);
    
            const imageData = {
              name: file.name,
              path: path
            };
    
            if (typeof chrome !== "undefined" && chrome.storage?.local) {
              setToChromeStorage("selected image", imageData);
            } else {
              console.log("chrome storage не доступен, сохраняем в localStorage");
              setToLocalStorage("selected image", JSON.stringify(imageData));
            }
          }
        };
        reader.readAsDataURL(file);
      }
    };

      const syncFromStorage = async () => {
        let data;
        if (chrome && chrome.storage) {
          data = await getFromChromeStorage("selected image");
        } else {
          const storage = getFromLocalStorage("selected image");
          data = storage ? JSON.parse(storage) : null;
        }
      
        if (data && data.path) {
          setImageValue(data.path);
        } else {
          setImageValue("");
        }
      };

      useEffect(() => {
        syncFromStorage();
      }, []);
    

    return{
        uploadImage,
        imageValue,
        file,
        setImageValue,
        syncFromStorage,
        setFile
    }
}