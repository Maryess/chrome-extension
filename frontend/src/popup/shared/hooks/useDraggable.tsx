import { useEffect, useRef } from 'react';

export const useDraggable = <T extends HTMLElement>() => {
  const elementRef = useRef<T | null>(null);
  const pos = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      pos.current.x = e.clientX - el.offsetLeft;
      pos.current.y = e.clientY - el.offsetTop;

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      e.preventDefault();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !elementRef.current) return;
      elementRef.current.style.left = `${e.clientX - pos.current.x}px`;
      elementRef.current.style.top = `${e.clientY - pos.current.y}px`;
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    el.addEventListener('mousedown', handleMouseDown);

    return () => {
      el.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return elementRef;
};
