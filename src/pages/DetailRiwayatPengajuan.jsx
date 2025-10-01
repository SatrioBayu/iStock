import React from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { DUMMY } from "./RiwayatPengajuan";

function DetailRiwayatPengajuan() {
  const params = useParams();
  const loaderData = useLoaderData();
  return (
    <div className="container-fluid">
      <h2>Detail Pengajuan {params.id}</h2>
      <div className="row row-cols-8">
        <div className="col-12 col-sm-10 mb-3">
          <label htmlFor="exampleFormControlInput2" className="form-label">
            Nama Pemohon
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput2"
            value={loaderData.namaPemohon}
            disabled
          />
        </div>
      </div>
      {loaderData.barang.map((barang) => (
        <div key={barang.id} className="row">
          <div className="col-sm-8 col-md-9 mb-3">
            <label htmlFor="exampleFormControlInput2" className="form-label">
              Nama Barang
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput2"
              value={barang.nama}
              disabled
            />
          </div>
          <div className="col-sm-2 col-md-1 mb-3">
            <label htmlFor="exampleFormControlInput2" className="form-label">
              Jumlah
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput2"
              value={barang.jumlah}
              disabled
            />
          </div>
        </div>
      ))}
      <table className="table table-bordered text-center">
        <thead>
          <tr>
            <th>Status Persetujuan</th>
            <th>Status Tindak Lanjut</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {loaderData.status === "Disetujui" && (
              <>
                <td className="fw-bold text-success">
                  Disetujui {loaderData.date}
                </td>
                <td>Menunggu Tindak Lanjut...</td>
              </>
            )}
            {loaderData.status === "Menunggu Persetujuan" && (
              <>
                <td>Menunggu...</td>
                <td>Menunggu...</td>
              </>
            )}
            {loaderData.status === "Ditolak" && (
              <>
                <td className="text-danger fw-bold">Ditolak</td>
                <td className="text-danger fw-bold">Ditolak</td>
              </>
            )}
          </tr>
          <tr>
            <td>Andi Nur Hasbi Alauddin, S.E,. M.H.</td>
            <td>Muhammad Andy Alfariz, A.Md.Ak.</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default DetailRiwayatPengajuan;

export function loader({ req, params }) {
  const data = DUMMY.find((item) => item.id == params.id);
  return data;
}
