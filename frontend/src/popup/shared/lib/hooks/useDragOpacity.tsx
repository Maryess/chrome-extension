import { useEffect, useRef, useState } from "react";
import { setToChromeStorage } from "../helpers/chromeStorage";

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
          localStorage.setItem('opacity', JSON.stringify(data));
        }
      };
    

      const handleMouseDown = () => {
        isDragging.current = true;
        saveToStorage(opacityValue,positionValue)
      };
    
      const handleMouseUp = () => {
        isDragging.current = false;
        saveToStorage(opacityValue,positionValue)
      };
    
    useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging.current) return;
        if (e.clientX > prevMouseRef.current && opacityRef.current < opacityMaxLength) {
          opacityRef.current = Math.min(opacityRef.current + 0.01, opacityMaxLength);
          positionBtnRef.current = Math.min(positionBtnRef.current + 1,positionMaxLength )
          setOpacityValue(Math.floor(opacityRef.current * 10)/10);
          setPositionValue(positionBtnRef.current);
        } else if (e.clientX < prevMouseRef.current && opacityRef.current > 0) {
          opacityRef.current = Math.max(opacityRef.current - 0.01, 0);
          positionBtnRef.current = Math.max(positionBtnRef.current - 1,0 )
          setOpacityValue(Math.floor(opacityRef.current * 10)/10);
          setPositionValue(positionBtnRef.current);
        }
    
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