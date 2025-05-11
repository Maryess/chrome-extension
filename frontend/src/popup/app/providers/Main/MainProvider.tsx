import { ReactNode } from "react";
import { Router } from "../../routes/Router";
import ThemeProvider from "../Theme/ThemeProvider";
import { Layout } from "widgets/index";
import { MemoryRouter } from "react-router";

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
