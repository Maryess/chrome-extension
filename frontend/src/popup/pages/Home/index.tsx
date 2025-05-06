import { Button, Image } from "@chakra-ui/react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import styles from './styles.module.scss'
import {Field} from "ui/index";
import { useUserStore } from "store/store";

type Props ={
}

export default () => {
  const [imageValue,setImageValue] = useState<string>('')
  const [file,setFile] = useState<File | null>(null)
  const [mousePosition,setMousePosition] = useState<{x:number,y:number}>({x:0,y:0})
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

  const uploadImage = (e:ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setFile(file);
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setImageValue(event.target.result as string);
          
  
          if(typeof chrome !== undefined && chrome.storage?.local){
            chrome.storage.local.set({ 
              lastSelectedFile:{
              imageName:file.name,
              imageUrlBase64: event.target.result
            }
            })
          }else{
            console.log('chrome storage не доступен, сохраняем в localstorage')
            localStorage.setItem('selected image',
              JSON.stringify({
                name: file.name,
                size: file.size,
                imageUrlBase64: event.target.result
              })
            )
          }
        }
        };
        reader.readAsDataURL(file);
      }
  }

  const checkImageUrl = () => {

    if(file == null){
      alert('Пожалуйста,выберите файл')
    }else{ 
      console.log(file)
    }
  }

  const {logout} = useUserStore()

    return (
      <div className={styles.home}>
        <div className={styles.home__upload}>
            <Field
              onChange={uploadImage}
              type="file"
              placeholder="Choose file"
              />
        </div>
              <br />
            {imageValue?
            <Image src={`${imageValue}`} width={100} height={100} alt={file?.name}/>:null}
              <br/>
            <Button onClick={checkImageUrl} variant={'solid'}>
                Get image url
            </Button>
            <Button  onClick={()=>console.log(mousePosition)} variant={'solid'}>
              Get position
            </Button>
            <Button  onClick={logout} variant={'solid'}>
              logout
            </Button>
      </div>
    );
};
