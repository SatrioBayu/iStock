import { useState } from "react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

function RiwayatTable({ title, data }) {
  const [pencarian, setPencarian] = useState("");
  const filteredData = data.filter((item) => {
    return (
      item.kode_request.toLowerCase().includes(pencarian) ||
      item.nama_pemohon.toLowerCase().includes(pencarian) ||
      dayjs(item.tanggal_request)
        .format("DD MMMM YYYY HH:mm")
        .toLowerCase()
        .includes(pencarian) ||
      item.status_request.toLowerCase().includes(pencarian)
    );
  });

  return (
    <div className="border rounded p-3 my-3">
      <h5 className="mb-0">Riwayat Pengajuan Barang yang {title}</h5>
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
      <table className="table table-striped table-hover align-middle">
        <thead>
          <tr className="table-active">
            <th>Nomor Pengajuan</th>
            <th>Nama Pemohon</th>
            <th>Tanggal Pengajuan</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((data) => (
              <tr key={data.id}>
                <td>{data.kode_request}</td>
                <td>{data.nama_pemohon}</td>
                <td>
                  {dayjs(data.tanggal_request).format("DD MMMM YYYY HH:mm:ss")}
                </td>
                <td>
                  <Link to={data.kode_request}>
                    <button
                      className={`btn ${
                        data.status_request === "Menunggu Persetujuan"
                          ? "btn-warning"
                          : data.status_request === "Ditolak"
                          ? "btn-danger"
                          : data.status_request === "Disetujui"
                          ? "btn-success"
                          : data.status_request === "Selesai"
                          ? "btn-primary"
                          : undefined
                      }`}
                    >
                      {data.status_request}
                    </button>
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                <h6>Data pengajuan tidak ditemukan</h6>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default RiwayatTable;
