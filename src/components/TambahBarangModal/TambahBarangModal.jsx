import { useState } from "react";
import { API_BASE_URL } from "../../config";
import Swal from "sweetalert2";

function TambahBarangModal({ onSuccess }) {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    nama_barang: "",
    stok: "",
    barcode: "",
    satuan: "",
  });
  const [loading, setLoading] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setForm({ nama_barang: "", stok: "", barcode: "", satuan: "" });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/admin/barang`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();
      if (!response.ok)
        throw new Error(result.errors[0].message || "Failed to add item");

      // panggil callback biar parent update data
      onSuccess();
      handleClose();
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Item added successfully",
        allowOutsideClick: false,
      });
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error || "Failed to add item",
        allowOutsideClick: false,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Tombol buka modal */}
      <button className="btn btn-success" onClick={handleShow}>
        + Tambah Barang
      </button>

      {/* Modal */}
      {show && (
        <div
          className="modal fade show"
          style={{
            display: "block",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Tambah Barang</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleClose}
                ></button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Barcode</label>
                    <input
                      type="text"
                      className="form-control"
                      name="barcode"
                      value={form.barcode}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Nama Barang</label>
                    <input
                      type="text"
                      className="form-control"
                      name="nama_barang"
                      value={form.nama_barang}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Stok</label>
                    <input
                      type="number"
                      className="form-control"
                      name="stok"
                      value={form.stok}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Satuan</label>
                    <input
                      type="text"
                      className="form-control"
                      name="satuan"
                      value={form.satuan}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleClose}
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Menyimpan..." : "Simpan"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TambahBarangModal;
