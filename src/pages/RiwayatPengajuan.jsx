import React, { useState, useEffect } from "react";
import RiwayatTable from "../components/RiwayatTable/RiwayatTable";

function RiwayatPengajuan() {
  // const [pencarian, setPencarian] = useState("");
  const [riwayat, setRiwayat] = useState([]);
  const [loading, setLoading] = useState(true);

  // const filteredList = riwayat.filter((item) => {
  //   const formattedDate = dayjs(item.tanggal_request).format(
  //     "DD MMMM YYYY HH:mm:ss"
  //   );
  //   return (
  //     item.kode_request.toLowerCase().includes(pencarian.toLowerCase()) ||
  //     formattedDate.toLowerCase().includes(pencarian.toLowerCase()) ||
  //     item.nama_pemohon.toLowerCase().includes(pencarian.toLowerCase()) ||
  //     item.status_request.toLowerCase().includes(pencarian.toLowerCase())
  //   );
  // });

  useEffect(() => {
    async function fetchDataRiwayat() {
      try {
        const response = await fetch("http://localhost:3000/request");
        const data = await response.json();
        setRiwayat(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDataRiwayat();
  }, []);

  const menunggu = riwayat.filter(
    (item) => item.status_request === "Menunggu Persetujuan"
  );
  const ditolak = riwayat.filter((item) => item.status_request === "Ditolak");
  const disetujui = riwayat.filter(
    (item) => item.status_request === "Disetujui"
  );
  const selesai = riwayat.filter((item) => item.status_request === "Selesai");

  return (
    <div className="table-responsive container-fluid">
      <h2>Riwayat Pengajuan Barang</h2>
      {/* <div className="my-3 gy-2 row row-cols-1 row-cols-sm-3">
        <div className="col">
          <input
            type="text"
            placeholder="Cari Riwayat Pengajuan"
            id="search-control"
            className="form-control"
            onChange={(e) => setPencarian(e.target.value)}
          />
        </div>
      </div> */}
      {/* {loading && <Spinner />} */}
      {/* <table className="table table-striped table-hover align-middle">
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
                <td>{data.kode_request}</td>
                <td>{data.nama_pemohon}</td>
                <td>
                  {dayjs(data.tanggal_request).format("DD MMM YYYY HH:mm:ss")}
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
      </table> */}
      <RiwayatTable
        title="Menunggu Persetujuan"
        data={menunggu}
        loading={loading}
      />
      <RiwayatTable title="Disetujui" data={disetujui} loading={loading} />
      <RiwayatTable title="Selesai" data={selesai} loading={loading} />
      <RiwayatTable title="Ditolak" data={ditolak} loading={loading} />
    </div>
  );
}

export default RiwayatPengajuan;
