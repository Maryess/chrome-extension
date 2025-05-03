import { Button, Image } from "@chakra-ui/react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import styles from './styles.module.scss'
import {Field} from "ui/index";

export default () => {
  const [imageValue,setImageValue] = useState<string>('')
  const [file,setFile] = useState<File | null>(null)
  const [mousePosition,setMousePosition] = useState<{x:number,y:number}>({x:0,y:0})
  const fileInputRef = useRef(null);
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

  const uploadImage = (e:ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImageValue(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);

      chrome.storage.local.set({ 
        lastSelectedFile: {
          name: file.name,
          size: file.size,
          lastModified: file.lastModified
        }
      });
    }

  }

  const saveToLocalChromeStorage = () => {

    if(file == null){
      alert('Пожалуйста,выберите файл')
    }
    // fileInputRef.current.click();
    
   console.log(file)
  }

    return (
      <div className={styles.home}>
            <Field
              onChange={uploadImage}
              type={'file'}
              placeholder={'Upload file'}
            />
              <br />
            {imageValue &&  <Image src={`${imageValue}`} width={100} height={100} alt={file?.name} />}
              <br/>
            <Button onClick={saveToLocalChromeStorage}  variant={'solid'}>
                Get image url
            </Button>
            <Button  onClick={()=>console.log(mousePosition)}variant={'solid'}>
              Get position
            </Button>
      </div>
    );
};
