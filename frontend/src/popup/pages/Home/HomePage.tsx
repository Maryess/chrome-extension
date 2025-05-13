import { ChangeEvent, useEffect, useRef, useState } from "react";
import styles from './Home.module.scss'
import {Field, Heading} from "shared/ui/index";
import { useUploadImages } from "shared/hooks/useUploadImage";
import { useDragOpacity } from "shared/hooks/useDragOpacity";
import { UploadImage } from "./ui/UploadImage";
import { DragOpacity } from "./ui/DragOpacity";
import { removeFromChromeStorage } from "shared/lib/helpers/chromeStorage";
import { removeFromLocalStorage } from "shared/lib/helpers/localStorage";
import { Panel } from "./ui/Panel";
import { ImagePreview } from "entities/ImagePreview";

export const Page = () => {
  const {imageValue,uploadImage,file,syncFromStorage,setImageValue,setFile} = useUploadImages()
  const {opacityValue,positionValue,handleMouseDown} = useDragOpacity()
  const [mousePosition,setMousePosition] = useState<{x:number,y:number}>({x:0,y:0})

  const showUpload = !imageValue;

  useEffect(()=>{
    const getMousePosition = (e:MouseEvent) => {
      setMousePosition({
        x:e.clientX,
        y:e.clientY
      })
  
    }

    window.addEventListener("mousemove", getMousePosition)

    return () => {
      window.removeEventListener('mousemove', getMousePosition);
    };
  },[])

  const deleteFromStorage = async () => {
    if (chrome && chrome.storage) {
      await removeFromChromeStorage("selected image");
    } else {
      removeFromLocalStorage("selected image");
    }
    await syncFromStorage();
    setImageValue('');
  };

  

     return (
      <div className={styles.home}>
        {showUpload ?
          <UploadImage uploadImage={uploadImage}/>
        :
          <div className={styles.content}>
            <DragOpacity positionBtn={positionValue} 
            opacity={opacityValue} 
            handleMouseDown={handleMouseDown}/>
            <Panel addImg={uploadImage} removeImg={deleteFromStorage}/>
            <ImagePreview opacity={opacityValue} 
            imageUrl={imageValue} 
            fileName={file?.name}/>
          </div>
        }
      </div>
    );
};
