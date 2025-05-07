import { Layout } from "components/index";
import { ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";
import { Router } from "../../routes/Router";

export default function App() {
  return (
      <MemoryRouter initialEntries={['/']}>
        <Layout>
          <Router />
        </Layout>
      </MemoryRouter>
  );
}
