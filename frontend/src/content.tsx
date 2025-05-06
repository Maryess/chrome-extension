import './popup/styles/global.scss'

const containerId = 'app';
const existing = document.getElementById(containerId);

if (existing) {
  existing.remove(); // Закрыть UI
} else {
  const container = document.createElement('div');
  container.id = containerId;

  document.body.appendChild(container);

  import('react').then(React => {
    import('react-dom/client').then(ReactDOM => {
      import('./popup/App').then(({ default: App }) => {
        const root = ReactDOM.createRoot(container!);
        root.render(React.createElement(App));
      });
    });
  });
}

