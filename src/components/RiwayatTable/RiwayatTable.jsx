import { useState } from "react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { API_BASE_URL } from "../../config";

function RiwayatTable({ title, data, loading, label }) {
  const [pencarian, setPencarian] = useState("");
  const [downloading, setDownloading] = useState(false);

  console.log(label);

  const filteredData = !loading
    ? data.filter((item) => {
        const query = pencarian.toLowerCase();
        return (
          item.kode_request.toLowerCase().includes(query) ||
          item.nama_pemohon.toLowerCase().includes(query) ||
          dayjs(item.tanggal_request)
            .format("DD MMMM YYYY HH:mm")
            .toLowerCase()
            .includes(query) ||
          item.status_request.toLowerCase().includes(query)
        );
      })
    : [];

  const handleDownloadAll = async () => {
    try {
      setDownloading(true);
      const response = await fetch(`${API_BASE_URL}/request/download`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Gagal mendownload file");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "All_Requests.zip"; // nama file ZIP
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Semua request berhasil diunduh",
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Terjadi kesalahan saat mendownload semua request",
      });
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="border rounded p-3 my-3 table-responsive">
      <h5>Riwayat Pengajuan Barang yang {title}</h5>
      {label === "Selesai" && (
        <button
          className="btn btn-primary"
          onClick={handleDownloadAll}
          disabled={downloading}
        >
          {downloading ? "Downloading..." : "Download"}
        </button>
      )}
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
      {loading ? (
        // ✅ Spinner loading tengah halaman
        <div className="d-flex justify-content-center align-items-center py-5">
          <div className="spinner-border text-primary me-2" role="status" />
          <span className="text-muted">Memuat data riwayat...</span>
        </div>
      ) : (
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
                    {dayjs(data.tanggal_request).format(
                      "DD MMMM YYYY HH:mm:ss"
                    )}
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
                            : "btn-secondary"
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
                <td colSpan="4" className="text-center py-4">
                  <h6 className="text-muted mb-0">
                    Data pengajuan tidak ditemukan
                  </h6>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default RiwayatTable;
