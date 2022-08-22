import { BrowserRouter, Route, Routes } from "react-router-dom";
import Details from "./Details";
import Home from "./Home";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/:type/:typeId" element={<Details />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
