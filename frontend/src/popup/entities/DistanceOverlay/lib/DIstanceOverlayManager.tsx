import { initDraggable } from "shared/lib/helpers/initDraggable";
import { IDistancePopup } from "../types";
import { IPosition } from "shared/types/distance";

export class DistanceOverlayManager {
  private distancePopup: HTMLDivElement | null = null;
  private distanceLine: HTMLDivElement | null = null;
  private cleanupDraggable: (() => void) | null = null;
  private lastAngle: number | null = null;

  addDistancePopup(data: IDistancePopup) {
    const { firstClick, secondClick } = data;
  
    if (firstClick && secondClick) {
      this.addDistanceLine(firstClick, secondClick);
    }
  
    if (this.distancePopup) {
      this.updateDistancePopup(data);
      return;
    }
  
    this.distancePopup = document.createElement("div");
    this.distancePopup.className = "distance-popup";
    document.body.appendChild(this.distancePopup);
  
    if (data.isDragging ?? true) {
      this.cleanupDraggable = initDraggable(this.distancePopup);
    }
  
    this.updateDistancePopup(data);
  }

  updateDistancePopup = ({ px, position, firstClick, secondClick, rem, vh, vw }: IDistancePopup) => {
    if (!this.distancePopup) return;

    this.distancePopup.innerHTML = `
      <h3>🧭 Distance Info</h3>
      <ul>
        <li><strong>px:</strong> ${px?.toFixed(2) ?? '-'}</li>
        <li><strong>rem:</strong> ${rem?.toFixed(2) ?? '-'}</li>
        <li><strong>vh:</strong> ${vh?.toFixed(2) ?? '-'}</li>
        <li><strong>vw:</strong> ${vw?.toFixed(2) ?? '-'}</li>
      </ul>
    `;
  };

  addDistanceLine(firstClick: IPosition, secondClick: IPosition){
    if (!this.distanceLine) {
      this.distanceLine = document.createElement("div");
      this.distanceLine.className = "distance-line";
      document.body.appendChild(this.distanceLine);
      this.distanceLine.style.transition = 'transform 0.2s ease-out';
    }    
    this.updateDistanceLinePosition(firstClick, secondClick);
  }
  
  updateDistanceLinePosition = (firstClick: IPosition, secondClick: IPosition) => {
    if (!this.distanceLine || !firstClick || !secondClick) return;

    const dx = secondClick.x - firstClick.x;
    const dy = secondClick.y - firstClick.y;
    
    const length = Math.sqrt(dx * dx + dy * dy);
    //угол в радианах
    const angleRad = Math.atan2(dy, dx);
    let angleDeg = angleRad * 180 / Math.PI;
    
    // плавный переход
    if (this.lastAngle !== null) {
      while (angleDeg - this.lastAngle > 180) angleDeg -= 360;
      while (angleDeg - this.lastAngle < -180) angleDeg += 360;
    }
    this.lastAngle = angleDeg;
    
    this.distanceLine.style.left = `${firstClick.x}px`;
    this.distanceLine.style.top = `${firstClick.y}px`;
    this.distanceLine.style.width = `${length}px`;
    this.distanceLine.style.transform = `rotate(${angleDeg}deg)`;
    this.distanceLine.style.transformOrigin = '0 0';
  }
    
  removeAll = () => {
    if (this.distancePopup) {
      this.distancePopup.remove();
      this.distancePopup = null;
      if (this.cleanupDraggable) {
        this.cleanupDraggable();
        this.cleanupDraggable = null;
      }
    }
    
    if (this.distanceLine) {
      this.distanceLine.remove();
      this.distanceLine = null;
    }
    
    this.lastAngle = null;
  };
}