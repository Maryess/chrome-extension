import { ImageOverlayManager } from 'entities/ImageOverlay';
import 'styles/global.scss';

const containerId = 'app';
let container = document.getElementById(containerId);
const image = document.querySelector('.image_container')

const removeImage = () => {
  const image = document.querySelector('.image_container');
  if (image) {
    image.remove();
    console.log('Image removed');
  } else {
    console.warn('No image to remove');
  }
};

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
}

