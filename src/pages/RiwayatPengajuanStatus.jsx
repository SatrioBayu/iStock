import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../config";
import RiwayatTable from "../components/RiwayatTable/RiwayatTable";

function RiwayatPengajuanStatus() {
  const { status } = useParams(); // ambil dari URL misal: /riwayat-pengajuan/disetujui
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
        setRiwayat(data.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDataRiwayat();
  }, [status]);

  // Map dari URL status ke label & nilai yang sesuai di database
  const STATUS_MAP = {
    disetujui: "Disetujui",
    ditolak: "Ditolak",
    menunggu: "Menunggu Persetujuan",
    selesai: "Selesai",
  };

  const label = STATUS_MAP[status] || "Tidak Dikenal";
  const filtered = riwayat.filter(
    (item) => item.status_request?.toLowerCase() === label.toLowerCase()
  );

  return <RiwayatTable title={label} data={filtered} loading={loading} />;
}

export default RiwayatPengajuanStatus;
