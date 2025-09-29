import React from "react";

function RiwayatPengajuan() {
  return (
    <div className="table-responsive">
      {/* <h2>Daftar Pengajuan Barang</h2> */}
      <table className="table table-striped table-hover">
        <thead>
          <tr className="table-active">
            <th>Nomor Pengajuan</th>
            <th>Tanggal Pengajuan</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>FORM/22/IX/25</td>
            <td>22 September 2025</td>
            <td>
              <button className="btn btn-warning">Menunggu Persetujuan</button>
            </td>
          </tr>
          <tr>
            <td>FORM/22/IX/25</td>
            <td>22 September 2025</td>
            <td>
              <button className="btn btn-success">Disetujui</button>
            </td>
          </tr>
          <tr>
            <td>FORM/22/IX/25</td>
            <td>22 September 2025</td>
            <td>
              <button className="btn btn-danger">Ditolak</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default RiwayatPengajuan;
