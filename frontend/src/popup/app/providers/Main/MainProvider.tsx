import { Router } from "../../routes/Router";
import { MemoryRouter } from "react-router";
import { Layout } from "widgets/Layout";
import { ThemeProvider } from "../Theme";
import { ImageOverlay } from "entities/ImageOverlay";

export const Provider=()=>{
  return (
    <ThemeProvider>
        <MemoryRouter initialEntries={['/']}>
          <Layout>
            <Router />
            <ImageOverlay/>
          </Layout>
        </MemoryRouter>
    </ThemeProvider>
  );
}
