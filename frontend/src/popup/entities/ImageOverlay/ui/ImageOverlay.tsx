import { useEffect, useRef, useState } from "react";
import { ImageOverlayStorage } from "../lib/ImageOverlayStorage";
import { ImageOverlayManager } from "../lib/ImageOverlayManager";
import { getFromChromeStorage, onChangedChromeStorage } from "shared/lib/helpers/chromeStorage";
import { IImage } from "shared/types/image";

export const ImageOverlay = () => { 
    const {getImageData,getOpacityData} = ImageOverlayStorage()
    const [overlay] = useState(()=>new ImageOverlayManager())    
    
    useEffect(() => {
        (async () => {
          try {
            const [data, opacity] = await Promise.all([
              getImageData(),
              getOpacityData()
            ]);
      
            const actualOpacity = opacity?.opacity ?? 1;
      
            if (data?.path) {
              overlay.addImage({
                path: data.path,
                opacity: actualOpacity,
                name: data.name
              });
            } else {
              console.warn("The image not found");
            }
          } catch (error) {
            console.error("Failed to load image or opacity data:", error);
          }
        })();
      }, []);
      
    //подписка на изменение dragOpacity и selected image в chrome.storage
    useEffect(()=>{
        const unsubscribeDragOpacity = onChangedChromeStorage<{opacity:number}>('dragOpacity', (newValue)=>{
            if(newValue?.opacity){
                overlay.updateImageOpacity(newValue.opacity)
            }
        })

        const unsubscribeSelectedImage = onChangedChromeStorage<IImage>('selected image', async(newValue)=>{
            if(!newValue?.path){
                console.log('Removing image')
                overlay.removeImage();
            }else{
                const result = await getFromChromeStorage<{opacity:number}>('dragOpacity')
                const opacity = result?.opacity ?? 1;

                overlay.addImage({
                    path:newValue.path,
                    opacity,
                    name:newValue.name
                })
            }
        })

        return ()=>{
            unsubscribeDragOpacity()
            unsubscribeSelectedImage()
        }
    },[])

      
    return null;
      
}