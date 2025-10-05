import React from "react";

const RiwayatTransaksi = ({ riwayat, onTambahClick }) => (
  <>
    <div className="d-flex justify-content-between align-items-center mb-2">
      <h6 className="fw-semibold">Riwayat Transaksi</h6>
      <button className="btn btn-primary btn-sm" onClick={onTambahClick}>
        Tambah Transaksi
      </button>
    </div>

    <div className="table-responsive">
      <table className="table table-bordered align-middle">
        <thead className="table-light">
          <tr>
            <th>Nama Toko</th>
            <th>Tanggal Transaksi</th>
            <th>Harga Satuan</th>
            <th>Jumlah Dibeli</th>
            <th>Harga Total</th>
          </tr>
        </thead>
        <tbody>
          {riwayat.length > 0 ? (
            riwayat.map((r, i) => (
              <tr key={i}>
                <td>{r.nama_toko}</td>
                <td>{r.tanggal_transaksi}</td>
                <td>{r.harga_satuan}</td>
                <td>{r.jumlah_dibeli}</td>
                <td>{r.harga_total}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center text-muted py-3">
                Belum ada transaksi
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </>
);

export default RiwayatTransaksi;
