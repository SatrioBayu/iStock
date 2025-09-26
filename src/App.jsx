import { useState } from "react";
// import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Card from "./components/Card/Card";

function App() {
  return (
    <>
      <Header />
      <div className="container-md p-4 border">
        <div className="g-4 row row-cols-1 row-cols-sm-2 row-cols-md-4">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>

      <Footer />
    </>
  );
}

export default App;
