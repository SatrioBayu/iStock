// import { useEffect, useState } from "react";
// import FormInput from "../components/FormInput";

// function makeUid() {
//   return Date.now().toString(36) + Math.random().toString(36).slice(2);
// }

// function PengajuanBarang() {
//   // State form yang akan dikirim ke backend
//   const [barangList, setBarangList] = useState([
//     {
//       uid: makeUid(),
//       barang: "",
//       jumlah: "",
//       stok: 0,
//     },
//   ]);
//   // Untuk memberi kondisi loading pada tombol submit
//   // misal menunggu response dari backend
//   // atau menunggu validasi form
//   const [submitLoading, setSubmitLoading] = useState(false);

//   // Data barang dari database
//   const [barangOptions, setBarangOptions] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     const fetchBarangOptions = async () => {
//       setIsLoading(true);
//       try {
//         const res = await fetch("http://localhost:3000/admin/barang");
//         const result = await res.json();
//         console.log(result.data);
//         setBarangOptions(result.data);
//       } catch (error) {
//         console.error("Error fetching barang options:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchBarangOptions();
//   }, []);

//   const selectedBarang = barangList
//     .map((item) => String(item.barang))
//     .filter((v) => v && v !== "undefined" && v !== "null");

//   const handleAddBarang = () => {
//     setBarangList((prev) => [
//       ...prev,
//       { uid: makeUid(), barang: "", jumlah: "", stok: 0 },
//     ]);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formDataNama = new FormData(e.target);
//     const dataNama = Object.fromEntries(formDataNama.entries());
//     const data = {
//       nama: dataNama,
//       barang: barangList,
//     };
//     console.log(data);
//     setIsLoading(true);
//     setTimeout(() => {
//       setIsLoading(false);
//     }, 1000);
//   };

//   const handleChange = (uid, field, value) => {
//     setBarangList((prev) => {
//       const newList = prev.map((item) =>
//         item.uid === uid ? { ...item, [field]: value } : item
//       );

//       // kalau yang diubah adalah barang -> sync stok dari barangOptions
//       if (field === "barang") {
//         const idx = newList.findIndex((it) => it.uid === uid);
//         const barangTerpilih = barangOptions.find(
//           (b) => String(b.nama_barang) === value
//         );
//         if (idx !== -1) {
//           newList[idx] = {
//             ...newList[idx],
//             stok: barangTerpilih ? barangTerpilih.stok : 0,
//           };
//         }
//       }

//       return newList;
//     });
//   };

//   const handleRemove = (uid) => {
//     setBarangList((prev) => {
//       if (prev.length === 1) {
//         return prev;
//       }
//       return prev.filter((item) => item.uid !== uid);
//     });
//   };

//   return (
//     <div>
//       <h2>Pengajuan Barang</h2>
//       <form onSubmit={handleSubmit}>
// <div className="mb-3">
//   <label htmlFor="exampleFormControlInput1" className="form-label">
//     Nama Pemohon
//   </label>
//   <input
//     type="text"
//     className="form-control"
//     id="exampleFormControlInput1"
//     required
//     name="nama"
//   />
// </div>
//         {barangList.map((barang) => (
//           <FormInput
//             key={barang.uid}
//             uid={barang.uid}
//             data={barang}
//             onChange={handleChange}
//             barangOptions={barangOptions.filter(
//               (b) => !selectedBarang.includes(b.nama) || b.nama == barang.barang
//             )}
//             onRemove={handleRemove}
//           />
//         ))}

//         <div className="d-grid gap-2 col-12 col-sm-2">
//           <button
//             type="button"
//             onClick={handleAddBarang}
//             className="btn btn-primary"
//           >
//             Tambah Barang
//           </button>
//           {isLoading ? (
//             <button className="btn btn-success disabled">
//               <span className="spinner-border spinner-border-sm"></span>Sedang
//               Mengajukan...
//             </button>
//           ) : (
//             <button className="btn btn-success">Ajukan</button>
//           )}
//         </div>
//       </form>
//     </div>
//   );
// }

// export default PengajuanBarang;

import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { API_BASE_URL } from "../config";
import Spinner from "../components/Spinners/Spinner";

function FormPengajuanBarang() {
  const [barangOptions, setBarangOptions] = useState([]);
  const [barangList, setBarangList] = useState([
    { id: Date.now(), selected: null, jumlah: 1 },
  ]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const navigate = useNavigate();

  // Ambil data barang dari API
  useEffect(() => {
    const fetchBarang = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/admin/barang/for-request`);

        if (!res.ok) {
          throw new Error("Failed to fetch barang");
        }

        const result = await res.json();
        const options = result.data.map((item) => ({
          value: item.barcode,
          label: `${item.nama_barang}`,
          stok: item.stok,
          satuan: item.satuan,
        }));
        setBarangOptions(options);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching barang:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBarang();
  }, []);

  // Filter agar barang yang sudah dipilih tidak muncul di select lain
  const getAvailableOptions = (currentId) => {
    const selectedValues = barangList
      .filter((b) => b.selected && b.id !== currentId)
      .map((b) => b.selected.value);

    return barangOptions.filter((opt) => !selectedValues.includes(opt.value));
  };

  const handleSelectChange = (id, selectedOption) => {
    setBarangList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, selected: selectedOption } : item
      )
    );
  };

  const handleJumlahChange = (id, jumlah) => {
    setBarangList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, jumlah } : item))
    );
  };

  const handleAddRow = () => {
    setBarangList((prev) => [
      ...prev,
      { id: Date.now(), selected: null, jumlah: 1 },
    ]);
  };

  const handleRemoveRow = (id) => {
    if (barangList.length === 1) return; // minimal 1 baris
    setBarangList((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = barangList.map((item) => ({
      barcode: item.selected?.value,
      nama_barang: item.selected?.label,
      jumlah: parseInt(item.jumlah),
    }));

    // fetch ke backend di sini
    const formDataNama = new FormData(e.target);
    const dataNama = Object.fromEntries(formDataNama.entries());
    const data = {
      nama_pemohon: dataNama.nama_pemohon,
      barang: payload,
    };

    try {
      setSubmitLoading(true);
      const response = await fetch(`${API_BASE_URL}/request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit pengajuan");
      }
      Swal.fire({
        icon: "success",
        title: "Pengajuan berhasil dikirim!",
        text: "Anda akan diarahkan ke halaman Riwayat Pengajuan.",
        timer: 3000,
        showConfirmButton: false,
        timerProgressBar: true,
        didClose: () => {
          navigate("/riwayat-pengajuan");
        },
      });
    } catch (error) {
      setError(error.message);
      console.error("Error submitting pengajuan:", error);
      Swal.fire({
        icon: "error",
        title: "Gagal Mengajukan",
        text: error.message,
        allowOutsideClick: false,
      });
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <h2>Form Pengajuan Barang</h2>
      {loading ? (
        <Spinner />
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Nama Pemohon
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              required
              name="nama_pemohon"
              placeholder="Cari dan pilih nama pemohon..."
            />
          </div>
          {barangList.map((item, index) => (
            <div
              key={item.id}
              className="row align-items-center mb-3 border-bottom pb-2"
            >
              <div className="col-md-7">
                <label className="form-label">Pilih Barang</label>
                <Select
                  options={getAvailableOptions(item.id)}
                  value={item.selected}
                  onChange={(selected) => handleSelectChange(item.id, selected)}
                  placeholder="Cari dan pilih barang..."
                  isSearchable
                  required
                />
              </div>
              <div className="col-md-2">
                <label className="form-label">Jumlah</label>
                <input
                  type="number"
                  className="form-control"
                  min="1"
                  max={item.selected ? item.selected.stok : 1}
                  value={item.jumlah}
                  onChange={(e) => handleJumlahChange(item.id, e.target.value)}
                />
              </div>
              <div className="col-md-2">
                <label className="form-label fw-semibold">Stok</label>
                <input
                  type="text"
                  className="form-control"
                  value={item.selected ? item.selected.stok : "-"}
                  disabled
                />
              </div>
              <div className="col-lg-1 d-flex gap-2 mt-4">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleRemoveRow(item.id)}
                  disabled={barangList.length === 1}
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
          {error && (
            <div class="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <button
            type="button"
            className="d-flex btn btn-success"
            onClick={handleAddRow}
          >
            + Tambah Barang
          </button>
          {submitLoading ? (
            <button className="d-flex btn btn-primary mt-3 disabled">
              <span className="spinner-border spinner-border-sm"></span>
              Loading...
            </button>
          ) : (
            <button type="submit" className="d-flex btn btn-primary mt-3">
              Submit Pengajuan
            </button>
          )}
        </form>
      )}
    </div>
  );
}

export default FormPengajuanBarang;
