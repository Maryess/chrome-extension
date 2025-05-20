import { ImageOverlayManager } from 'entities/ImageOverlay';
import 'styles/global.scss';

const containerId = 'app';
let container = document.getElementById(containerId);
const image = document.querySelector('.image_container')

const removeBodyElement = () => {
  const image = document.querySelector('.image_container');
  const distancePopup = document.querySelector('.distance-popup')
  const distanceLine = document.querySelector('.distance-line')
  if (image && distancePopup) {
    image.remove();
    distancePopup.remove()
    distanceLine?.remove()

  } 
};

if (container) {
  container.remove();
  removeBodyElement()
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

