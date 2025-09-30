import React, { useState } from "react";

const DUMMY = [
  {
    id: "FORM/22/IX/25",
    date: "22 September 2025",
    status: "Menunggu Persetujuan",
  },
  {
    id: "FORM/23/IX/25",
    date: "23 September 2025",
    status: "Ditolak",
  },
  {
    id: "FORM/24/IX/25",
    date: "24 September 2025",
    status: "Disetujui",
  },
];

function RiwayatPengajuan() {
  const [riwayat, setRiwayat] = useState(DUMMY);
  const [pencarian, setPencarian] = useState("");

  const filteredList = riwayat.filter((item) =>
    item.id.toLowerCase().includes(pencarian.toLowerCase())
  );
  // const handlePencarian = () => {
  //   setRiwayat(filteredList);
  // };

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
            <th>Tanggal Pengajuan</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredList.length > 0 ? (
            filteredList.map((data) => (
              <tr key={data.id}>
                <td>{data.id}</td>
                <td>{data.date}</td>
                <td>
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
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">
                <h5>Data Not Found...</h5>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default RiwayatPengajuan;
