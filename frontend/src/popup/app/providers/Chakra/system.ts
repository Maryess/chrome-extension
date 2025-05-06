import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

const config = defineConfig({
  strictTokens: true,
  theme: {
    tokens: {},
  },
});

const system = createSystem(defaultConfig, config);

export default system;
