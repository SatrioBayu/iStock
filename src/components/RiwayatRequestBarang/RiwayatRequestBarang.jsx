import React from "react";
import styles from "./RiwayatRequestBarang.module.css";

export default function RiwayatRequestBarang({ requestDetails = [] }) {
  return (
    <div className={styles.container}>
      <h5 className={styles.title}>Barang Keluar</h5>

      <div className="table-responsive">
        <table className={`table table-bordered ${styles.table}`}>
          <thead>
            <tr>
              <th>Kode Request</th>
              <th>Bagian</th>
              <th>Pemohon</th>
              <th>Jumlah Diajukan</th>
              <th>Jumlah Disetujui</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {requestDetails.length > 0 ? (
              requestDetails.map((item, index) => {
                let statusClass = styles.pending;
                let statusText = "Menunggu";

                if (item.status === "Disetujui") {
                  statusClass = styles.approved;
                  statusText = "Disetujui";
                } else if (item.status === "Ditolak") {
                  statusClass = styles.rejected;
                  statusText = "Ditolak";
                } else if (item.status === "Disetujui Sebagian") {
                  statusClass = styles.done;
                  statusText = "Disetujui Sebagian";
                }

                return (
                  <tr key={index}>
                    <td>{item.Request?.kode_request}</td>
                    <td>{item.Request?.nama_bagian}</td>
                    <td>{item.Request?.nama_pemohon}</td>
                    <td>{item.jumlah}</td>
                    <td>{item.jumlah_disetujui ?? "-"}</td>
                    <td className={statusClass}>{statusText}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className={styles.noData}>
                  Belum ada transaksi yang tercatat
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
