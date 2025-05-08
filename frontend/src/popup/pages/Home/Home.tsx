import { ChangeEvent, useEffect, useRef, useState } from "react";
import styles from './Home.module.scss'
import {Field, Heading} from "shared/ui/index";
import { useUploadImages } from "hooks/useUploadImage";

type Props ={
}

export default () => {
  const {imageValue,uploadImage,file} = useUploadImages()
  const [mousePosition,setMousePosition] = useState<{x:number,y:number}>({x:0,y:0})
  const [opacityValue,setOpacityValue] = useState<number>(0)
  const [progress,setProgress] = useState<number>(0)
  const fileInputRef = useRef(null);

  const deleteFromLocalStorage = () =>{
    localStorage.removeItem('selected image')
  }
 
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
              <div className={styles.opacity}>
                <button className={styles.btn}></button>
                <span>{opacityValue}</span>
              </div>
             
            </div>
            <Heading title="images"/>
            <div className={styles.images}>
              <img src={`${imageValue}`} alt={file?.name}/>
            </div>
          </div>
        }
      </div>
    );
};
