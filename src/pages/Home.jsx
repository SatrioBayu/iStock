import { useState, useEffect, useContext } from "react";
import Card from "../components/Card/Card";
import Spinner from "../components/Spinners/Spinner";
import { API_BASE_URL } from "../config";
import Swal from "sweetalert2";
import { AuthContext } from "../store/auth-context";
import TambahBarangModal from "../components/TambahBarangModal/TambahBarangModal";

function Home() {
  const [listBarang, setListBarang] = useState([]);
  const [loading, setLoading] = useState(true);
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

  const handleExport = () => {
    const handleDownload = async () => {
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
          text: error || "Failed to finish request",
          allowOutsideClick: false,
        });
      }
    };
    handleDownload();
  };

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
      {loading ? (
        <Spinner />
      ) : (
        <>
          {listBarang.length > 0 ? (
            <div className="g-4 row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
              {!loading &&
                listBarang.map((item) => (
                  <Card
                    key={item.barcode}
                    nama_barang={item.nama_barang}
                    stok={item.stok}
                    barcode={item.barcode}
                  />
                ))}
            </div>
          ) : (
            <div className="container text-center py-5">
              <h4 className="mt-2">Tidak ada barang untuk saat ini</h4>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Home;
