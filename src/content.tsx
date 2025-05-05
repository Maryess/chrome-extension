import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './popup/app/App';

const existing = document.getElementById('my-extension-root');
if (existing) existing.remove();

const container = document.createElement('div');
container.id = 'my-extension-root';
Object.assign(container.style, {
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  zIndex: '999999',
  pointerEvents: 'none',
});
document.body.appendChild(container);

const root = ReactDOM.createRoot(container);
root.render(<App />);