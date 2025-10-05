import React from "react";
import styles from "./Card.module.css";
import { Link } from "react-router-dom";

function Card({ nama_barang, stok, barcode }) {
  return (
    <div className="col">
      <Link
        className="text-decoration-none text-dark"
        to={`/detail-barang/${barcode}`}
      >
        <div className={`card h-100 ${styles["hover-card"]}`}>
          {/* <img src="./iStock.png" className="card-img-top" alt="..." /> */}
          <div className="card-body">
            <h5 className="card-title">{nama_barang}</h5>
          </div>
          <div className="card-footer">
            <p className={`mb-0 ${styles["card-teks"]}`}>Stok: {stok}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Card;
