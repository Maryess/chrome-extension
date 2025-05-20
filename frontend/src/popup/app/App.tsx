import { ThemeProvider } from "./providers/Theme";
import { MemoryRouter } from "react-router";
import { Layout } from "widgets/Layout";
import { Router } from "./routes/Router";
import { ImageOverlay } from "entities/ImageOverlay";
import { DistanceOverlay } from "entities/DistanceOverlay";

const App = () => {
  return (
    <ThemeProvider>
      <MemoryRouter initialEntries={['/']}>
        <Layout>
          <Router />  
          <ImageOverlay/>
          <DistanceOverlay/>
        </Layout>
      </MemoryRouter>
    </ThemeProvider>
  );
};

export default App;
