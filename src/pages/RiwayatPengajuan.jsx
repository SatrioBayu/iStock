import React, { useState } from "react";
import { Link } from "react-router-dom";

export const DUMMY = [
  {
    id: "FORM-22-IX-25",
    date: "22 September 2025",
    status: "Menunggu Persetujuan",
    namaPemohon: "Bayu",
    barang: [
      {
        nama: "Kertas F4",
        jumlah: 3,
      },
      {
        nama: "Kertas A5",
        jumlah: 3,
      },
      {
        nama: "Kertas A4",
        jumlah: 3,
      },
    ],
  },
  {
    id: "FORM-23-IX-25",
    date: "23 September 2025",
    status: "Ditolak",
    namaPemohon: "Fariz",
    barang: [
      {
        nama: "Kertas F4",
        jumlah: 3,
      },
      {
        nama: "Kertas A5",
        jumlah: 3,
      },
      {
        nama: "Kertas A4",
        jumlah: 3,
      },
    ],
  },
  {
    id: "FORM-24-IX-25",
    date: "24 September 2025",
    status: "Disetujui",
    namaPemohon: "Sani",
    barang: [
      {
        nama: "Kertas F4",
        jumlah: 3,
      },
      {
        nama: "Kertas A5",
        jumlah: 3,
      },
      {
        nama: "Kertas A4",
        jumlah: 3,
      },
    ],
  },
];

function RiwayatPengajuan() {
  const [riwayat, setRiwayat] = useState(DUMMY);
  const [pencarian, setPencarian] = useState("");

  const filteredList = riwayat.filter(
    (item) =>
      item.id.toLowerCase().includes(pencarian.toLowerCase()) ||
      item.date.toLowerCase().includes(pencarian.toLowerCase()) ||
      item.namaPemohon.toLowerCase().includes(pencarian.toLowerCase())
  );

  return (
    <div className="table-responsive container-fluid">
      <h2>Riwayat Pengajuan Barang</h2>
      <div className="my-3 gy-2 row row-cols-1 row-cols-sm-3">
        <div className="col">
          <input
            type="text"
            placeholder="Cari Riwayat Pengajuan"
            id="search-control"
            className="form-control"
            onChange={(e) => setPencarian(e.target.value)}
          />
        </div>
      </div>
      <table className="table table-striped table-hover">
        <thead>
          <tr className="table-active">
            <th>Nomor Pengajuan</th>
            <th>Nama Pemohon</th>
            <th>Tanggal Pengajuan</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredList.length > 0 ? (
            filteredList.map((data) => (
              <tr key={data.id}>
                <td>{data.id}</td>
                <td>{data.namaPemohon}</td>
                <td>{data.date}</td>
                <td>
                  <Link to={data.id}>
                    <button
                      className={`btn ${
                        data.status === "Menunggu Persetujuan"
                          ? "btn-warning"
                          : data.status === "Ditolak"
                          ? "btn-danger"
                          : data.status === "Disetujui"
                          ? "btn-success"
                          : undefined
                      }`}
                    >
                      {data.status}
                    </button>
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">
                <h6>Data pengajuan tidak ditemukan</h6>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default RiwayatPengajuan;
