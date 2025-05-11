import { getFromChromeStorage } from 'shared/lib/helpers/chromeStorage';
import 'styles/global.scss';

const removeImage = () => {
  const existingImage = document.querySelector('img.image_container');
  if (existingImage) {
    existingImage.remove();
  }
}

const containerId = 'app';
let container = document.getElementById(containerId);

if (container) {
  container.remove();
  removeImage()
} else {
  container = document.createElement('div');
  container.className = 'my-extension-wrapper';
  container.id = containerId;
  document.body.appendChild(container);

  import('react').then(React => {
    import('react-dom/client').then(ReactDOM => {
      import('./popup/app/App').then(({ default: App }) => {
        const root = ReactDOM.createRoot(container!);
        root.render(React.createElement(App));
      });
    });
  });

  const addImage = (imageUrl:string) => {
    const image = document.createElement('img')
    image.className = 'image_container'
    image.src = imageUrl
    document.body.appendChild(image)
  }
  
  getFromChromeStorage<{ imageName: string; imageUrlBase64: string }>('selected image')
    .then((data) => {
      if (data?.imageUrlBase64) {
        addImage(data.imageUrlBase64); 
      } else {
        console.warn('Изображение не найдено');
      }
    });
}


