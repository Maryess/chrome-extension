import { initDraggable } from "shared/lib/helpers/initDraggable";
import { IDistancePopup } from "../types";

export class DistanceOverlayManager {
  private distancePopup: HTMLDivElement | null = null;
  private distanceLine:HTMLDivElement | null = null;
  private cleanupDraggable: (() => void) | null = null;

  calculateAngle = (start: { x: number; y: number }, end: { x: number; y: number }) => {
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    return Math.atan2(dy, dx) * (180 / Math.PI);
  }
  

  addDistancePopup = ({ px, position, firstClick, secondClick, rem, vh, vw,isDragging }: IDistancePopup) => {
    if (this.distancePopup) {
      this.updateDistancePopup({ px, position, firstClick, secondClick, rem, vh, vw });
      
      if (firstClick && secondClick) {
        if (!this.distanceLine) {
          const distanceLine = document.createElement("div");
          distanceLine.className = "distance-line";
          this.distanceLine = distanceLine;
          document.body.appendChild(distanceLine);
        }
        this.updateDistanceLinePosition(firstClick, secondClick);
      }
  
      return;
    }
  
    const distancePopup = document.createElement("div");
    distancePopup.className = "distance-popup";
  
    this.distancePopup = distancePopup;
    document.body.appendChild(distancePopup);
  
    if (isDragging ?? true) {
      this.cleanupDraggable = initDraggable(distancePopup);
    }
  
    this.updateDistancePopup({ px, position, firstClick, secondClick, rem, vh, vw });
  
    if (firstClick && secondClick) {
      const distanceLine = document.createElement("div");
      distanceLine.className = "distance-line";
      this.distanceLine = distanceLine;
      document.body.appendChild(distanceLine);
      this.updateDistanceLinePosition(firstClick, secondClick);
    }
  };
  

  updateDistancePopup = ({ px, position, firstClick, secondClick, rem, vh, vw }: IDistancePopup) => {
    if (!this.distancePopup) return;

    this.distancePopup.innerHTML = `
      <h3>🧭 Distance Info</h3>
      <ul>
        <li><strong>px:</strong> ${px?.toFixed(2) ?? '-'}</li>
        <li><strong>rem:</strong> ${rem?.toFixed(2) ?? '-'}</li>
        <li><strong>vh:</strong> ${vh?.toFixed(2) ?? '-'}</li>
        <li><strong>vw:</strong> ${vw?.toFixed(2) ?? '-'}</li>
        <li><strong>Mouse:</strong> ${position?.x ?? '-'}, ${position?.y ?? '-'}</li>
        <li><strong>First Click:</strong> ${firstClick?.x ?? '-'}, ${firstClick?.y ?? '-'}</li>
        <li><strong>Second Click:</strong> ${secondClick?.x ?? '-'}, ${secondClick?.y ?? '-'}</li>
      </ul>
    `;
  };

  updateDistanceLine = (width:string) => {
    if(!this.distanceLine) return;

    this.distanceLine.style.width = width
  }

  updateDistanceLinePosition = (firstClick: { x: number; y: number }, secondClick: { x: number; y: number }) => {
    if (!this.distanceLine || !firstClick || !secondClick) return;
  
    const angle = this.calculateAngle(firstClick, secondClick);
    const distance = Math.sqrt(
      Math.pow(secondClick.x - firstClick.x, 2) + Math.pow(secondClick.y - firstClick.y, 2)
    );
  
    this.distanceLine.style.left = `${firstClick.x}px`;
    this.distanceLine.style.top = `${firstClick.y}px`;
    this.distanceLine.style.width = `${distance}px`;
    this.distanceLine.style.transform = `rotate(${angle}deg)`;
    this.distanceLine.style.transformOrigin = 'left center';
  }
  
  
  removeDistancePopup = () => {
    if (this.distancePopup) {
      this.distancePopup.remove();
      this.distancePopup = null;
      if (this.cleanupDraggable) {
        this.cleanupDraggable();
        this.cleanupDraggable = null;
      }
      console.log("Popup removed");
    } else {
      console.warn("No popup to remove");
    }
  };
}
