import { ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";
import { Router } from "../../routes/Router";
import ThemeProvider from "../Theme/ThemeProvider";
import { Layout } from "widgets/index";

export default function App() {
  return (
    <ThemeProvider>
      <MemoryRouter initialEntries={['/']}>
        <Layout>
          <Router />
        </Layout>
      </MemoryRouter>
    </ThemeProvider>
  );
}
