import 'styles/global.scss';
import { addImage, removeImage, updateImageOpacity } from './content/imageHandler';
import { getImageData, getOpacityData } from './content/storage';

const containerId = 'app';
let container = document.getElementById(containerId);

if (container) {
  container.remove();
  removeImage();
} else {
  container = document.createElement('div');
  container.className = 'my-extension-wrapper';
  container.id = containerId;
  document.body.appendChild(container);

  Promise.all([getImageData(), getOpacityData()])
    .then(([data, opacity]) => {
      const actualOpacity = opacity?.opacity ?? 1;

      if (data?.imageUrlBase64) {
        addImage(data.imageUrlBase64, actualOpacity);

        let lastOpacity = actualOpacity;

        setInterval(() => {
          chrome.storage.local.get('dragOpacity', (result) => {
            const newOpacity = result.dragOpacity?.opacity ?? 1;
        
            if (newOpacity !== lastOpacity) {
              lastOpacity = newOpacity;
              console.log('🔄 Updating image opacity to:', newOpacity);
              updateImageOpacity(newOpacity);
            }
          });
        }, 300);
      } else {
        console.warn('The image not found');
      }
    });

  import('react').then(React => {
    import('react-dom/client').then(ReactDOM => {
      import('./popup/app/App').then(({ default: App }) => {
        const root = ReactDOM.createRoot(container!);
        root.render(React.createElement(App));
      });
    });
  });
}

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'local' && changes['dragOpacity']) {
    const newOpacity = changes['dragOpacity'].newValue?.opacity;
    console.log('Detected opacity change in storage:', newOpacity);
    if (typeof newOpacity === 'number') {
      updateImageOpacity(newOpacity);
    }
  }
});
