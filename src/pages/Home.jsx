// // import { useState, useEffect, useContext } from "react";
// // import Card from "../components/Card/Card";
// // import Spinner from "../components/Spinners/Spinner";
// // import { API_BASE_URL } from "../config";
// // import Swal from "sweetalert2";
// // import { AuthContext } from "../store/auth-context";
// // import TambahBarangModal from "../components/TambahBarangModal/TambahBarangModal";
// // import DataTable from "react-data-table-component";
// // import styles from "./Home.module.css";

// // const customStyles = {
// //   rows: { style: { fontSize: "1rem" } },
// //   headCells: {
// //     style: {
// //       fontSize: "1rem",
// //       fontWeight: "600",
// //       backgroundColor: "#f8f9fa",
// //     },
// //   },
// //   cells: { style: { fontSize: "0.95rem" } },
// // };

// // function Home() {
// //   const [listBarang, setListBarang] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [isGridView, setIsGridView] = useState(true);
// //   const { user } = useContext(AuthContext);

// //   useEffect(() => {
// //     fetchData();
// //   }, []);

// //   const fetchData = async () => {
// //     try {
// //       const response = await fetch(`${API_BASE_URL}/admin/barang`);
// //       const data = await response.json();
// //       if (!response.ok) throw new Error("Error fetching data");
// //       setListBarang(data.data);
// //     } catch (error) {
// //       console.error("Error fetching data:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleExport = async () => {
// //     try {
// //       const response = await fetch(`${API_BASE_URL}/admin/barang/transaksi`, {
// //         method: "GET",
// //         headers: {
// //           Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
// //         },
// //       });
// //       if (!response.ok) throw new Error(response.statusText);

// //       const blob = await response.blob();
// //       const url = window.URL.createObjectURL(blob);
// //       const a = document.createElement("a");
// //       a.href = url;
// //       a.download = "BARANG MASUK.xlsx";
// //       document.body.appendChild(a);
// //       a.click();
// //       a.remove();

// //       Swal.fire({
// //         icon: "success",
// //         title: "Success",
// //         text: "File berhasil diunduh",
// //         allowOutsideClick: false,
// //       });
// //     } catch (error) {
// //       Swal.fire({
// //         icon: "error",
// //         title: "Error",
// //         text: error.message || "Failed to finish request",
// //         allowOutsideClick: false,
// //       });
// //     }
// //   };

// //   const columns = [
// //     {
// //       name: "Barcode",
// //       selector: (row) => row.barcode,
// //       sortable: true,
// //     },
// //     {
// //       name: "Nama Barang",
// //       selector: (row) => row.nama_barang,
// //       sortable: true,
// //     },
// //     {
// //       name: "Stok",
// //       selector: (row) => row.stok,
// //       sortable: true,
// //       cell: (row) => (
// //         <span
// //           className={`badge ${
// //             row.stok === 0
// //               ? "bg-danger"
// //               : row.stok <= 10
// //               ? "bg-warning text-dark"
// //               : "bg-success"
// //           }`}
// //         >
// //           {row.stok}
// //         </span>
// //       ),
// //     },
// //   ];

// //   return (
// //     <div className={styles.dashboardContainer}>
// //       <div className={styles.headerRow}>
// //         <h2 className="mb-0 fw-semibold">📦 Daftar Barang</h2>
// //         {!loading && user && (
// //           <div className="d-flex gap-2">
// //             <button
// //               onClick={handleExport}
// //               className="btn btn-primary shadow-sm"
// //             >
// //               Export Barang Masuk
// //             </button>
// //             <TambahBarangModal onSuccess={fetchData} />
// //           </div>
// //         )}
// //       </div>

// //       <div className="mt-3 mb-4 d-flex justify-content-between align-items-center">
// //         <p className="text-secondary mb-0">
// //           Total Barang: <strong>{listBarang.length}</strong>
// //         </p>
// //         <button
// //           onClick={() => setIsGridView(!isGridView)}
// //           className="btn btn-outline-secondary"
// //         >
// //           {isGridView ? "Tampilkan Tabel" : "Tampilkan Grid"}
// //         </button>
// //       </div>

// //       {loading ? (
// //         <Spinner />
// //       ) : listBarang.length > 0 ? (
// //         isGridView ? (
// //           <div className="row g-4">
// //             {listBarang.map((item) => (
// //               <div
// //                 key={item.barcode}
// //                 className="col-12 col-md-4 col-lg-2 d-flex align-items-stretch"
// //               >
// //                 <Card
// //                   nama_barang={item.nama_barang}
// //                   stok={item.stok}
// //                   barcode={item.barcode}
// //                   foto={item.foto}
// //                 />
// //               </div>
// //             ))}
// //           </div>
// //         ) : (
// //           <div className="card shadow-sm p-3 border-0">
// //             <DataTable
// //               columns={columns}
// //               data={listBarang}
// //               pagination
// //               highlightOnHover
// //               striped
// //               responsive
// //               dense
// //               customStyles={customStyles}
// //             />
// //           </div>
// //         )
// //       ) : (
// //         <div className="text-center py-5">
// //           <img
// //             src="https://illustrations.popsy.co/white/box.svg"
// //             alt="No Data"
// //             style={{ width: "180px", opacity: 0.8 }}
// //           />
// //           <h5 className="mt-3">Belum ada barang yang tersedia</h5>
// //           <p className="text-secondary">Tambahkan barang baru untuk memulai</p>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default Home;

// import { useState, useEffect, useContext } from "react";
// import Card from "../components/Card/Card";
// import Spinner from "../components/Spinners/Spinner";
// import { API_BASE_URL } from "../config";
// import Swal from "sweetalert2";
// import { AuthContext } from "../store/auth-context";
// import TambahBarangModal from "../components/TambahBarangModal/TambahBarangModal";
// import DataTable from "react-data-table-component";
// import styles from "./Home.module.css";

// const customStyles = {
//   rows: { style: { fontSize: "1rem" } },
//   headCells: {
//     style: {
//       fontSize: "1rem",
//       fontWeight: "600",
//       backgroundColor: "#f8f9fa",
//     },
//   },
//   cells: { style: { fontSize: "0.95rem" } },
// };

// function Home() {
//   const [listBarang, setListBarang] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isGridView, setIsGridView] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 12;

//   const { user } = useContext(AuthContext);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/admin/barang`);
//       const data = await response.json();
//       if (!response.ok) throw new Error("Error fetching data");
//       setListBarang(data.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleExport = async () => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/admin/barang/transaksi`, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
//         },
//       });
//       if (!response.ok) throw new Error(response.statusText);

//       const blob = await response.blob();
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = "BARANG MASUK.xlsx";
//       document.body.appendChild(a);
//       a.click();
//       a.remove();

//       Swal.fire({
//         icon: "success",
//         title: "Success",
//         text: "File berhasil diunduh",
//         allowOutsideClick: false,
//       });
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: error.message || "Failed to finish request",
//         allowOutsideClick: false,
//       });
//     }
//   };

//   const columns = [
//     {
//       name: "Barcode",
//       selector: (row) => row.barcode,
//       sortable: true,
//     },
//     {
//       name: "Nama Barang",
//       selector: (row) => row.nama_barang,
//       sortable: true,
//     },
//     {
//       name: "Stok",
//       selector: (row) => row.stok,
//       sortable: true,
//       cell: (row) => (
//         <span
//           className={`badge ${
//             row.stok === 0
//               ? "bg-danger"
//               : row.stok <= 10
//               ? "bg-warning text-dark"
//               : "bg-success"
//           }`}
//         >
//           {row.stok}
//         </span>
//       ),
//     },
//   ];

//   // Pagination logic
//   const totalPages = Math.ceil(listBarang.length / itemsPerPage);
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = listBarang.slice(indexOfFirstItem, indexOfLastItem);

//   const handleNextPage = () => {
//     if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
//   };

//   const handlePrevPage = () => {
//     if (currentPage > 1) setCurrentPage((prev) => prev - 1);
//   };

//   return (
//     <div className={styles.dashboardContainer}>
//       <div className={styles.headerRow}>
//         <h2 className="mb-0 fw-semibold">📦 Daftar Barang</h2>
//         {!loading && user && (
//           <div className="d-flex gap-2">
//             <button
//               onClick={handleExport}
//               className="btn btn-primary shadow-sm"
//             >
//               Export Barang Masuk
//             </button>
//             <TambahBarangModal onSuccess={fetchData} />
//           </div>
//         )}
//       </div>

//       <div className="mt-3 mb-4 d-flex justify-content-between align-items-center">
//         <p className="text-secondary mb-0">
//           Total Barang: <strong>{listBarang.length}</strong>
//         </p>
//         <button
//           onClick={() => setIsGridView(!isGridView)}
//           className="btn btn-outline-secondary"
//         >
//           {isGridView ? "Tampilkan Tabel" : "Tampilkan Grid"}
//         </button>
//       </div>

//       {loading ? (
//         <Spinner />
//       ) : listBarang.length > 0 ? (
//         isGridView ? (
//           <>
//             <div className="row g-4">
//               {currentItems.map((item) => (
//                 <div
//                   key={item.barcode}
//                   className="col-12 col-sm-6 col-md-4 col-lg-2 d-flex align-items-stretch"
//                 >
//                   <Card
//                     nama_barang={item.nama_barang}
//                     stok={item.stok}
//                     barcode={item.barcode}
//                     foto={item.foto}
//                   />
//                 </div>
//               ))}
//             </div>

//             {/* Pagination Controls */}
//             {totalPages > 1 && (
//               <div className="d-flex justify-content-center align-items-center mt-4 gap-2">
//                 <button
//                   className="btn btn-outline-secondary btn-sm"
//                   disabled={currentPage === 1}
//                   onClick={handlePrevPage}
//                 >
//                   « Prev
//                 </button>
//                 <span className="fw-semibold">
//                   {currentPage} / {totalPages}
//                 </span>
//                 <button
//                   className="btn btn-outline-secondary btn-sm"
//                   disabled={currentPage === totalPages}
//                   onClick={handleNextPage}
//                 >
//                   Next »
//                 </button>
//               </div>
//             )}
//           </>
//         ) : (
//           <div className="card shadow-sm p-3 border-0">
//             <DataTable
//               columns={columns}
//               data={listBarang}
//               pagination
//               highlightOnHover
//               striped
//               responsive
//               dense
//               customStyles={customStyles}
//             />
//           </div>
//         )
//       ) : (
//         <div className="text-center py-5">
//           <img
//             src="https://illustrations.popsy.co/white/box.svg"
//             alt="No Data"
//             style={{ width: "180px", opacity: 0.8 }}
//           />
//           <h5 className="mt-3">Belum ada barang yang tersedia</h5>
//           <p className="text-secondary">Tambahkan barang baru untuk memulai</p>
//         </div>
//       )}
//     </div>
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
import styles from "./Home.module.css";

const customStyles = {
  rows: { style: { fontSize: "1rem" } },
  headCells: {
    style: {
      fontSize: "1rem",
      fontWeight: "600",
      backgroundColor: "#f8f9fa",
    },
  },
  cells: { style: { fontSize: "0.95rem" } },
};

function Home() {
  const [listBarang, setListBarang] = useState([]);
  const [filteredBarang, setFilteredBarang] = useState([]); // 🔍 hasil filter
  const [searchTerm, setSearchTerm] = useState(""); // input search
  const [loading, setLoading] = useState(true);
  const [isGridView, setIsGridView] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // otomatis filter saat search berubah
    const filtered = listBarang.filter(
      (item) =>
        item.nama_barang.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.barcode.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBarang(filtered);
    setCurrentPage(1);
  }, [searchTerm, listBarang]);

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/barang`);
      const data = await response.json();
      if (!response.ok) throw new Error("Error fetching data");
      setListBarang(data.data);
      setFilteredBarang(data.data);
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
      if (!response.ok) throw new Error(response.statusText);

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

  const columns = [
    { name: "Barcode", selector: (row) => row.barcode, sortable: true },
    { name: "Nama Barang", selector: (row) => row.nama_barang, sortable: true },
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

  // Pagination
  const totalPages = Math.ceil(filteredBarang.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBarang.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.headerRow}>
        <h2 className="mb-0 fw-semibold">📦 Daftar Barang</h2>
        {!loading && user && (
          <div className="d-flex gap-2">
            <button
              onClick={handleExport}
              className="btn btn-primary shadow-sm"
            >
              Export Barang Masuk
            </button>
            <TambahBarangModal onSuccess={fetchData} />
          </div>
        )}
      </div>

      {/* 🔍 Input Pencarian */}
      <div className={styles.searchRow}>
        <input
          type="text"
          placeholder="Cari berdasarkan nama atau barcode..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      <div className="mt-3 mb-4 d-flex justify-content-between align-items-center">
        <p className="text-secondary mb-0">
          Total Barang: <strong>{filteredBarang.length}</strong>
        </p>
        <button
          onClick={() => setIsGridView(!isGridView)}
          className="btn btn-outline-secondary"
        >
          {isGridView ? "Tampilkan Tabel" : "Tampilkan Grid"}
        </button>
      </div>

      {loading ? (
        <Spinner />
      ) : filteredBarang.length > 0 ? (
        isGridView ? (
          <>
            <div className="row g-4">
              {currentItems.map((item) => (
                <div
                  key={item.barcode}
                  className="col-12 col-sm-6 col-md-4 col-lg-2 d-flex align-items-stretch"
                >
                  <Card
                    nama_barang={item.nama_barang}
                    stok={item.stok}
                    barcode={item.barcode}
                    foto={item.foto}
                  />
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="d-flex justify-content-center align-items-center mt-4 gap-2">
                <button
                  className="btn btn-outline-secondary btn-sm"
                  disabled={currentPage === 1}
                  onClick={handlePrevPage}
                >
                  « Prev
                </button>
                <span className="fw-semibold">
                  {currentPage} / {totalPages}
                </span>
                <button
                  className="btn btn-outline-secondary btn-sm"
                  disabled={currentPage === totalPages}
                  onClick={handleNextPage}
                >
                  Next »
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="card shadow-sm p-3 border-0">
            <DataTable
              columns={columns}
              data={filteredBarang}
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
        <div className="text-center py-5">
          <img
            src="/item_not_found.svg"
            alt="No Data"
            style={{ width: "180px", opacity: 0.8 }}
          />
          <h5 className="mt-3">Tidak ditemukan hasil</h5>
          <p className="text-secondary">Coba ubah kata kunci pencarian kamu</p>
        </div>
      )}
    </div>
  );
}

export default Home;
