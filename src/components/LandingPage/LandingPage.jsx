import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";

export default function LandingPage() {
  return (
    <div className={styles.landingWrapper}>
      {/* ===== HERO SECTION ===== */}
      <section className={`container-fluid ${styles.heroSection}`}>
        <div className="row align-items-center">
          <div className="col-lg-6 text-center text-lg-start">
            <h1 className={styles.appName}>iStock</h1>
            <h2 className={styles.title}>
              Sistem Cerdas untuk <br />
              <span className={styles.highlight}>
                Manajemen Persediaan Barang
              </span>
            </h2>
            <p className={styles.subtitle}>
              iStock membantu unit kerja dalam mengelola stok, melakukan
              pengajuan kebutuhan barang, serta memantau distribusi persediaan
              dengan cepat, akurat, dan transparan.
            </p>
            <div className="d-flex justify-content-center justify-content-lg-start gap-3 mt-4">
              <Link to="dashboard">
                <button className={`btn btn-primary ${styles.primaryBtn}`}>
                  Masuk ke Dashboard
                </button>
              </Link>
            </div>
          </div>

          <div className="col-lg-6 mt-5 mt-lg-0 text-center">
            <div className={styles.illustrationWrapper}>
              <img
                src="/iStock.png"
                alt="Inventory Illustration"
                className={styles.illustration}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section className={styles.featuresSection}>
        <div className="container text-center">
          <h2 className={styles.sectionTitle}>Fitur Utama iStock</h2>
          <p className={styles.sectionSubtitle}>
            Dirancang untuk mendukung proses pengelolaan gudang dan permintaan
            barang agar lebih teratur dan efisien.
          </p>

          <div className="row mt-5">
            <div className="col-md-4 mb-4">
              <div className={styles.featureBox}>
                <i className={`bi bi-box-seam ${styles.featureIcon}`}></i>
                <h5>Manajemen Stok Otomatis</h5>
                <p>
                  Pantau jumlah barang masuk dan keluar secara real-time. Sistem
                  akan memberi peringatan saat stok menipis.
                </p>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className={styles.featureBox}>
                <i
                  className={`bi bi-file-earmark-plus ${styles.featureIcon}`}
                ></i>
                <h5>Pengajuan Barang Online</h5>
                <p>
                  Permudah proses permintaan barang antar unit kerja secara
                  digital, lengkap dengan status dan riwayat pengajuan.
                </p>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className={styles.featureBox}>
                <i className={`bi bi-clipboard-data ${styles.featureIcon}`}></i>
                <h5>Laporan & Analisis</h5>
                <p>
                  Dapatkan laporan penggunaan barang, pengadaan, dan stok dalam
                  format yang mudah dibaca untuk keperluan monitoring.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PREVIEW SECTION ===== */}
      <section className={styles.previewSection}>
        <div className="container text-center">
          <h2 className={styles.sectionTitle}>Antarmuka yang Intuitif</h2>
          <p className={styles.sectionSubtitle}>
            Dashboard iStock dirancang untuk memberikan kemudahan akses ke
            seluruh fitur, mulai dari pencatatan barang hingga laporan
            penggunaan.
          </p>
          <div className={styles.previewWrapper}>
            <img
              src="/dashboard.png"
              alt="Dashboard Preview"
              className={styles.previewImage}
            />
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className={styles.footer}>
        <div className="container text-center">
          <p className="mb-0">
            © {new Date().getFullYear()} <strong>iStock</strong> — Sistem
            Manajemen Persediaan Barang.
          </p>
          <small className="text-muted">
            Dibuat untuk mendukung efisiensi pengelolaan gudang & distribusi
            barang.
          </small>
        </div>
      </footer>
    </div>
  );
}
