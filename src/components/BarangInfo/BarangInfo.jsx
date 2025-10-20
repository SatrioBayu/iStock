// import React, { useState, useEffect } from "react";
// import Swal from "sweetalert2";
// import { API_BASE_URL } from "../../config";
// import { useParams, useNavigate } from "react-router-dom";

// const BarangInfo = ({ barang, onUpdate }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({ ...barang });
//   const [gambarFile, setGambarFile] = useState(null); // ✅ file baru yang dipilih
//   const { barcode } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     setFormData(barang);
//   }, [barang]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleFileChange = (e) => {
//     setGambarFile(e.target.files[0]); // ✅ simpan file baru ke state
//   };

//   const handleSave = async () => {
//     try {
//       // === STEP 1: Update data barang (tanpa gambar) ===
//       const res = await fetch(`${API_BASE_URL}/admin/barang/${barcode}`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
//         },
//         body: JSON.stringify(formData),
//       });

//       const updated = await res.json();
//       if (!res.ok) throw new Error(updated.message || "Gagal memperbarui data");

//       // === STEP 2: Jika ada gambar baru, upload ke backend ===
//       if (gambarFile) {
//         const formDataGambar = new FormData();
//         formDataGambar.append("gambar", gambarFile);

//         const uploadRes = await fetch(
//           `${API_BASE_URL}/admin/barang/${barcode}/upload-gambar`,
//           {
//             method: "POST",
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
//             },
//             body: formDataGambar,
//           }
//         );

//         const uploadResult = await uploadRes.json();
//         if (!uploadRes.ok)
//           throw new Error(uploadResult.message || "Gagal upload gambar");

//         updated.data.gambar = uploadResult.url; // tambahkan URL baru ke data
//       }

//       // Update UI
//       onUpdate(updated.data);
//       setIsEditing(false);
//       setGambarFile(null);
//       navigate(`/detail-barang/${updated.data.barcode}`);

//       Swal.fire({
//         icon: "success",
//         title: "Berhasil!",
//         text: "Data barang berhasil diperbarui.",
//         timer: 1500,
//         showConfirmButton: false,
//       });
//     } catch (error) {
//       console.error(error);
//       Swal.fire({
//         icon: "error",
//         title: "Gagal!",
//         text: error.message || "Terjadi kesalahan.",
//       });
//     }
//   };

//   const handleCancel = () => {
//     setFormData(barang);
//     setGambarFile(null);
//     setIsEditing(false);
//   };

//   return (
//     <div className="card mb-3 shadow-sm">
//       <div className="card-body">
//         <div className="d-flex justify-content-between align-items-center mb-3">
//           <h5 className="card-title text-primary mb-0">Informasi Barang</h5>
//           {!isEditing ? (
//             <button
//               className="btn btn-outline-primary btn-sm"
//               onClick={() => setIsEditing(true)}
//             >
//               <i className="bi bi-pencil me-1"></i> Edit
//             </button>
//           ) : (
//             <div>
//               <button
//                 className="btn btn-success btn-sm me-2"
//                 onClick={handleSave}
//               >
//                 <i className="bi bi-check-circle me-1"></i> Simpan
//               </button>
//               <button
//                 className="btn btn-secondary btn-sm"
//                 onClick={handleCancel}
//               >
//                 <i className="bi bi-x-circle me-1"></i> Batal
//               </button>
//             </div>
//           )}
//         </div>

//         <div className="row g-3 align-items-center">
//           {/* Kolom gambar */}
//           <div className="col-md-4 text-center">
//             <img
//               src={formData.foto || "/iStock.jpg"}
//               alt="Gambar Barang"
//               className="img-fluid rounded shadow-sm mb-2"
//               style={{ maxHeight: "250px", objectFit: "cover" }}
//             />
//             {isEditing && (
//               <input
//                 type="file"
//                 accept="image/*"
//                 className="form-control"
//                 onChange={handleFileChange}
//               />
//             )}
//           </div>

//           {/* Kolom data barang */}
//           <div className="col-md-8">
//             <div className="mb-2">
//               <label className="form-label">Barcode</label>
//               <input
//                 type="text"
//                 name="barcode"
//                 className="form-control"
//                 value={formData.barcode || ""}
//                 onChange={handleChange}
//                 disabled={!isEditing}
//               />
//             </div>

//             <div className="mb-2">
//               <label className="form-label">Nama Barang</label>
//               <input
//                 type="text"
//                 name="nama_barang"
//                 className="form-control"
//                 value={formData.nama_barang || ""}
//                 onChange={handleChange}
//                 disabled={!isEditing}
//               />
//             </div>

//             <div className="mb-2">
//               <label className="form-label">Jumlah Stok</label>
//               <input
//                 type="number"
//                 name="stok"
//                 className="form-control"
//                 value={formData.stok || ""}
//                 onChange={handleChange}
//                 disabled={!isEditing}
//               />
//             </div>

//             <div className="mb-2">
//               <label className="form-label">Satuan</label>
//               <input
//                 type="text"
//                 name="satuan"
//                 className="form-control"
//                 value={formData.satuan || ""}
//                 onChange={handleChange}
//                 disabled={!isEditing}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BarangInfo;

import React, { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import { API_BASE_URL } from "../../config";
import { useParams, useNavigate } from "react-router-dom";

const BarangInfo = ({ barang, onUpdate, user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...barang });
  const [gambarFile, setGambarFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { barcode } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  useEffect(() => {
    setFormData(barang);
  }, [barang]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setGambarFile(file);
    }
  };

  const handleImageClick = () => {
    if (isEditing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("barcode", formData.barcode);
      formDataToSend.append("nama_barang", formData.nama_barang);
      formDataToSend.append("stok", formData.stok);
      formDataToSend.append("satuan", formData.satuan);

      if (gambarFile) {
        formDataToSend.append("foto", gambarFile);
      }

      const res = await fetch(`${API_BASE_URL}/admin/barang/${barcode}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: formDataToSend,
      });

      const updated = await res.json();
      if (!res.ok)
        throw new Error(updated.errors[0].message || "Gagal memperbarui data");

      onUpdate(updated.data);
      setIsEditing(false);
      setGambarFile(null);
      navigate(`/dashboard/detail-barang/${updated.data.barcode}`);

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
        text: error || "Terjadi kesalahan.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData(barang);
    setGambarFile(null);
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
              disabled={!user}
            >
              <i className="bi bi-pencil me-1"></i> Edit
            </button>
          ) : (
            <div>
              <button
                className="btn btn-success btn-sm me-2"
                onClick={handleSave}
                disabled={isLoading} // ← disable saat menyimpan
              >
                {isLoading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                    ></span>
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <i className="bi bi-check-circle me-1"></i> Simpan
                  </>
                )}
              </button>

              <button
                className="btn btn-secondary btn-sm"
                onClick={handleCancel}
                disabled={isLoading} // juga disable agar gak bentrok
              >
                <i className="bi bi-x-circle me-1"></i> Batal
              </button>
            </div>
          )}
        </div>

        <div className="row align-items-center g-3">
          <div className="col-md-4 text-center">
            <div
              className="position-relative d-inline-block"
              style={{
                cursor: isEditing ? "pointer" : "default",
              }}
              onClick={handleImageClick}
            >
              <img
                src={
                  gambarFile
                    ? URL.createObjectURL(gambarFile)
                    : formData.foto || "/iStock.jpg"
                }
                alt="Gambar Barang"
                className="img-fluid rounded shadow-sm"
                style={{
                  maxHeight: "200px",
                  objectFit: "cover",
                  width: "100%",
                  transition: "0.3s",
                  filter: isEditing ? "brightness(0.9)" : "brightness(1)",
                }}
              />

              {isEditing && (
                <div
                  className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center rounded"
                  style={{
                    backgroundColor: "rgba(0,0,0,0.4)",
                    color: "white",
                    opacity: 0,
                    transition: "opacity 0.3s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "0")}
                >
                  <i className="bi bi-camera-fill fs-3 mb-1"></i>
                  <span>Ubah Gambar</span>
                </div>
              )}
            </div>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </div>

          <div className="col-md-8">
            <div className="mb-2">
              <label className="form-label">Barcode</label>
              <input
                type="text"
                name="barcode"
                className="form-control"
                value={formData.barcode || ""}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            <div className="mb-2">
              <label className="form-label">Nama Barang</label>
              <input
                type="text"
                name="nama_barang"
                className="form-control"
                value={formData.nama_barang || ""}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            <div className="mb-2">
              <label className="form-label">Jumlah Stok</label>
              <input
                type="number"
                name="stok"
                className="form-control"
                value={formData.stok || ""}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            <div className="mb-2">
              <label className="form-label">Satuan</label>
              <input
                type="text"
                name="satuan"
                className="form-control"
                value={formData.satuan || ""}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarangInfo;
