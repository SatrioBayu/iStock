// import React from "react";

// const BarangInfo = ({ barang }) => (
//   <div className="row align-items-start mb-4">
//     <div className="col-md-3 mb-3">
//       <img
//         src={barang.gambar || "/iStock.jpg"}
//         alt="Gambar Barang"
//         className="img-fluid rounded shadow-sm"
//       />
//     </div>

//     <div className="col-md-9">
//       <div className="mb-2">
//         <label className="form-label">Nama Barang</label>
//         <input
//           type="text"
//           className="form-control"
//           value={barang.nama_barang}
//           readOnly
//         />
//       </div>
//       <div className="mb-2">
//         <label className="form-label">Barcode</label>
//         <input
//           type="text"
//           className="form-control"
//           value={barang.barcode}
//           readOnly
//         />
//       </div>
//       <div className="mb-2">
//         <label className="form-label">Stok</label>
//         <input
//           type="text"
//           className="form-control bg-secondary-subtle"
//           value={barang.stok}
//           readOnly
//         />
//       </div>
//       <div className="mb-2">
//         <label className="form-label">Satuan</label>
//         <input
//           type="text"
//           className="form-control"
//           value={barang.satuan}
//           readOnly
//         />
//       </div>
//     </div>
//   </div>
// );

// export default BarangInfo;

import React, { useState } from "react";
import Swal from "sweetalert2";
import { API_BASE_URL } from "../../config";

const BarangInfo = ({ barang, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(barang);

  // Handle input perubahan
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Simpan perubahan ke backend
  const handleSave = async () => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/admin/barang/${formData.barcode}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) throw new Error("Gagal memperbarui data");

      const updated = await res.json();
      onUpdate(updated);
      setIsEditing(false);

      // tampilkan notifikasi sukses
      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Data barang berhasil diperbarui.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: "Terjadi kesalahan saat menyimpan perubahan.",
      });
    }
  };

  const handleCancel = () => {
    setFormData(barang); // kembalikan ke nilai awal
    setIsEditing(false);
  };

  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="card-title text-primary mb-0">Informasi Barang</h5>
          {!isEditing ? (
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => setIsEditing(true)}
            >
              <i className="bi bi-pencil me-1"></i> Edit
            </button>
          ) : (
            <div>
              <button
                className="btn btn-success btn-sm me-2"
                onClick={handleSave}
              >
                <i className="bi bi-check-circle me-1"></i> Simpan
              </button>
              <button
                className="btn btn-secondary btn-sm"
                onClick={handleCancel}
              >
                <i className="bi bi-x-circle me-1"></i> Batal
              </button>
            </div>
          )}
        </div>

        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Barcode</label>
            <input
              type="text"
              name="kode_barang"
              className="form-control"
              defaultValue={formData.barcode}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Nama Barang</label>
            <input
              type="text"
              name="nama_barang"
              className="form-control"
              defaultValue={formData.nama_barang}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Jumlah Stok</label>
            <input
              type="number"
              name="stok"
              className="form-control"
              defaultValue={formData.stok}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Satuan</label>
            <input
              type="text"
              name="kategori"
              className="form-control"
              defaultValue={formData.satuan || ""}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarangInfo;
