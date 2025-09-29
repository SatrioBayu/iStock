import { useState } from "react";
// import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import RiwayatPengajuan from "./pages/RiwayatPengajuan";

function App() {
  return (
    <>
      <Header />
      <div className="container-md p-4 border">
        <Home />
        {/* <RiwayatPengajuan /> */}
      </div>

      <Footer />
    </>
  );
}

export default App;
