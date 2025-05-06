import { Button, Input } from '@chakra-ui/react';
import { useLayoutEffect, useState } from 'react';
import { ChakraProvider, MainProvider } from './providers';
import { Home } from 'pages/index';

const App = () => {
  return (
    <MainProvider/>
  );
};

export default App;
