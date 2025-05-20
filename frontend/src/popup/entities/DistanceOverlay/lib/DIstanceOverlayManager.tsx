import { initDraggable } from "shared/lib/helpers/initDraggable";
import { IDistancePopup } from "../types";

export class DistanceOverlayManager {
  private distancePopup: HTMLDivElement | null = null;
  private distanceLine:HTMLDivElement | null = null;
  private cleanupDraggable: (() => void) | null = null;

  addDistancePopup = ({ px, position, firstClick, secondClick, rem, vh, vw,isDragging }: IDistancePopup) => {
    if (this.distancePopup) {
      this.updateDistancePopup({ px, position, firstClick, secondClick, rem, vh, vw });
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

    if(firstClick){
        const distanceLine = document.createElement("div");
        distanceLine.className = "distance-line"

        this.distanceLine = distanceLine;
        document.body.appendChild(distanceLine);

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
        <li><strong>Mouse:</strong> ${position.x}, ${position.y}</li>
        <li><strong>First Click:</strong> ${firstClick?.x ?? '-'}, ${firstClick?.y ?? '-'}</li>
        <li><strong>Second Click:</strong> ${secondClick?.x ?? '-'}, ${secondClick?.y ?? '-'}</li>
      </ul>
    `;
  };

  updateDistanceLine = ({}) => {
    if(!this.distanceLine) return;

    this.distanceLine.style.width = ''
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
