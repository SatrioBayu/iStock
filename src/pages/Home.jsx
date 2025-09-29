import React from "react";
import Card from "../components/Card/Card";

function Home() {
  return (
    <>
      <h2>Daftar Barang</h2>
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
    </>
  );
}

export default Home;
