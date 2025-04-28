import { createRoot } from 'react-dom/client';
import { App } from './popup/app/App';

const root = createRoot(document.getElementById('app')!);

root.render(<App />);
