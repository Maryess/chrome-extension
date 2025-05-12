import { Router } from "../../routes/Router";
import { MemoryRouter } from "react-router";
import { Layout } from "widgets/Layout";
import { ThemeProvider } from "../Theme";

export const Provider=()=>{
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
