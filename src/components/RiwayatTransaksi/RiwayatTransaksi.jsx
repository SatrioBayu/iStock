import React from "react";
import styles from "./RiwayatTransaksi.module.css";

const RiwayatTransaksi = ({ riwayat, onTambahClick, onDelete, user }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h5 className={styles.title}>Barang Masuk</h5>
        <button
          // className={styles.addButton}
          className="btn btn-outline-primary btn-sm"
          onClick={onTambahClick}
          disabled={!user}
        >
          + Tambah Transaksi
        </button>
      </div>

      <div className="table-responsive">
        <table className={`table table-bordered ${styles.table}`}>
          <thead>
            <tr>
              <th>Nama Toko</th>
              <th>Tanggal Transaksi</th>
              <th>Harga Satuan</th>
              <th>Jumlah Dibeli</th>
              <th>Harga Total</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {riwayat.length > 0 ? (
              riwayat.map((r, i) => (
                <tr key={i}>
                  <td>{r.nama_toko}</td>
                  <td>{r.tanggal_transaksi}</td>
                  <td>Rp {r.harga_satuan?.toLocaleString("id-ID")}</td>
                  <td>{r.jumlah_dibeli}</td>
                  <td>Rp {r.harga_total?.toLocaleString("id-ID")}</td>
                  <td>
                    <button
                      className={styles.deleteButton}
                      onClick={() => onDelete(r.id)}
                      disabled={!user}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
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
};

export default RiwayatTransaksi;
