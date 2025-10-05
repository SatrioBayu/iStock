import React, { useEffect, useState } from "react";
import BarangInfo from "../components/BarangInfo/BarangInfo";
import RiwayatTransaksi from "../components/RiwayatTransaksi/RiwayatTransaksi";
import TambahTransaksiModal from "../components/TambahTransaksiModal/TambahTransaksiModal";
import { API_BASE_URL } from "../config";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton/BackButton";

const DetailBarang = () => {
  const [barang, setBarang] = useState(null);
  const [riwayat, setRiwayat] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { barcode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${API_BASE_URL}/admin/barang/${barcode}`);
        if (!res.ok) throw new Error("Gagal mengambil data barang");
        const data = await res.json();

        setBarang(data.data);
        setRiwayat(data.data.TransaksiPembelians || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [barcode]);

  const handleTambahTransaksi = async (formData) => {
    try {
      const res = await fetch(`${API_BASE_URL}/barang/${barangId}/transaksi`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Gagal menambahkan transaksi");
      const newTransaksi = await res.json();

      // Update state agar langsung tampil di tabel
      setRiwayat((prev) => [...prev, newTransaksi]);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2">Memuat data...</p>
      </div>
    );
  }

  if (!barang) {
    return (
      <div className="container text-center py-5 text-danger">
        Data barang tidak ditemukan.
      </div>
    );
  }

  const handleDeleteBarang = async () => {
    const result = await Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data barang ini akan dihapus secara permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
      allowOutsideClick: false,
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`${API_BASE_URL}/admin/barang/${barcode}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
        });

        if (!res.ok) throw new Error("Gagal menghapus barang");

        Swal.fire({
          icon: "success",
          title: "Dihapus!",
          text: "Data barang berhasil dihapus.",
          showConfirmButton: false,
          timer: 1500,
          allowOutsideClick: false,
          didClose: () => {
            navigate("/");
          },
        });
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Terjadi kesalahan saat menghapus data.",
        });
      }
    }
  };

  return (
    <div className="container py-4">
      <BackButton className="mb-4" />
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold text-primary">Detail Barang</h5>
        <button className="btn btn-danger btn-sm" onClick={handleDeleteBarang}>
          Hapus Barang
        </button>
      </div>

      <BarangInfo
        barang={barang}
        onUpdate={(updatedBarang) => setBarang(updatedBarang)}
      />
      <RiwayatTransaksi
        riwayat={riwayat}
        onTambahClick={() => setShowModal(true)}
      />

      <TambahTransaksiModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleTambahTransaksi}
      />
    </div>
  );
};

export default DetailBarang;
