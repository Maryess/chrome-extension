import { ChangeEvent, useEffect, useState } from "react";
import { getFromLocalStorage, setToLocalStorage } from "../lib/helpers/localStorage";
import { getFromChromeStorage, setToChromeStorage } from "../lib/helpers/chromeStorage";

export const useUploadImages = () => {
    const [file,setFile] = useState<File | null>(null)
    const [imageValue,setImageValue] = useState<string>('')

    const uploadImage = (e:ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0];
          if (file) {
            setFile(file);
            const reader = new FileReader();
            reader.onload = (event) => {
              if (event.target?.result) {
                setImageValue(event.target.result as string);
              
      
              if(typeof chrome !== undefined && chrome.storage?.local){
                setToChromeStorage('selected image',{ 
                  imageName:file.name,
                  imageUrlBase64: event.target.result
                })
              }else{
                console.log('chrome storage не доступен, сохраняем в localstorage')
                setToLocalStorage('selected image',JSON.stringify({
                  name: file.name,
                  size: file.size,
                  imageUrlBase64: event.target.result
                }) )
              }
            }
            };
            reader.readAsDataURL(file);
          }
      }


  useEffect(() => {
    const getFromStorage = async() => {
      let data;
      if (chrome && chrome.storage) {
        data = await getFromChromeStorage('selected image');
      } else {
        const storage = getFromLocalStorage('selected image');
        data = storage ? JSON.parse(storage) : null;
      }

      if(data && data.imageUrlBase64){
        setImageValue(data.imageUrlBase64)
      }
    }

    getFromStorage()
  }, []);
    

    return{
        uploadImage,
        imageValue,
        file
    }
}