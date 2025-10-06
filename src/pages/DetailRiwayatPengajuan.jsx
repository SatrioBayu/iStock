import { useContext, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { AuthContext } from "../store/auth-context";
import Swal from "sweetalert2";
import { API_BASE_URL } from "../config";
import BackButton from "../components/BackButton/BackButton";

function DetailRiwayatPengajuan() {
  const loaderData = useLoaderData();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = async (endpoint, successText) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${API_BASE_URL}/request/${loaderData.kode_request}/${endpoint}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
        }
      );
      const res = await response.json();
      if (!response.ok) {
        throw new Error(res.errors[0].message || "Failed to approve request");
      }
      Swal.fire({
        icon: "success",
        title: "Success",
        text: successText,
        allowOutsideClick: false,
        didClose: () => {
          navigate("/riwayat-pengajuan");
        },
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Failed to finish request",
        allowOutsideClick: false,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStatus = () => {
    const { status_request, tanggal_disetujui, tanggal_selesai } = loaderData;

    const format = (date) => dayjs(date).format("DD MMM YYYY HH:mm:ss");

    switch (status_request) {
      case "Selesai":
        return (
          <>
            <td className="fw-bold text-success">
              Disetujui {format(tanggal_disetujui)}
            </td>
            <td className="fw-bold text-success">
              Ditindaklanjut {format(tanggal_selesai)}
            </td>
          </>
        );
      case "Disetujui":
        return (
          <>
            <td className="fw-bold text-success">
              Disetujui {format(tanggal_disetujui)}
            </td>
            <td>Menunggu Tindak Lanjut...</td>
          </>
        );
      case "Menunggu Persetujuan":
        return (
          <>
            <td>Menunggu...</td>
            <td>Menunggu...</td>
          </>
        );
      case "Ditolak":
        return (
          <>
            <td className="text-danger fw-bold">Ditolak</td>
            <td className="text-danger fw-bold">Ditolak</td>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container-fluid">
      <BackButton className="mb-4" />
      <h2>Detail Pengajuan {loaderData.kode_request}</h2>
      <div className="row row-cols-8">
        <div className="col-12 col-sm-10 mb-3">
          <label htmlFor="exampleFormControlInput2" className="form-label">
            Nama Pemohon
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput2"
            value={loaderData.nama_pemohon}
            disabled
          />
        </div>
      </div>
      <div className="row row-cols-8">
        <div className="col-12 col-sm-10 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            Nama Bagian
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput3"
            value={loaderData.nama_bagian}
            disabled
          />
        </div>
      </div>
      <div className="row"></div>
      {loaderData.Request_Details.map((detail) => (
        <div key={detail.id} className="row">
          <div className="col-sm-8 col-md-9 mb-3">
            <label htmlFor="exampleFormControlInput2" className="form-label">
              Nama Barang
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput2"
              value={detail.Barang.nama_barang}
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
              value={detail.jumlah}
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
          <tr>{renderStatus()}</tr>
          <tr>
            <td>Andi Nur Hasbi Alauddin, S.E,. M.H.</td>
            <td>Muhammad Andy Alfariz, A.Md.Ak.</td>
          </tr>
        </tbody>
      </table>
      <div className="mt-3">
        {user?.role === "Kasubbag TURT" &&
          loaderData.status_request === "Menunggu Persetujuan" && (
            <>
              {isLoading ? (
                <>
                  <button
                    onClick={() =>
                      handleAction("approve", "Request approved successfully")
                    }
                    className="btn btn-success me-2"
                    disabled
                  >
                    Setujui
                  </button>
                  <button
                    onClick={() =>
                      handleAction("reject", "Request rejected successfully")
                    }
                    className="btn btn-danger me-2"
                    disabled
                  >
                    Tolak
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() =>
                      handleAction("approve", "Request approved successfully")
                    }
                    className="btn btn-success me-2"
                  >
                    Setujui
                  </button>
                  <button
                    onClick={() =>
                      handleAction("reject", "Request rejected successfully")
                    }
                    className="btn btn-danger me-2"
                  >
                    Tolak
                  </button>
                </>
              )}
            </>
          )}

        {user?.role === "Pengelola BMN" &&
          loaderData.status_request === "Disetujui" && (
            <>
              {isLoading ? (
                <button
                  onClick={() =>
                    handleAction("finish", "Request finished successfully")
                  }
                  className="btn btn-primary me-2"
                  disabled
                >
                  <span className="spinner-border spinner-border-sm"></span>
                  Loading...
                </button>
              ) : (
                <button
                  onClick={() =>
                    handleAction("finish", "Request finished successfully")
                  }
                  className="btn btn-primary me-2"
                >
                  Selesaikan
                </button>
              )}
            </>
          )}

        {loaderData.status_request === "Selesai" && (
          <a
            href={`${API_BASE_URL}/request/${loaderData.kode_request}/download`}
            target="_blank"
            rel="noreferrer"
            className="btn btn-success"
          >
            Download
          </a>
        )}
      </div>
      {/*       
      {user &&
        user.role === "Kasubbag TURT" &&
        loaderData.status_request === "Menunggu Persetujuan" && (
          <button onClick={handleSetujui} className="btn btn-success">
            Setujui
          </button>
        )}
      {user &&
        user.role === "Pengelola BMN" &&
        loaderData.status_request === "Disetujui" && (
          <button onClick={handleSelesai} className="btn btn-primary">
            Selesaikan
          </button>
        )}
      {loaderData.status_request === "Selesai" && (
        <a
          className="navbar-brand"
          href={`http://localhost:3000/request/${loaderData.kode_request}/download`}
          target="_blank"
          rel="noreferrer"
        >
          <button className="btn btn-success">Download</button>
        </a>
      )} */}
    </div>
  );
}

export default DetailRiwayatPengajuan;

export async function loader({ req, params }) {
  const kode_request = params.kode_request;
  const response = await fetch(`${API_BASE_URL}/request/${kode_request}`);
  const data = await response.json();
  return data.data;
}
