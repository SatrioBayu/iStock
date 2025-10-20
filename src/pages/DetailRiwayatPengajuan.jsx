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
  const [decisions, setDecisions] = useState({});
  const [catatanPenyetuju, setCatatanPenyetuju] = useState("");

  const formatDate = (date) =>
    date ? dayjs(date).format("DD MMM YYYY HH:mm") : "-";

  // Handle perubahan jumlah persetujuan
  const handleQuantityChange = (id, value, max) => {
    const jumlah = Math.min(Math.max(Number(value), 0), max);
    setDecisions((prev) => ({
      ...prev,
      [id]: {
        status: jumlah === 0 ? "Ditolak" : "Disetujui",
        jumlahDisetujui: jumlah,
      },
    }));
  };

  const handleSetApproveAll = (id, max) => {
    setDecisions((prev) => ({
      ...prev,
      [id]: { status: "Disetujui", jumlahDisetujui: max },
    }));
  };

  const handleSetReject = (id) => {
    setDecisions((prev) => ({
      ...prev,
      [id]: { status: "Ditolak", jumlahDisetujui: 0 },
    }));
  };

  const handleSubmitApproval = async () => {
    const allDetailIds = loaderData.Request_Details.map((d) => d.id);

    const approvedItems = Object.entries(decisions)
      .filter(
        ([id, val]) => val.status === "Disetujui" && val.jumlahDisetujui > 0
      )
      .map(([id, val]) => ({
        id: Number(id),
        jumlahDisetujui: val.jumlahDisetujui,
      }));

    const rejectedItems = Object.entries(decisions)
      .filter(
        ([id, val]) => val.status === "Ditolak" || val.jumlahDisetujui === 0
      )
      .map(([id]) => Number(id));

    const undecided = allDetailIds.filter(
      (id) =>
        !approvedItems.some((item) => item.id === id) &&
        !rejectedItems.includes(id)
    );

    if (undecided.length > 0) {
      return Swal.fire({
        icon: "warning",
        title: "Peringatan",
        text: "Semua barang harus disetujui sebagian atau ditolak sebelum dikirim.",
      });
    }

    try {
      setIsLoading(true);
      const response = await fetch(
        `${API_BASE_URL}/request/${loaderData.kode_request}/approval`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
          body: JSON.stringify({
            approvedItems,
            rejectedItems,
            catatan_penyetuju: catatanPenyetuju,
          }),
        }
      );

      const res = await response.json();
      if (!response.ok)
        throw new Error(res.message || "Gagal menyimpan perubahan");

      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Persetujuan berhasil dikirim.",
        didClose: () => navigate("/dashboard/riwayat-pengajuan"),
      });
    } catch (err) {
      Swal.fire({ icon: "error", title: "Error", text: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinish = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${API_BASE_URL}/request/${loaderData.kode_request}/finish`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
        }
      );
      const res = await response.json();
      if (!response.ok)
        throw new Error(res.message || "Gagal menyelesaikan request");

      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Request berhasil diselesaikan.",
        didClose: () => navigate("/dashboard/riwayat-pengajuan"),
      });
    } catch (err) {
      Swal.fire({ icon: "error", title: "Error", text: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <BackButton className="mb-4" />
      <h2>Detail Pengajuan {loaderData.kode_request}</h2>

      {/* Informasi Umum */}
      <div className="row">
        <div className="col-12 col-sm-6 mb-3">
          <label className="form-label">Nama Pemohon</label>
          <input
            className="form-control"
            value={loaderData.nama_pemohon}
            disabled
          />
        </div>
        <div className="col-12 col-sm-6 mb-3">
          <label className="form-label">Nama Bagian</label>
          <input
            className="form-control"
            value={loaderData.nama_bagian}
            disabled
          />
        </div>
        <div className="col-12 col-sm-6 mb-3">
          <label className="form-label">Tanggal Pengajuan</label>
          <input
            className="form-control"
            value={formatDate(loaderData.tanggal_request)}
            disabled
          />
        </div>
        <div className="col-12 col-sm-6 mb-3">
          <label className="form-label">Status Pengajuan</label>
          <input
            className={`form-control fw-bold ${
              loaderData.status_request === "Selesai"
                ? "text-success"
                : loaderData.status_request === "Ditolak"
                ? "text-danger"
                : "text-warning"
            }`}
            value={loaderData.status_request}
            disabled
          />
        </div>
      </div>

      {/* Catatan */}
      <div className="row">
        <div className="col-12 col-sm-6 mb-3">
          <label className="form-label">Catatan Pemohon</label>
          <textarea
            className="form-control"
            rows={3}
            value={loaderData.catatan_pemohon || "-"}
            disabled
          />
        </div>
        <div className="col-12 col-sm-6 mb-3">
          <label className="form-label">Catatan Penyetuju</label>
          <textarea
            className="form-control"
            rows={3}
            value={catatanPenyetuju || loaderData.catatan_penyetuju || ""}
            onChange={(e) => setCatatanPenyetuju(e.target.value)}
            disabled={
              !user ||
              user.role !== "Kasubbag TURT" ||
              loaderData.status_request !== "Menunggu Persetujuan"
            }
            placeholder={
              loaderData.catatan_penyetuju ? loaderData.catatan_penyetuju : "-"
            }
          />
        </div>
      </div>

      {/* Detail Barang */}
      <h4 className="mt-4">Daftar Barang</h4>
      {loaderData.Request_Details.map((detail) => {
        const qtyDecision = decisions[detail.id]?.jumlahDisetujui;

        let statusLabel = "Menunggu Persetujuan";
        let statusClass = "text-secondary";

        if (qtyDecision !== undefined) {
          if (qtyDecision === 0) {
            statusLabel = "Ditolak";
            statusClass = "text-danger";
          } else if (qtyDecision === detail.jumlah) {
            statusLabel = `Disetujui Semua (${detail.jumlah})`;
            statusClass = "text-success";
          } else {
            statusLabel = `Disetujui Sebagian (${qtyDecision}/${detail.jumlah})`;
            statusClass = "text-primary";
          }
        } else if (detail.status) {
          // fallback
          if (detail.status === "Disetujui") {
            statusLabel = `Disetujui (${detail.jumlah_disetujui}/${detail.jumlah})`;
            statusClass = "text-success";
          } else if (detail.status === "Ditolak") {
            statusLabel = "Ditolak";
            statusClass = "text-danger";
          } else if (detail.status === "Disetujui Sebagian") {
            statusLabel = `Disetujui Sebagian (${detail.jumlah_disetujui}/${detail.jumlah})`;
            statusClass = "text-primary";
          }
        }

        return (
          <div
            key={detail.id}
            className={`row align-items-center border rounded p-2 mb-2 ${
              detail.status === "Disetujui"
                ? "border-success"
                : detail.status === "Ditolak"
                ? "border-danger"
                : detail.status === "Disetujui Sebagian"
                ? "border-primary"
                : ""
            }`}
          >
            <div className="col-md-5">
              <strong>{detail.Barang.nama_barang}</strong>
              <div className="text-muted">
                Jumlah: {detail.jumlah} {detail.Barang.satuan}
              </div>
            </div>

            {user?.role === "Kasubbag TURT" &&
            loaderData.status_request === "Menunggu Persetujuan" ? (
              <div className="col-md-7 text-end">
                <input
                  type="number"
                  min={0}
                  max={detail.jumlah}
                  className="form-control d-inline w-auto me-2"
                  style={{ display: "inline-block" }}
                  value={qtyDecision ?? ""}
                  placeholder="0"
                  onChange={(e) =>
                    handleQuantityChange(
                      detail.id,
                      e.target.value,
                      detail.jumlah
                    )
                  }
                />
                <button
                  className={`btn me-2 ${
                    qtyDecision === detail.jumlah
                      ? "btn-success"
                      : "btn-outline-success"
                  }`}
                  onClick={() => handleSetApproveAll(detail.id, detail.jumlah)}
                >
                  ✅ Setujui Semua
                </button>
                <button
                  className={`btn ${
                    qtyDecision === 0 ? "btn-danger" : "btn-outline-danger"
                  }`}
                  onClick={() => handleSetReject(detail.id)}
                >
                  ❌ Tolak
                </button>
              </div>
            ) : (
              <div className="col-md-7 text-end">
                <span className={`fw-bold ${statusClass}`}>{statusLabel}</span>
              </div>
            )}
          </div>
        );
      })}

      {/* Tombol Aksi */}
      <div className="mt-4 d-flex gap-2">
        {user?.role === "Kasubbag TURT" &&
          loaderData.status_request === "Menunggu Persetujuan" && (
            <button
              className="btn btn-success"
              onClick={handleSubmitApproval}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm"></span>{" "}
                  Mengirim...
                </>
              ) : (
                "Kirim Persetujuan"
              )}
            </button>
          )}

        {user?.role === "Pengelola BMN" &&
          loaderData.status_request === "Dalam Proses" && (
            <button
              className="btn btn-primary"
              onClick={handleFinish}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm"></span>{" "}
                  Menyelesaikan...
                </>
              ) : (
                "Selesaikan Request"
              )}
            </button>
          )}

        {loaderData.status_request === "Selesai" && (
          <a
            href={`${API_BASE_URL}/request/${loaderData.kode_request}/download`}
            target="_blank"
            rel="noreferrer"
            className="btn btn-success"
          >
            <i className="bi bi-download me-2"></i> Download Dokumen
          </a>
        )}
      </div>
    </div>
  );
}

export default DetailRiwayatPengajuan;

export async function loader({ params }) {
  const kode_request = params.kode_request;
  const response = await fetch(`${API_BASE_URL}/request/${kode_request}`);
  const data = await response.json();
  return data.data;
}
