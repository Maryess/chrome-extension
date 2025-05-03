import { Button, Input } from '@chakra-ui/react';
import { useLayoutEffect, useState } from 'react';
import { ChakraProvider } from './providers';
import { Home } from 'pages/index';



const App = () => {
  // const [url, setUrl] = useState('');
  // const [mock, setMock] = useState('');

  // useLayoutEffect(() => {
  //   (async () => {
  //     const keys = await chrome.storage.local.getKeys();
  //     const last = keys.at(-1);
  //     if (last) {
  //       const mock = await chrome.storage.local.get(last);
  //       setMock(mock[last]);
  //       setUrl(last);
  //     }
  //   })();
  // }, []);

  // const save = () => {
  //   if (url && mock) {
  //     chrome.storage.local.set({ [url]: mock }, () => {
  //       alert('Mock сохранён!');
  //     });
  //   } else {
  //     alert('Введите URL и ответ!');
  //   }
  // };
  return (
   <div></div>
  );
};

export default App;
