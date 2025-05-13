import { IImage } from "shared/types/image";

export class ImageOverlayManager {
  private image: HTMLImageElement | null = null;
  private isDragging = false;
  private x = 0;
  private y =0;
  private handleMouseDown = (e:MouseEvent) => {
    if(!this.image) return;
    this.isDragging = true;
    this.x = e.clientX - this.image.offsetLeft;
    this.y = e.clientY - this.image.offsetTop;

    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseUp);
    e.preventDefault()
  }
  private handleMouseUp = () => {
    this.isDragging = false;
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
  }

  private handleMouseMove = (e:MouseEvent) => {
    if(!this.image) return;
    if(this.isDragging){
      this.image.style.left = `${e.clientX - this.x}px`;
      this.image.style.top = `${e.clientY - this.y}px`;
    }
  }

  addImage = ({path,opacity}:IImage) => {
    if (this.image) {
      console.warn('Image already exists');
      return;
    }
    const image = document.createElement('img');
    image.className = 'image_container';
    image.src = path;
    image.style.setProperty('opacity', opacity.toString(), 'important'); 
    image.style.transition = 'opacity 0.3s ease';

    this.image = image
    document.body.appendChild(image);
    this.updatePositionImage();
  };

  updateImageOpacity = (opacity: number) => {
    const applyOpacity = () => {
      if (this.image) {
        console.log('Applying opacity to image:', opacity);
        this.image.style.opacity = opacity.toString();
      } else {
        console.warn('Image not yet in DOM, retrying...');
        setTimeout(applyOpacity, 100); 
      }
    };
  
    applyOpacity();
  };

  updatePositionImage = () => {
    this.isDragging = false;
    if(!this.image) return;
    if(this.image){
    this.image.addEventListener('mousedown', this.handleMouseDown);
    }
  }

  removeImage = () => {
    if (this.image) {
      this.image.remove();
      this.image = null;
      console.log('Image removed');
    } else {
      console.warn('No image to remove');
    }
  };
}