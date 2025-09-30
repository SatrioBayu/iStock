import React from "react";

function FormInput({ uid, data, onChange, onRemove, barangOptions }) {
  return (
    <div className="row row-cols-4">
      <div className="col">
        <label className="form-label">Nama Barang</label>
        <select
          className="form-select"
          aria-label="Default select example"
          required
          onChange={(e) => onChange(uid, "barang", e.target.value)}
        >
          <option value="">-- Pilih Barang --</option>
          {barangOptions.map((barang) => (
            <option key={barang.id} value={barang.nama}>
              {barang.nama}
            </option>
          ))}
        </select>
      </div>
      <div className="col">
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput2" className="form-label">
            Jumlah
          </label>
          <input
            type="number"
            className="form-control"
            id="exampleFormControlInput2"
            placeholder="0"
            defaultValue={data.jumlah}
            required
            onChange={(e) => onChange(uid, "jumlah", e.target.value)}
          />
        </div>
      </div>
      <div className="col">
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            Stok Tersedia
          </label>
          <input
            type="number"
            className="form-control"
            id="exampleFormControlInput3"
            value={data.stok}
            disabled
          />
        </div>
      </div>
      <div className="col">
        <div className="mb-3">
          <button
            type="button"
            onClick={() => onRemove(uid)}
            className="btn btn-danger"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}

export default FormInput;
