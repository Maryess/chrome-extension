import { Button, Image } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import styles from './styles.module.scss'
import {Field} from "ui/index";

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

  const uploadImage = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.onchange = (e:Event) => {
      const file = (e.target as HTMLInputElement).files?.[0];
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
    input.click()
  }

  const checkImageUrl = () => {

    if(file == null){
      alert('Пожалуйста,выберите файл')
    }else{ 
      console.log(file)
    }
  }
    return (
      <div className={styles.home}>
            <Button
              onClick={uploadImage}
              >Выбрать файл
            </Button>
              <br />
            {imageValue && 
            <Image src={`${imageValue}`} width={100} height={100} alt={file?.name} />}
              <br/>
            <Button onClick={checkImageUrl} variant={'solid'}>
                Get image url
            </Button>
            <Button  onClick={()=>console.log(mousePosition)} variant={'solid'}>
              Get position
            </Button>
            <Button  onClick={deleteFromLocalStorage} variant={'solid'}>
              Delete local storage
            </Button>
      </div>
    );
};
