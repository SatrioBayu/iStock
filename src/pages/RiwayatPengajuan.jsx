import Spinner from "../components/Spinners/Spinner";
import GlassTiles from "../components/GlassTiles/GlassTiles";
import { Outlet } from "react-router-dom";

function RiwayatPengajuan() {
  // const menunggu = riwayat.filter(
  //   (item) => item.status_request === "Menunggu Persetujuan"
  // );
  // const ditolak = riwayat.filter((item) => item.status_request === "Ditolak");
  // const disetujui = riwayat.filter(
  //   (item) => item.status_request === "Disetujui"
  // );
  // const selesai = riwayat.filter((item) => item.status_request === "Selesai");

  return (
    <>
      <h2>Riwayat Pengajuan Barang</h2>
      <GlassTiles />
      <Outlet />
      {/* {loading ? (
        <Spinner />
      ) : (
        <>
          To be implement
          <button className="btn btn-primary" disabled>
            Export Pengajuan
          </button>
          To be implement
        </>
      )} */}
    </>
  );
}

export default RiwayatPengajuan;
