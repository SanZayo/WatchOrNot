import ThemeProvider from "react-bootstrap/ThemeProvider";

import AppRoutes from "./Pages/AppRoutes";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./App.css";

function App() {
  return (
    <div className="movie-app">
      <ThemeProvider breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]} minBreakpoint="xxs">
        <AppRoutes />
      </ThemeProvider>
    </div>
  );
}

export default App;
