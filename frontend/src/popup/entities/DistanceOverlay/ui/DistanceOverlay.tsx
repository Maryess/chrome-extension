import { useEffect, useState } from "react"
import { DistanceOverlayManager } from "../lib/DistanceOverlayManager"
import { useImageOverlayStorage } from "entities/ImageOverlay"
import { useMousePosition } from "shared/hooks/useMousePosition"
import { useDistance } from "shared/hooks/useDistnace"

export const DistanceOverlay = () => {
    const [overlay] = useState(()=>new DistanceOverlayManager())
    const {getImageData,getOpacityData} = useImageOverlayStorage()
    const {position} = useMousePosition()
    const {firstClick, secondClick, px,rem,vh,vw} = useDistance()
    useEffect(() => {
        const show = async () => {
          try {
            const [data] = await Promise.all([getImageData()]);
            if (data?.path) {
              overlay.addDistancePopup({
                px: px,
                rem:rem,
                vh:vh,
                vw:vw,
                position:position,
                firstClick:firstClick,
                secondClick:secondClick
              });
            }
          } catch (error) {
            console.error("Failed to load image", error);
          }
        };
      
        show();
      }, [position,firstClick, secondClick]); 
      

    return null;
}