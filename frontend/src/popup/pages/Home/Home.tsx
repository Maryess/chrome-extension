import { ChangeEvent, useEffect, useRef, useState } from "react";
import styles from './Home.module.scss'
import {Field, Heading} from "shared/ui/index";
import { useUploadImages } from "hooks/useUploadImage";
import { useDragOpacity } from "hooks/useDragOpacity";

type Props ={
}

export default () => {
  const {imageValue,uploadImage,file} = useUploadImages()
  const {opacityValue,positionValue,handleMouseDown} = useDragOpacity()
  const [mousePosition,setMousePosition] = useState<{x:number,y:number}>({x:0,y:0})
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
        {!imageValue ?
          <div className={styles.upload}>
            <Field
              onChange={uploadImage}
              type="file"
              placeholder="Choose file"
            />
          </div>
        :
          <div className={styles.content}>
            <div className={styles.settings}>
              <Heading title="change opacity"/>
              <div id="block_opacity" className={styles.opacity}>
                <button onMouseDown={handleMouseDown} className={styles.btn} style={{
                  left:positionValue
                }}></button>
                <span>{opacityValue}</span>
              </div>
             
            </div>
            <Heading title="images"/>
            <div className={styles.images}>
              <img src={`${imageValue}`} style={{
                opacity:opacityValue
              }} alt={file?.name}/>
            </div>
          </div>
        }
      </div>
    );
};
