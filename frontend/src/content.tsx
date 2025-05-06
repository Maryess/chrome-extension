const containerId = 'my-extension-root';
const existing = document.getElementById(containerId);

if (existing) {
  existing.remove(); // Закрыть UI
} else {
  const container = document.createElement('div');
  container.id = containerId;
  Object.assign(container.style, {
    position: 'fixed',
    top: '0',
    right: '0',
    zIndex: '999999',
    width: '350px',
    height: '600px',
    backgroundColor: '#fff',
    pointerEvents: 'auto',
    color:'#000'
  });

  document.body.appendChild(container);

  import('react').then(React => {
    import('react-dom/client').then(ReactDOM => {
      import('app/App').then(({ default: App }) => {
        const root = ReactDOM.createRoot(container!);
        root.render(React.createElement(App));
      });
    });
  });
}

