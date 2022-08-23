import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../Components/Header";

type Props = {};

function Shell({}: Props) {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default Shell;
