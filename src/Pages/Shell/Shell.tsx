import { Outlet } from "react-router-dom";
import Header from "../../Components/Header";

function Shell() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default Shell;
