import React from "react";
import { Outlet } from "react-router";
import Header from "./Header";

function Layout() {
  return (
    <div id="layout">
      <Header />
      <Outlet />
    </div>
  );
}

export default Layout;
