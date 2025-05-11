import { useEffect, useRef, useState } from "react";
import { getFromChromeStorage, setToChromeStorage } from "../lib/helpers/chromeStorage";
import { getFromLocalStorage } from "../lib/helpers/localStorage";

export const useDragOpacity = () => {
      const [positionValue,setPositionValue] = useState<number>(0)
      const [opacityValue, setOpacityValue] = useState<number>(0)
      const opacityRef = useRef(0);
      const positionBtnRef = useRef(0);
      const prevMouseRef = useRef(0);
      const isDragging = useRef(false);
      const opacityMaxLength = 1;
      const positionMaxLength = 200;

      const saveToStorage = (opacity: number, position: number) => {
        const data = { opacity, positionBtn: position };
        if (chrome && chrome.storage) {
          setToChromeStorage('dragOpacity', data);
        } else {
          localStorage.setItem('dragOpacity', JSON.stringify(data));
        }
      };
      useEffect(() => {
        const getFromStorage = async () => {
          let data;
          if (chrome && chrome.storage) {
            data = await getFromChromeStorage('dragOpacity');
          } else {
            data = getFromLocalStorage('dragOpacity');
          }
    
          if (data) {
            const { opacity, positionBtn } = data;
            setOpacityValue(opacity || 0);
            setPositionValue(positionBtn || 0);
            opacityRef.current = opacity || 0;
            positionBtnRef.current = positionBtn || 0;
          }
        };
    
        getFromStorage();
      }, []);
    

      const handleMouseDown = () => {
        isDragging.current = true;
      };
    
      const handleMouseUp = () => {
        isDragging.current = false;
        saveToStorage(opacityRef.current,positionBtnRef.current)
      };
    
    useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging.current) return;
        if (e.clientX > prevMouseRef.current && opacityRef.current < opacityMaxLength) {
          opacityRef.current = Math.min(opacityRef.current + 0.01, opacityMaxLength);
          positionBtnRef.current = Math.min(positionBtnRef.current + 1,positionMaxLength )
        } else if (e.clientX < prevMouseRef.current && opacityRef.current > 0) {
          opacityRef.current = Math.max(opacityRef.current - 0.01, 0);
          positionBtnRef.current = Math.max(positionBtnRef.current - 1,0 )
        }

        setOpacityValue(Math.floor(opacityRef.current * 10) / 10);
        setPositionValue(positionBtnRef.current);
       
        prevMouseRef.current = e.clientX
      };
    
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }, []);
    
    return {
        opacityValue,
        positionValue,
        handleMouseDown
    }

}
