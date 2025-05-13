import {useEffect, useState } from "react";
import styles from './Home.module.scss'
import { removeFromChromeStorage } from "shared/lib/helpers/chromeStorage";
import { removeFromLocalStorage } from "shared/lib/helpers/localStorage";
import { ImagePreview } from "entities/ImagePreview";
import { DragOpacity, Panel, UploadImage, useUploadImages,useDragOpacity } from "widgets/PageHome";

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
     return (
      <div className={styles.home}>
        {showUpload ?
          <UploadImage uploadImage={uploadImage}/>
        :
          <div className={styles.content}>
            <DragOpacity 
            positionBtn={positionValue} 
            opacity={opacityValue} 
            handleMouseDown={handleMouseDown}/>
            <Panel 
            addImg={uploadImage} 
            removeImg={()=>{
              removeFromChromeStorage('selected image')
              setImageValue('')
              }}/>
            <ImagePreview 
            opacity={opacityValue} 
            imageUrl={imageValue} 
            fileName={file?.name}/>
          </div>
        }
      </div>
    );
};
