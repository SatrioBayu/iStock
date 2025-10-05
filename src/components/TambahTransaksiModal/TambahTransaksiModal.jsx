import React, { useState } from "react";

const TambahTransaksiModal = ({ show, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    nama_toko: "",
    tanggal_transaksi: "",
    harga_satuan: "",
    jumlah_dibeli: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    const total = formData.harga_satuan * formData.jumlah_dibeli;
    onSubmit({ ...formData, harga_total: total });
    onClose();
  };

  if (!show) return null;

  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Tambah Transaksi</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            {[
              { name: "nama_toko", label: "Nama Toko", type: "text" },
              {
                name: "tanggal_transaksi",
                label: "Tanggal Transaksi",
                type: "date",
              },
              { name: "harga_satuan", label: "Harga Satuan", type: "number" },
              { name: "jumlah_dibeli", label: "Jumlah Dibeli", type: "number" },
            ].map((f, i) => (
              <div className="mb-3" key={i}>
                <label className="form-label">{f.label}</label>
                <input
                  type={f.type}
                  className="form-control"
                  name={f.name}
                  value={formData[f.name]}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Batal
            </button>
            <button className="btn btn-primary" onClick={handleSubmit}>
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TambahTransaksiModal;
