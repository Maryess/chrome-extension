import { useEffect, useState } from "react"
import { DistanceOverlayManager } from "../lib/DIstanceOverlayManager"
import { useImageOverlayStorage } from "entities/ImageOverlay"
import { useMousePosition } from "shared/hooks/useMousePosition"
import { useDistance } from "shared/hooks/useDistnace"
import { IPosition } from "shared/types/distance"

export const DistanceOverlay = () => {
  const [overlay] = useState(() => new DistanceOverlayManager())
  const [visible, setVisible] = useState(false)

  const { getImageData } = useImageOverlayStorage()
  const { position, actualPosition } = useMousePosition()
  const { firstClick, secondClick, px, rem, vh, vw } = useDistance()

  const [currentPos, setCurrentPos] = useState<IPosition | null>(null)

  useEffect(() => {
    if (!firstClick) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!secondClick) {
        setCurrentPos({ x: e.clientX, y: e.clientY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [visible, firstClick, secondClick]);

  useEffect(() => {
    if (!firstClick || !currentPos) return;

    overlay.addDistanceLine(firstClick, currentPos);
  }, [firstClick, currentPos, visible]);

  useEffect(() => {
    if (!visible) return
    if (!firstClick || !secondClick) return

    const showPopup = async () => {
      try {
        const [data] = await Promise.all([getImageData()])
        if (data?.path) {
          overlay.addDistancePopup({
            px,
            rem,
            vh,
            vw,
            position,
            firstClick,
            secondClick,
          })
        }
      } catch (error) {
        console.error("Failed to load image", error)
      }
    }
    showPopup()
  }, [firstClick, secondClick, px, rem, vh, vw, position, visible])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey) {
        if (visible) {
          overlay.removeAll()
          setVisible(false)
        } else {
          setVisible(true)
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [visible])

  return null
}
