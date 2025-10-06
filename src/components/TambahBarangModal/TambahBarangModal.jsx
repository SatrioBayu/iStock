// import { useState } from "react";
// import { API_BASE_URL } from "../../config";
// import Swal from "sweetalert2";

// function TambahBarangModal({ onSuccess }) {
//   const [show, setShow] = useState(false);
//   const [form, setForm] = useState({
//     nama_barang: "",
//     stok: "",
//     barcode: "",
//     satuan: "",
//   });
//   const [loading, setLoading] = useState(false);

//   const handleShow = () => setShow(true);
//   const handleClose = () => {
//     setShow(false);
//     setForm({ nama_barang: "", stok: "", barcode: "", satuan: "" });
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const response = await fetch(`${API_BASE_URL}/admin/barang`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
//         },
//         body: JSON.stringify(form),
//       });

//       const result = await response.json();
//       if (!response.ok)
//         throw new Error(result.errors[0].message || "Failed to add item");

//       // panggil callback biar parent update data
//       onSuccess();
//       handleClose();
//       Swal.fire({
//         icon: "success",
//         title: "Success",
//         text: "Item added successfully",
//         allowOutsideClick: false,
//       });
//     } catch (error) {
//       console.error("Error:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: error || "Failed to add item",
//         allowOutsideClick: false,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       {/* Tombol buka modal */}
//       <button className="btn btn-success" onClick={handleShow}>
//         + Tambah Barang
//       </button>

//       {/* Modal */}
//       {show && (
//         <div
//           className="modal fade show"
//           style={{
//             display: "block",
//             backgroundColor: "rgba(0,0,0,0.5)",
//           }}
//         >
//           <div className="modal-dialog modal-dialog-centered">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Tambah Barang</h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   onClick={handleClose}
//                 ></button>
//               </div>

//               <form onSubmit={handleSubmit}>
//                 <div className="modal-body">
//                   <div className="mb-3">
//                     <label className="form-label">Barcode</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       name="barcode"
//                       value={form.barcode}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <label className="form-label">Nama Barang</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       name="nama_barang"
//                       value={form.nama_barang}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <label className="form-label">Stok</label>
//                     <input
//                       type="number"
//                       className="form-control"
//                       name="stok"
//                       value={form.stok}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <label className="form-label">Satuan</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       name="satuan"
//                       value={form.satuan}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="modal-footer">
//                   <button
//                     type="button"
//                     className="btn btn-secondary"
//                     onClick={handleClose}
//                   >
//                     Batal
//                   </button>
//                   <button
//                     type="submit"
//                     className="btn btn-primary"
//                     disabled={loading}
//                   >
//                     {loading ? "Menyimpan..." : "Simpan"}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default TambahBarangModal;

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
    foto: null, // Tambahkan state untuk file gambar
  });
  const [loading, setLoading] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setForm({
      nama_barang: "",
      stok: "",
      barcode: "",
      satuan: "",
      foto: null,
    });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "foto") {
      setForm({ ...form, foto: files[0] }); // Simpan file
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Gunakan FormData
      const formData = new FormData();
      formData.append("nama_barang", form.nama_barang);
      formData.append("stok", form.stok);
      formData.append("barcode", form.barcode);
      formData.append("satuan", form.satuan);
      if (form.foto) {
        formData.append("foto", form.foto); // Kirim gambar
      }

      const response = await fetch(`${API_BASE_URL}/admin/barang`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          // Jangan set Content-Type, browser akan set otomatis untuk multipart/form-data
        },
        body: formData,
      });

      const result = await response.json();
      if (!response.ok)
        throw new Error(result.message || "Gagal menambahkan barang");

      onSuccess();
      handleClose();
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Barang berhasil ditambahkan",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: error.message || "Gagal menambahkan barang",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button className="btn btn-success" onClick={handleShow}>
        + Tambah Barang
      </button>

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
                  <div className="mb-3">
                    <label className="form-label">Foto (opsional)</label>
                    <input
                      type="file"
                      className="form-control"
                      name="foto"
                      accept="image/*"
                      onChange={handleChange}
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
