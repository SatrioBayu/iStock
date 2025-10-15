import React, { useEffect, useState } from "react";
import Select, { components } from "react-select";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { API_BASE_URL } from "../config";
import Spinner from "../components/Spinners/Spinner";
import { NAMA_BAGIAN_OPTIONS, NAMA_PEMOHON_OPTIONS } from "../data_helper";
import CustomSelect from "../components/CustomSelect/CustomSelect";

const defaultImg = "/iStock.png";

// 🔹 Komponen gambar opsi dropdown & value terpilih
const ImageOption = ({ src, alt, size = 30 }) => (
  <img
    src={src || defaultImg}
    alt={alt}
    onError={(e) => (e.target.src = defaultImg)}
    style={{
      width: size,
      height: size,
      borderRadius: 6,
      objectFit: "contain",
      backgroundColor: "#f8f9fa",
    }}
  />
);

const CustomOption = (props) => (
  <components.Option {...props}>
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <ImageOption src={props.data.foto} alt={props.data.label} />
      <span>{props.data.label}</span>
    </div>
  </components.Option>
);

const CustomSingleValue = (props) => (
  <components.SingleValue {...props}>
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <ImageOption src={props.data.foto} alt={props.data.label} size={24} />
      <span>{props.data.label}</span>
    </div>
  </components.SingleValue>
);

function FormPengajuanBarang() {
  const [barangOptions, setBarangOptions] = useState([]);
  const [barangList, setBarangList] = useState([
    { id: Date.now(), selected: null, jumlah: 1 },
  ]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [selectNama, setSelectNama] = useState(null);
  const [selectBagian, setSelectBagian] = useState(null);
  const navigate = useNavigate();

  // 🔹 Ambil data barang dari API
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/admin/barang/for-request`);
        if (!res.ok) throw new Error("Gagal memuat data barang");

        const result = await res.json();
        const options = result.data.map((item) => ({
          value: item.barcode,
          label: item.nama_barang,
          stok: item.stok,
          satuan: item.satuan,
          foto: item.foto,
        }));
        setBarangOptions(options);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // 🔹 Filter agar barang tidak ganda
  const getAvailableOptions = (currentId) => {
    const selectedValues = barangList
      .filter((b) => b.selected && b.id !== currentId)
      .map((b) => b.selected.value);
    return barangOptions.filter((opt) => !selectedValues.includes(opt.value));
  };

  // 🔹 Handle perubahan select & jumlah
  const handleSelectChange = (id, selectedOption) =>
    setBarangList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, selected: selectedOption } : item
      )
    );

  const handleJumlahChange = (id, jumlah) =>
    setBarangList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, jumlah: Math.max(1, jumlah) } : item
      )
    );

  // 🔹 Tambah dan hapus baris
  const handleAddRow = () =>
    setBarangList((prev) => [
      ...prev,
      { id: Date.now(), selected: null, jumlah: 1 },
    ]);

  const handleRemoveRow = (id) =>
    barangList.length > 1 &&
    setBarangList((prev) => prev.filter((item) => item.id !== id));

  // 🔹 Submit pengajuan
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = barangList
      .filter((b) => b.selected)
      .map(({ selected, jumlah }) => ({
        barcode: selected.value,
        nama_barang: selected.label,
        jumlah: parseInt(jumlah, 10),
      }));

    const formDataNama = new FormData(e.target);
    const data = {
      nama_pemohon: formDataNama.get("nama_pemohon"),
      nama_bagian: formDataNama.get("nama_bagian"),
      catatan_pemohon: formDataNama.get("catatan_pemohon"),
      barang: payload,
    };

    try {
      setSubmitLoading(true);
      const res = await fetch(`${API_BASE_URL}/request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const response = await res.json();
      if (!res.ok) throw new Error(response.message);

      setError(null);

      Swal.fire({
        icon: "success",
        title: "Pengajuan berhasil dikirim!",
        text: `Kode Request Anda ${response.data.request.kode_request}.`,
        allowOutsideClick: false,
        didClose: () => navigate("/dashboard/riwayat-pengajuan"),
      });
    } catch (err) {
      console.error(err);
      setError(err.message);
      Swal.fire({
        icon: "error",
        title: "Gagal Mengajukan",
        text: err.message,
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
          {/* Dropdown Nama Pemohon & Bagian */}
          <CustomSelect
            options={NAMA_PEMOHON_OPTIONS}
            value={selectNama}
            onChange={setSelectNama}
            placeholder="Cari dan pilih nama"
            label="Nama Pemohon"
            labelValue="nama_pemohon"
          />
          <CustomSelect
            options={NAMA_BAGIAN_OPTIONS}
            value={selectBagian}
            onChange={setSelectBagian}
            placeholder="Cari dan pilih bagian"
            label="Nama Bagian"
            labelValue="nama_bagian"
          />

          {/* Daftar Barang */}
          {barangList.map((item) => (
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
                  components={{
                    Option: CustomOption,
                    SingleValue: CustomSingleValue,
                  }}
                />
              </div>
              <div className="col-md-2">
                <label className="form-label">Jumlah</label>
                <input
                  type="number"
                  className="form-control"
                  min="1"
                  max={item.selected?.stok || 1}
                  value={item.jumlah}
                  onChange={(e) =>
                    handleJumlahChange(item.id, e.target.valueAsNumber)
                  }
                />
              </div>
              <div className="col-md-2">
                <label className="form-label fw-semibold">Stok</label>
                <input
                  type="text"
                  className="form-control"
                  value={item.selected?.stok ?? "-"}
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

          {/* Tambah Barang */}
          <button
            type="button"
            className="d-flex btn btn-success mb-3"
            onClick={handleAddRow}
          >
            + Tambah Barang
          </button>

          {/* TextArea */}
          <label className="form-label">Catatan Pemohon (Optional)</label>
          <textarea
            className="form-control mb-3"
            placeholder="Tuliskan catatan pemohon..."
            id="floatingTextarea2"
            name="catatan_pemohon"
          ></textarea>

          {/* Error */}
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="d-flex btn btn-primary mt-3"
            disabled={submitLoading}
          >
            {submitLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Mengirim...
              </>
            ) : (
              "Submit Pengajuan"
            )}
          </button>
        </form>
      )}
    </div>
  );
}

export default FormPengajuanBarang;
