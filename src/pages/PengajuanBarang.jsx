import { useState } from "react";
import FormInput from "../components/FormInput";

const DUMMY = [
  { id: "1", nama: "Kertas F4", stok: 100 },
  { id: "2", nama: "Kertas A5", stok: 50 },
  { id: "3", nama: "Kertas A4", stok: 200 },
];

function makeUid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function PengajuanBarang() {
  const [barangList, setBarangList] = useState([
    {
      uid: makeUid(),
      barang: "",
      jumlah: "",
      stok: 0,
    },
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const [barangOptions, setBarangOptions] = useState(DUMMY);

  const selectedBarang = barangList
    .map((item) => String(item.barang))
    .filter((v) => v && v !== "undefined" && v !== "null");

  const handleAddBarang = () => {
    setBarangList((prev) => [
      ...prev,
      { uid: makeUid(), barang: "", jumlah: "", stok: 0 },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataNama = new FormData(e.target);
    const dataNama = Object.fromEntries(formDataNama.entries());
    const data = {
      nama: dataNama,
      barang: barangList,
    };
    console.log(data);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleChange = (uid, field, value) => {
    setBarangList((prev) => {
      const newList = prev.map((item) =>
        item.uid === uid ? { ...item, [field]: value } : item
      );

      // kalau yang diubah adalah barang -> sync stok dari barangOptions
      if (field === "barang") {
        const idx = newList.findIndex((it) => it.uid === uid);
        const barangTerpilih = barangOptions.find(
          (b) => String(b.nama) === value
        );
        if (idx !== -1) {
          newList[idx] = {
            ...newList[idx],
            stok: barangTerpilih ? barangTerpilih.stok : 0,
          };
        }
      }

      return newList;
    });
  };

  const handleRemove = (uid) => {
    setBarangList((prev) => {
      if (prev.length === 1) {
        return prev;
      }
      return prev.filter((item) => item.uid !== uid);
    });
  };

  return (
    <div>
      <h2>Pengajuan Barang</h2>
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
            name="nama"
          />
        </div>
        {barangList.map((barang) => (
          <FormInput
            key={barang.uid}
            uid={barang.uid}
            data={barang}
            onChange={handleChange}
            barangOptions={barangOptions.filter(
              (b) => !selectedBarang.includes(b.nama) || b.nama == barang.barang
            )}
            onRemove={handleRemove}
          />
        ))}

        <div className="d-grid gap-2 col-12 col-sm-2">
          <button
            type="button"
            onClick={handleAddBarang}
            className="btn btn-primary"
          >
            Tambah Barang
          </button>
          {isLoading ? (
            <button className="btn btn-success disabled">
              <span className="spinner-border spinner-border-sm"></span>Sedang
              Mengajukan...
            </button>
          ) : (
            <button className="btn btn-success">Ajukan</button>
          )}
        </div>
      </form>
    </div>
  );
}

export default PengajuanBarang;
