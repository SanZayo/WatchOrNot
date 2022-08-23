import { BrowserRouter } from "react-router-dom";
import ThemeProvider from "react-bootstrap/ThemeProvider";
import Container from "react-bootstrap/Container";

import AppRoutes from "./Pages/AppRoutes";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./App.css";
import { AppProvider } from "./Contexts/AppContext";

function App() {
  return (
    <div className="movie-app">
      <ThemeProvider breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]} minBreakpoint="xxs">
        <Container fluid>
          <BrowserRouter>
            <AppProvider>
              <AppRoutes />
            </AppProvider>
          </BrowserRouter>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
