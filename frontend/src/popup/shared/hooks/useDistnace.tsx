import { useEffect, useRef, useState } from "react";

export const useDistance = () => {
  const [firstClick, setFirstClick] = useState<{ x: number; y: number } | null>();
  const [secondClick, setSecondClick] = useState<{ x: number; y: number } | null>();

  const firstRef = useRef<{ x: number; y: number } | null>(null);
  const secondRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {

      const pos = { x: e.clientX, y: e.clientY };
      if (!firstClick) {
        firstRef.current = pos;
        setFirstClick({ x: e.clientX, y: e.clientY });
      } else if (!secondClick) {
        secondRef.current = pos;
        setSecondClick({ x: e.clientX, y: e.clientY });
      }else{
        firstRef.current = null;
        secondRef.current = null;
        setFirstClick(null)
        setSecondClick(null)
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