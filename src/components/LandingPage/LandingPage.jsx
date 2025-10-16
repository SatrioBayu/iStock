import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";

export default function LandingPage() {
  return (
    <div className={styles.landingWrapper}>
      {/* ===== HERO SECTION ===== */}
      <section className={`${styles.section} ${styles.hero}`}>
        <div className={styles.content}>
          <h1 className={styles.appName}>iStock</h1>
          <h2 className={styles.subtitleEmphasis}>
            Pengadilan Tinggi Tata Usaha Negara Makassar
          </h2>
          <p className={styles.subtitle}>
            Sistem Cerdas untuk Manajemen Persediaan Barang
          </p>
          <Link to="dashboard">
            <button className="btn btn-primary mt-3 px-4 py-2">
              Masuk ke Dashboard
            </button>
          </Link>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section className={styles.features}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Fitur Unggulan</h2>
          <p className={styles.sectionSubtitle}>
            Dirancang untuk memudahkan pengelolaan gudang dan proses distribusi
            barang.
          </p>

          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <i className={`bi bi-box-seam ${styles.featureIcon}`}></i>
              <h5>Manajemen Stok Otomatis</h5>
              <p>
                Pantau stok barang masuk dan keluar secara real-time dengan
                notifikasi stok menipis.
              </p>
            </div>

            <div className={styles.featureCard}>
              <i
                className={`bi bi-file-earmark-plus ${styles.featureIcon}`}
              ></i>
              <h5>Pengajuan Barang Online</h5>
              <p>
                Ajukan kebutuhan barang antar unit kerja dengan cepat,
                transparan, dan tanpa kertas.
              </p>
            </div>

            <div className={styles.featureCard}>
              <i className={`bi bi-clipboard-data ${styles.featureIcon}`}></i>
              <h5>Laporan & Analisis</h5>
              <p>
                Dapatkan laporan visual interaktif untuk membantu evaluasi dan
                pengambilan keputusan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PREVIEW SECTION ===== */}
      <section className={styles.preview}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Dashboard Interaktif</h2>
          <p className={styles.sectionSubtitle}>
            Visualisasi stok, pengajuan, dan distribusi barang dalam satu
            tampilan yang mudah dipahami.
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
        <p>
          © {new Date().getFullYear()} <strong>iStock</strong> — Sistem
          Manajemen Persediaan Barang.
        </p>
        <small>
          Pengadilan Tinggi Tata Usaha Negara Makassar • Semua Hak Dilindungi.
        </small>
      </footer>
    </div>
  );
}
