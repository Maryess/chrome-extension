import { useEffect, useState } from "react";

export const useDistance = () => {
  const [firstClick, setFirstClick] = useState<{ x: number; y: number }>();
  const [secondClick, setSecondClick] = useState<{ x: number; y: number }>();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!firstClick) {
        setFirstClick({ x: e.clientX, y: e.clientY });
      } else if (!secondClick) {
        setSecondClick({ x: e.clientX, y: e.clientY });
      }
      // если нужно сбрасывать и снова начинать — можно добавить else -> setFirstClick(null), setSecondClick(null)
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
