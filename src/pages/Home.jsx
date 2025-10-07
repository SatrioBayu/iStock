// import { useState, useEffect, useContext } from "react";
// import Card from "../components/Card/Card";
// import Spinner from "../components/Spinners/Spinner";
// import { API_BASE_URL } from "../config";
// import Swal from "sweetalert2";
// import { AuthContext } from "../store/auth-context";
// import TambahBarangModal from "../components/TambahBarangModal/TambahBarangModal";

// function Home() {
//   const [listBarang, setListBarang] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { user } = useContext(AuthContext);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/admin/barang`);
//       const data = await response.json();
//       if (!response.ok) {
//         throw new Error("Error fetching data");
//       }
//       setListBarang(data.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleExport = () => {
//     const handleDownload = async () => {
//       try {
//         const response = await fetch(`${API_BASE_URL}/admin/barang/transaksi`, {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
//           },
//         });
//         if (!response.ok) {
//           throw new Error(response.statusText);
//         }
//         const blob = await response.blob();
//         const url = window.URL.createObjectURL(blob);
//         const a = document.createElement("a");
//         a.href = url;
//         a.download = "BARANG MASUK.xlsx";
//         document.body.appendChild(a);
//         a.click();
//         a.remove();
//         Swal.fire({
//           icon: "success",
//           title: "Success",
//           text: "File berhasil diunduh",
//           allowOutsideClick: false,
//         });
//       } catch (error) {
//         Swal.fire({
//           icon: "error",
//           title: "Error",
//           text: error || "Failed to finish request",
//           allowOutsideClick: false,
//         });
//       }
//     };
//     handleDownload();
//   };

//   return (
//     <>
//       <div className="row align-items-center gap-2 mb-4">
//         <div className="col-md">
//           <h2 className="mb-0">Daftar Barang</h2>
//         </div>
//         {!loading && user && (
//           <div className="col-md-auto d-flex gap-2">
//             <button onClick={handleExport} className="btn btn-primary">
//               Export Barang Masuk
//             </button>
//             <TambahBarangModal onSuccess={fetchData} />
//           </div>
//         )}
//       </div>
//       {loading ? (
//         <Spinner />
//       ) : (
//         <>
//           {listBarang.length > 0 ? (
//             <div className="g-4 row row-cols-1 row-cols-lg-6">
//               {!loading &&
//                 listBarang.map((item) => (
//                   <Card
//                     key={item.barcode}
//                     nama_barang={item.nama_barang}
//                     stok={item.stok}
//                     barcode={item.barcode}
//                     foto={item.foto}
//                   />
//                 ))}
//             </div>
//           ) : (
//             <div className="container text-center py-5">
//               <h4 className="mt-2">Tidak ada barang untuk saat ini</h4>
//             </div>
//           )}
//         </>
//       )}
//     </>
//   );
// }

// export default Home;

import { useState, useEffect, useContext } from "react";
import Card from "../components/Card/Card";
import Spinner from "../components/Spinners/Spinner";
import { API_BASE_URL } from "../config";
import Swal from "sweetalert2";
import { AuthContext } from "../store/auth-context";
import TambahBarangModal from "../components/TambahBarangModal/TambahBarangModal";
import DataTable from "react-data-table-component";

const customStyles = {
  rows: {
    style: {
      fontSize: "1rem", // default sekitar 0.875rem
    },
  },
  headCells: {
    style: {
      fontSize: "1rem",
      fontWeight: "600",
      backgroundColor: "#f8f9fa", // opsional, biar kayak tabel Bootstrap
    },
  },
  cells: {
    style: {
      fontSize: "0.95rem",
    },
  },
};

function Home() {
  const [listBarang, setListBarang] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isGridView, setIsGridView] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/barang`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Error fetching data");
      }
      setListBarang(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/barang/transaksi`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "BARANG MASUK.xlsx";
      document.body.appendChild(a);
      a.click();
      a.remove();
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "File berhasil diunduh",
        allowOutsideClick: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Failed to finish request",
        allowOutsideClick: false,
      });
    }
  };

  // Kolom untuk DataTable
  const columns = [
    {
      name: "Barcode",
      selector: (row) => row.barcode,
      sortable: true,
    },
    {
      name: "Nama Barang",
      selector: (row) => row.nama_barang,
      sortable: true,
    },
    {
      name: "Stok",
      selector: (row) => row.stok,
      sortable: true,
      cell: (row) => (
        <span
          className={`badge ${
            row.stok === 0
              ? "bg-danger"
              : row.stok <= 10
              ? "bg-warning text-dark"
              : "bg-success"
          }`}
        >
          {row.stok}
        </span>
      ),
    },
  ];

  return (
    <>
      <div className="row align-items-center gap-2 mb-4">
        <div className="col-md">
          <h2 className="mb-0">Daftar Barang</h2>
        </div>

        {!loading && user && (
          <div className="col-md-auto d-flex gap-2">
            <button onClick={handleExport} className="btn btn-primary">
              Export Barang Masuk
            </button>
            <TambahBarangModal onSuccess={fetchData} />
          </div>
        )}
      </div>

      {/* Tombol Toggle View */}
      <div className="mb-3">
        <button
          onClick={() => setIsGridView(!isGridView)}
          className="btn btn-outline-secondary"
        >
          {isGridView ? "Tampilkan Tabel" : "Tampilkan Grid"}
        </button>
      </div>

      {loading ? (
        <Spinner />
      ) : listBarang.length > 0 ? (
        isGridView ? (
          <div className="g-4 row row-cols-1 row-cols-lg-6">
            {listBarang.map((item) => (
              <Card
                key={item.barcode}
                nama_barang={item.nama_barang}
                stok={item.stok}
                barcode={item.barcode}
                foto={item.foto}
              />
            ))}
          </div>
        ) : (
          <div className="card shadow-sm p-3">
            <DataTable
              columns={columns}
              data={listBarang}
              pagination
              highlightOnHover
              striped
              responsive
              dense
              customStyles={customStyles}
            />
          </div>
        )
      ) : (
        <div className="container text-center py-5">
          <h4 className="mt-2">Tidak ada barang untuk saat ini</h4>
        </div>
      )}
    </>
  );
}

export default Home;
