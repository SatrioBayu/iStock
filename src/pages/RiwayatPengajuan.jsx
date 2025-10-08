import { useState, useContext } from "react";
import GlassTiles from "../components/GlassTiles/GlassTiles";
import { Outlet } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../store/auth-context";
import { API_BASE_URL } from "../config";

function RiwayatPengajuan() {
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const handleDownload = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/request-detail/download`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      });

      if (!response.ok) {
        throw new Error("Download gagal");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "BARANG_KELUAR.xlsx";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      // SweetAlert untuk sukses
      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "File riwayat pengajuan berhasil diunduh.",
      });
    } catch (error) {
      console.error(error.message);
      // SweetAlert untuk error
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Terjadi kesalahan saat mengunduh file.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2>Riwayat Pengajuan Barang</h2>
      {user && (
        <button
          onClick={handleDownload}
          disabled={loading}
          className="btn btn-primary mb-3"
        >
          {loading ? "Downloading..." : "Export Barang Keluar"}
        </button>
      )}
      <GlassTiles />
      <Outlet />
    </>
  );
}

export default RiwayatPengajuan;
