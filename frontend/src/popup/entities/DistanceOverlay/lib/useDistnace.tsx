import { useEffect, useRef, useState } from "react";
import { IPosition } from "shared/types/distance";

export const useDistance = () => {
  const [firstClick, setFirstClick] = useState<IPosition>();
  const [secondClick, setSecondClick] = useState<IPosition>();

  const firstRef = useRef<{ x: number; y: number } | null>(null);
  const secondRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!e.altKey) return; 

      const pos = { x: e.clientX, y: e.clientY };

      if (!firstClick) {
        setFirstClick(pos);
      } else if (!secondClick) {
        setSecondClick(pos);
      } else {
        setFirstClick(undefined);
        setSecondClick(undefined);
      }
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [firstClick, secondClick]);

    const px = firstClick && secondClick
        ? Math.sqrt(
        Math.pow(secondClick.x - firstClick.x, 2) +
        Math.pow(secondClick.y - firstClick.y, 2)
    ) : 0
  
    const rem = px /16
    const vw = (px/window.innerWidth) * 100;
    const vh =(px/window.innerHeight) * 100;
  return {
    firstClick,
    secondClick,
    px,
    rem,
    vw,
    vh,
    setFirstClick,
    setSecondClick,
  };
};