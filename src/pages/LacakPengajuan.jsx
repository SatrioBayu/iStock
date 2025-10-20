import React, { useState } from "react";
import styles from "./LacakPengajuan.module.css";
import { API_BASE_URL } from "../config";
import Spinner from "../components/Spinners/Spinner";

export default function LacakPengajuan() {
  const [kode, setKode] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [notFound, setNotFound] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!kode.trim()) return;

    setLoading(true);
    setError("");
    setNotFound(false);
    setResult(null);

    try {
      const res = await fetch(`${API_BASE_URL}/request/${kode}`);
      const data = await res.json();

      if (!data.data) {
        setNotFound(true);
        setResult(null);
      } else {
        setResult(data.data);
      }
    } catch (err) {
      setError(err.message);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleString("id-ID", {
      dateStyle: "long",
      timeStyle: "short",
    });
  };

  const getStatusInfo = (r) => {
    if (!r) return { text: "-", type: "info" };
    if (r.tanggal_ditolak)
      return { text: "Pengajuan ditolak oleh Kasubbag TURT", type: "danger" };
    if (!r.tanggal_disetujui && !r.tanggal_ditolak)
      return { text: "Menunggu persetujuan Kasubbag TURT", type: "warning" };
    if (r.tanggal_disetujui && !r.tanggal_selesai)
      return { text: "Menunggu tindak lanjut Pengelola BMN", type: "primary" };
    if (r.tanggal_selesai)
      return { text: "Pengajuan telah selesai diproses", type: "success" };
    return { text: "-", type: "info" };
  };

  console.log(result);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Lacak Pengajuan Barang</h2>

        {/* Input */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            placeholder="Masukkan Kode Request..."
            value={kode}
            onChange={(e) => setKode(e.target.value)}
            className={styles.input}
          />
          <button className={styles.btnCari} disabled={loading}>
            {loading ? "Mencari..." : "Cari"}
          </button>
        </form>

        {/* Error */}
        {error && <p className={styles.error}>{error}</p>}

        {/* Spinner */}
        {loading && (
          <div className={styles.spinnerWrap}>
            <Spinner />
          </div>
        )}

        {/* Jika tidak ditemukan */}
        {notFound && (
          <div className={styles.notFound}>
            <img src="/req_not_found.png" alt="Not Found" />
            <p>Data pengajuan dengan kode tersebut tidak ditemukan.</p>
          </div>
        )}

        {/* Result */}
        {result && (
          <div className={styles.result}>
            <div className={styles.headerInfo}>
              <h4 className={styles.kode}>{result.kode_request}</h4>
              <div
                className={`${styles.status} ${
                  styles[getStatusInfo(result).type]
                }`}
              >
                {getStatusInfo(result).text}
              </div>
            </div>

            <div className={styles.details}>
              <p>
                <strong>Nama Pemohon:</strong> {result.nama_pemohon}
              </p>
              <p>
                <strong>Bagian:</strong> {result.nama_bagian}
              </p>
              <p>
                <strong>Tanggal Pengajuan:</strong>{" "}
                {formatDate(result.tanggal_request)}
              </p>
              <p>
                <strong>Catatan Pemohon:</strong>{" "}
                {result.catatan_pemohon || "-"}
              </p>
              <p>
                <strong>Catatan Penyetuju:</strong>{" "}
                {result.catatan_penyetuju || "-"}
              </p>

              <div className={styles.timeline}>
                <div>
                  <strong>Disetujui:</strong>{" "}
                  {formatDate(result.tanggal_disetujui)}
                </div>
                <div>
                  <strong>Ditolak:</strong> {formatDate(result.tanggal_ditolak)}
                </div>
                <div>
                  <strong>Selesai:</strong> {formatDate(result.tanggal_selesai)}
                </div>
              </div>
            </div>

            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Nama Barang</th>
                    <th>Jumlah Diajukan</th>
                    <th>Jumlah Disetujui</th>
                    <th>Satuan</th>
                  </tr>
                </thead>
                <tbody>
                  {result?.Request_Details &&
                  result.Request_Details.length > 0 ? (
                    result.Request_Details.map((item, i) => {
                      let statusClass = styles.pending;
                      let icon = "⏳"; // default menunggu

                      if (item.jumlah_disetujui !== null) {
                        if (item.jumlah_disetujui === item.jumlah) {
                          statusClass = styles.approved;
                          icon = "✅";
                        } else if (item.jumlah_disetujui === 0) {
                          statusClass = styles.rejected;
                          icon = "❌";
                        } else if (item.jumlah_disetujui < item.jumlah) {
                          statusClass = styles.partial;
                          icon = "⚠️";
                        }
                      }

                      return (
                        <tr key={i}>
                          <td>{item.Barang?.nama_barang}</td>
                          <td>{item.jumlah}</td>
                          <td className={statusClass}>
                            {icon}{" "}
                            {item.jumlah_disetujui !== null
                              ? item.jumlah_disetujui
                              : "-"}
                          </td>
                          <td>{item.Barang?.satuan}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center py-4">
                        <div className={styles.emptyState}>
                          <img
                            src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                            alt="No data"
                          />
                          <p>Belum ada data barang untuk pengajuan ini.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
