import { useEffect } from "react";
import { ImageOverlayStorage } from "../lib/ImageOverlayStorage";
import { ImageOverlayManager } from "../lib/ImageOverlayManager";

export const ImageOverlay = () => {
    
    const {getImageData,getOpacityData} = ImageOverlayStorage()
    const {addImage, updateImageOpacity,removeImage} = ImageOverlayManager()

    useEffect(()=>{
        Promise.all([getImageData(), getOpacityData()])
       .then(([data, opacity]) => {
         const actualOpacity = opacity?.opacity ?? 1;
   
         if (data?.path) {
           addImage({
            path:data.path,
            opacity:actualOpacity,
            name:data.name
           });
           let lastOpacity = actualOpacity;
   
           const interval = setInterval(() => {
             chrome.storage.local.get('dragOpacity', (result) => {
               const newOpacity = result.dragOpacity?.opacity ?? 1;
           
               if (newOpacity !== lastOpacity) {
                 lastOpacity = newOpacity;
                 console.log('Updating image opacity to:', newOpacity);
                 updateImageOpacity(newOpacity);
               }
             });
           }, 300);

           return ()=>clearInterval(interval)
         } else {
           console.warn('The image not found');
         }
       });
    },[])
    
    useEffect(() => {
        const listener = (changes: any, areaName: string) => {
          if (areaName !== 'local') return;
      
          if (changes['dragOpacity']) {
            const newOpacity = changes['dragOpacity'].newValue?.opacity;
            if (typeof newOpacity === 'number') {
              updateImageOpacity(newOpacity);
            }
          }
      
          if (changes['selected image']) {
            const newValue = changes['selected image'].newValue;
      
            if (!newValue?.path) {
                console.log('Removing image');
                removeImage();
              } else {
                chrome.storage.local.get('dragOpacity', (result) => {
                  const opacity = result.dragOpacity?.opacity ?? 1;
                  addImage({
                    path: newValue.path,
                    opacity,
                    name: newValue.name
                  });
                });
            }
          }
        };
      
        chrome.storage.onChanged.addListener(listener);
        return () => chrome.storage.onChanged.removeListener(listener);
      }, []);


    return null;
      
}