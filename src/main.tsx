import  App  from 'app/App';
import { MainProvider } from 'app/providers';
import { createRoot } from 'react-dom/client';


const root = createRoot(document.getElementById('app')!);

root.render(
    <MainProvider/>
);
