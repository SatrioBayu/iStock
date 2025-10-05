import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <>
      <Header />
      <div className="container-md p-4 border app-container">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default RootLayout;
