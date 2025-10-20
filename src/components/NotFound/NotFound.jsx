import React from "react";
import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

export default function NotFound() {
  return (
    <div
      className={`d-flex flex-column align-items-center justify-content-center text-center vh-100 ${styles.wrapper}`}
    >
      <div className={styles.imageWrapper}>
        {/* SVG ilustrasi gudang dan forklift */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="240"
          height="240"
          viewBox="0 0 512 512"
          fill="none"
          className={styles.illustration}
        >
          <rect
            x="64"
            y="160"
            width="384"
            height="192"
            rx="12"
            fill="#e9ecef"
            stroke="#0d6efd"
            strokeWidth="10"
          />
          <rect
            x="64"
            y="128"
            width="384"
            height="48"
            rx="8"
            fill="#0d6efd"
            opacity="0.9"
          />
          <rect
            x="96"
            y="200"
            width="80"
            height="60"
            rx="6"
            fill="#ffffff"
            stroke="#0d6efd"
            strokeWidth="6"
          />
          <rect
            x="200"
            y="200"
            width="80"
            height="60"
            rx="6"
            fill="#ffffff"
            stroke="#0d6efd"
            strokeWidth="6"
          />
          <rect
            x="304"
            y="200"
            width="80"
            height="60"
            rx="6"
            fill="#ffffff"
            stroke="#0d6efd"
            strokeWidth="6"
          />

          {/* Forklift */}
          <circle cx="150" cy="370" r="20" fill="#0d6efd" />
          <circle cx="220" cy="370" r="20" fill="#0d6efd" />
          <rect x="135" y="330" width="100" height="20" fill="#0d6efd" />
          <rect x="220" y="260" width="10" height="70" fill="#0d6efd" />
          <rect x="230" y="250" width="10" height="90" fill="#6c757d" />
          <rect x="240" y="310" width="30" height="20" fill="#ffc107" rx="3" />

          {/* Box bertuliskan 404 */}
          <rect
            x="270"
            y="310"
            width="100"
            height="60"
            rx="6"
            fill="#ffc107"
            stroke="#ffcd39"
            strokeWidth="4"
          />
          <text
            x="320"
            y="350"
            textAnchor="middle"
            fontSize="40"
            fontWeight="700"
            fill="#0d6efd"
          >
            404
          </text>
        </svg>
      </div>

      <h2 className={styles.title}>Halaman Tidak Ditemukan</h2>
      <p className={styles.subtitle}>
        Sepertinya kamu masuk ke gudang yang belum terdaftar 😅
        <br />
        Yuk kembali dan temukan stokmu di lokasi yang benar!
      </p>

      <Link
        to="/dashboard"
        className={`btn btn-primary mt-3 ${styles.backButton}`}
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
