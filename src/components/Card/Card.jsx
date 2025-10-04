import React from "react";
import styles from "./Card.module.css";

function Card({ nama_barang, stok }) {
  return (
    <div className="col">
      <div className="card h-100">
        <img src="./iStock.png" className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{nama_barang}</h5>
        </div>
        <div className="card-footer">
          <p className={`mb-0 ${styles["card-teks"]}`}>Stok: {stok}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
