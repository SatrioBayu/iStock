import React, { useState, useEffect } from "react";
import RiwayatTable from "../components/RiwayatTable/RiwayatTable";
import { API_BASE_URL } from "../config";
import Spinner from "../components/Spinners/Spinner";

function RiwayatPengajuan() {
  const [riwayat, setRiwayat] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDataRiwayat() {
      try {
        const response = await fetch(`${API_BASE_URL}/request`);
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch data");
        }
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
      {loading ? (
        <Spinner />
      ) : (
        <>
          {/* To be implement */}
          <button className="btn btn-primary" disabled>
            Export Pengajuan
          </button>
          {/* To be implement */}
          <RiwayatTable
            title="Menunggu Persetujuan"
            data={menunggu}
            loading={loading}
          />
          <RiwayatTable title="Disetujui" data={disetujui} loading={loading} />
          <RiwayatTable title="Selesai" data={selesai} loading={loading} />
          <RiwayatTable title="Ditolak" data={ditolak} loading={loading} />
        </>
      )}
    </div>
  );
}

export default RiwayatPengajuan;
