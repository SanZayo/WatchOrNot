import ThemeProvider from "react-bootstrap/ThemeProvider";

import AppRoutes from "./Pages/AppRoutes";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./App.css";
import Header from "./Components/Header";
import Container from "react-bootstrap/Container";

function App() {
  return (
    <div className="movie-app">
      <ThemeProvider breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]} minBreakpoint="xxs">
        <Container fluid>
          <Header />
          <AppRoutes />
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
