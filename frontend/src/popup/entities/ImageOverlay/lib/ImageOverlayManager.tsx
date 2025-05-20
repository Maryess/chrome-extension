import { initDraggable } from 'shared/lib/helpers/initDraggable';
import { IImage } from 'shared/types/image';

export class ImageOverlayManager {
  private image: HTMLImageElement | null = null;
  private cleanupDraggable: (() => void) | null = null;

  addImage = ({ path, opacity, isDragging }: IImage) => {
    if (this.image) {
      console.warn('Image already exists');
      return;
    }

    const image = document.createElement('img');
    image.className = 'image_container';
    image.src = path;
    image.style.setProperty('opacity', opacity.toString(), 'important');
    image.style.transition = 'opacity 0.3s ease';
    image.style.position = 'absolute';
    image.style.left = '100px';
    image.style.top = '100px';

    this.image = image;
    document.body.appendChild(image);

    if (isDragging ?? true) {
      this.cleanupDraggable = initDraggable(image);
    }
  };

  removeImage = () => {
    if (this.image) {
      this.image.remove();
      this.image = null;
      if (this.cleanupDraggable) {
        this.cleanupDraggable();
        this.cleanupDraggable = null;
      }
      console.log('Image removed');
    } else {
      console.warn('No image to remove');
    }
  };

  updateImageOpacity = (opacity: number) => {
    if (this.image) {
      this.image.style.opacity = opacity.toString();
    }
  };
}
