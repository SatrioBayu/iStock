import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./GlassTiles.module.css";

const GlassTiles = () => {
  const navigate = useNavigate();
  const { status } = useParams(); // ambil status dari URL, bisa undefined

  const items = [
    {
      title: "Menunggu Persetujuan",
      icon: "bi-hourglass-split",
      color: "warning",
      status: "menunggu",
      desc: "Pengajuan sedang menunggu persetujuan.",
    },
    {
      title: "Disetujui",
      icon: "bi-check-circle",
      color: "success",
      status: "disetujui",
      desc: "Pengajuan telah disetujui.",
    },
    {
      title: "Ditolak",
      icon: "bi-x-circle",
      color: "danger",
      status: "ditolak",
      desc: "Pengajuan ditolak oleh atasan.",
    },
    {
      title: "Selesai",
      icon: "bi-box-seam",
      color: "primary",
      status: "selesai",
      desc: "Barang telah diterima dan proses selesai.",
    },
  ];

  return (
    <div className={`container my-5 ${styles.glassContainer}`}>
      <div className="row g-4 justify-content-center align-items-stretch">
        {items.map((item, i) => {
          const isActive =
            (status === undefined && item.status === "") ||
            status === item.status;

          return (
            <div
              key={item.title}
              className="col-10 col-md-5 col-lg-3 d-flex"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div
                className={`${styles.glassTile} ${styles[item.color]} ${
                  styles.fadeIn
                } ${isActive ? styles.active : ""} flex-fill`}
                onClick={() =>
                  !isActive &&
                  navigate(
                    item.status
                      ? `/riwayat-pengajuan/${item.status}`
                      : `/riwayat-pengajuan`
                  )
                }
              >
                <div className={styles.iconWrapper}>
                  <i className={`bi ${item.icon}`}></i>
                </div>
                <h5 className="fw-semibold mt-3">{item.title}</h5>
                <p className="text-muted small">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GlassTiles;
