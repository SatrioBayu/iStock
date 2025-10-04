import { useState, useEffect } from "react";
import Card from "../components/Card/Card";
import Spinner from "../components/Spinners/Spinner";

function Home() {
  const [listBarang, setListBarang] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3000/admin/barang");
        const data = await response.json();
        setListBarang(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <h2 className="mb-3">Daftar Barang</h2>
      {loading && <Spinner />}
      <div className="g-4 row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
        {!loading &&
          listBarang.map((item) => (
            <Card
              key={item.barcode}
              nama_barang={item.nama_barang}
              stok={item.stok}
            />
          ))}
      </div>
    </>
  );
}

export default Home;
