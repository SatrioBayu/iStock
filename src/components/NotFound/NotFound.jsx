import React from "react";
import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

export default function NotFound() {
  return (
    <div
      className={`d-flex flex-column align-items-center justify-content-center text-center vh-100 ${styles.wrapper}`}
    >
      <div className={styles.imageWrapper}>
        {/* SVG ilustrasi gudang / box hilang */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="220"
          height="220"
          fill="none"
          viewBox="0 0 512 512"
          className={styles.illustration}
        >
          <rect
            x="56"
            y="128"
            width="400"
            height="256"
            rx="24"
            fill="#f8f9fa"
            stroke="#0d6efd"
            strokeWidth="12"
          />
          <path
            d="M80 160h352v64H80z"
            fill="#e9ecef"
            stroke="#0d6efd"
            strokeWidth="8"
          />
          <path
            d="M200 320h112v48H200z"
            fill="#0d6efd"
            opacity="0.7"
            stroke="#0d6efd"
          />
          <text
            x="256"
            y="275"
            textAnchor="middle"
            fontSize="72"
            fontWeight="700"
            fill="#0d6efd"
          >
            404
          </text>
        </svg>
      </div>

      <h2 className={styles.title}>Halaman Tidak Ditemukan</h2>
      <p className={styles.subtitle}>
        Sepertinya kamu nyasar ke rak yang belum diisi 😅
        <br />
        Yuk kembali dan temukan stokmu di tempat yang benar!
      </p>

      <Link to="/" className={`btn btn-primary mt-3 ${styles.backButton}`}>
        Kembali ke Beranda
      </Link>
    </div>
  );
}
