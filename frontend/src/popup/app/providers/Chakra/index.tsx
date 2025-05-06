import { ChakraProvider } from '@chakra-ui/react';
import { ReactNode } from 'react';
import system from './system';

type Props = {
  children: ReactNode;
};

export default({ children }:Props) => {
  return <ChakraProvider value={system}>{children}</ChakraProvider>;
};
