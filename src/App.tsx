import { BrowserRouter } from "react-router-dom";
import ThemeProvider from "react-bootstrap/ThemeProvider";
import Container from "react-bootstrap/Container";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import AppRoutes from "./Pages/AppRoutes";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./App.css";
import { AppProvider } from "./Contexts/AppContext";

const staleTime = 1000 * 60 * 60 * 24;
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: staleTime,
    },
  },
});

function App() {
  return (
    <div className="movie-app">
      <ThemeProvider breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]} minBreakpoint="xxs">
        <QueryClientProvider client={queryClient}>
          <Container fluid>
            <BrowserRouter>
              <AppProvider>
                <AppRoutes />
              </AppProvider>
            </BrowserRouter>
          </Container>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
