(async () => {
  const containerId = 'my-extension-root';
  const existing = document.getElementById(containerId);

  if (existing) {
    existing.remove(); // закрыть
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

    const React = await import('react');
    const ReactDOM = await import('react-dom/client');
    const { default: App } = await import('app/App');

    const root = ReactDOM.createRoot(container);
    root.render(React.createElement(App));
  }
})();
