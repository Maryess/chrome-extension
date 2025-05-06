import { Layout } from "components/index";
import { ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";
import { Router } from "../../routes/Router";
import { ChakraProvider } from "..";

export default function App() {
  return (
    <ChakraProvider>
      <MemoryRouter initialEntries={['/']}>
        <Layout>
          <Router />
        </Layout>
      </MemoryRouter>
    </ChakraProvider>
  );
}
