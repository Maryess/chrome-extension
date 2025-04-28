import { ChakraProvider } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import system from './system';

type Props = {
  children: ReactNode;
};

export const Provider: FC<Props> = ({ children }) => {
  return <ChakraProvider value={system}>{children}</ChakraProvider>;
};
