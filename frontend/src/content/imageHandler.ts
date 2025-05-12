export const addImage = (imageUrl: string, opacity: number) => {
  const existingImage = document.querySelector<HTMLImageElement>('img.image_container');
  if (existingImage) {
    console.warn('Image already exists');
    return;
  }
  const image = document.createElement('img');
  image.className = 'image_container';
  image.src = imageUrl;
  image.style.setProperty('opacity', opacity.toString(), 'important'); 
  image.style.transition = 'opacity 0.3s ease';
  document.body.appendChild(image);
};

export const updateImageOpacity = (opacity: number) => {
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

export const removeImage = () => {
  const existingImage = document.querySelector('img.image_container');
  if (existingImage) {
    existingImage.remove();
  }
};
