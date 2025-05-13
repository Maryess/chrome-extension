import { IImage } from "shared/types/image";

export const ImageOverlayManager = () => {
    const addImage = ({path,opacity}:IImage) => {
        const existingImage = document.querySelector<HTMLImageElement>('img.image_container');
        if (existingImage) {
          console.warn('Image already exists');
          return;
        }
        const image = document.createElement('img');
        image.className = 'image_container';
        image.src = path;
        image.style.setProperty('opacity', opacity.toString(), 'important'); 
        image.style.transition = 'opacity 0.3s ease';
        document.body.appendChild(image);
        updatePositionImage();
      };
      
    const updateImageOpacity = (opacity: number) => {
        const applyOpacity = () => {
          const image = document.querySelector<HTMLImageElement>('img.image_container');
          if (image) {
            console.log('Applying opacity to image:', opacity);
            image.style.opacity = opacity.toString();
          } else {
            console.warn('Image not yet in DOM, retrying...');
            setTimeout(applyOpacity, 100); 
          }
        };
      
        applyOpacity();
      };
      
    const updatePositionImage = () => {
        let isDragging = false;
        const existingImage = document.querySelector<HTMLImageElement>('img.image_container')
        if(!existingImage) return;
      
        let x = 0;
        let y = 0;
      
        const handleMouseDown = (e:MouseEvent) => {
          isDragging = true;
          x = e.clientX - existingImage.offsetLeft;
          y = e.clientY - existingImage.offsetTop;
          e.preventDefault()
        }
      
        const handleMouseUp = () => {
          isDragging = false;
        }
      
        if(existingImage){
        const handleMouseMove = (e:MouseEvent) => {
          if(isDragging){
            existingImage.style.left = `${e.clientX - x}px`;
            existingImage.style.top = `${e.clientY - y}px`;
          }
        }
      
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        existingImage.addEventListener('mousedown', handleMouseDown);
        }
      }
      
      const removeImage = () => {
        const existingImage = document.querySelector('img.image_container');
        if (existingImage) {
          existingImage.remove();
          console.log('Image removed');
        } else {
          console.warn('No image to remove');
        }
      };

    return {
      addImage,
      removeImage,
      updateImageOpacity,
      updatePositionImage}
      
}