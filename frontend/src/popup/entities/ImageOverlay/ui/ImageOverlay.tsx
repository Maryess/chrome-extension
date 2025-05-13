import { useEffect, useRef } from "react";
import { ImageOverlayStorage } from "../lib/ImageOverlayStorage";
import { ImageOverlayManager } from "../lib/ImageOverlayManager";
import { getFromChromeStorage, onChangedChromeStorage } from "shared/lib/helpers/chromeStorage";
import { IImage } from "shared/types/image";

export const ImageOverlay = () => { 
    const {getImageData,getOpacityData} = ImageOverlayStorage()
    const OverlayManagerRef =useRef(new ImageOverlayManager())

    useEffect(() => {
        Promise.all([getImageData(), getOpacityData()])
          .then(([data, opacity]) => {
            const actualOpacity = opacity?.opacity ?? 1;
            if (data?.path) {
                OverlayManagerRef.current.addImage({
                path: data.path,
                opacity: actualOpacity,
                name: data.name
              });
            } else {
              console.warn("The image not found");
            }
          });
      }, []);

    //подписка на изменение dragOpacity и selected image в chrome.storage
    useEffect(()=>{
        const unsubscribeDragOpacity = onChangedChromeStorage<{opacity:number}>('dragOpacity', (newValue)=>{
            if(newValue?.opacity){
                OverlayManagerRef.current.updateImageOpacity(newValue.opacity)
            }
        })

        const unsubscribeSelectedImage = onChangedChromeStorage<IImage>('selected image', async(newValue)=>{
            if(!newValue?.path){
                console.log('Removing image')
                const container = document.getElementById('app');
                OverlayManagerRef.current.removeImage();
            }else{
                const result = await getFromChromeStorage<{opacity:number}>('dragOpacity')
                const opacity = result?.opacity ?? 1;

                OverlayManagerRef.current.addImage({
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