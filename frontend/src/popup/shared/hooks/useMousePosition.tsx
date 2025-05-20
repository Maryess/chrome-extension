import { useEffect, useRef, useState } from 'react'

export const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const lastPosition = useRef({ x: 0, y: 0})
  const actualPosition = useRef('')

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY }

      const dx = newPosition.x - lastPosition.current.x;
      const dy = newPosition.y - lastPosition.current.y;

      if (dx > 0) {
        actualPosition.current = 'right'
      } else if (dx < 0) {
        actualPosition.current = 'left'
      }

      if (dy > 0) {
        actualPosition.current = 'bottom'
      } else if (dy < 0) {
        actualPosition.current = 'top'
      }
      lastPosition.current = newPosition 
      setPosition(newPosition)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return {
    position,
    actualPosition
  }
}
