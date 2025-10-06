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

  const fetchData = async () => {
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
  };

  useEffect(() => {
    fetchData();
  }, [barcode]);

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

  const handleTambahTransaksi = async (formData) => {
    const confirm = await Swal.fire({
      title: "Tambah Transaksi?",
      text: "Apakah Anda yakin ingin menambahkan transaksi baru?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Ya, tambah",
      cancelButtonText: "Batal",
    });
    // Jika dibatalkan, hentikan proses
    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(
        `${API_BASE_URL}/admin/barang/transaksi/add/${formData.barcode}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) throw new Error("Gagal menambahkan transaksi");

      const newTransaksi = await res.json();

      // Update state agar langsung tampil di tabel
      fetchData();

      // Tutup loading dan tampilkan pesan sukses
      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Transaksi berhasil ditambahkan.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: "Terjadi kesalahan saat menambahkan transaksi.",
      });
    }
  };

  const handleDeleteTransaksi = async (id) => {
    const result = await Swal.fire({
      title: "Yakin hapus transaksi ini?",
      text: "Data yang dihapus tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `${API_BASE_URL}/admin/barang/transaksi/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
            },
          }
        );

        if (!response.ok) throw new Error("Gagal menghapus transaksi");

        const res = await response.json();

        setBarang(res.data);
        setRiwayat(res.data.TransaksiPembelians || []);

        Swal.fire({
          icon: "success",
          title: "Transaksi dihapus",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (err) {
        console.error(err);
        Swal.fire(
          "Error",
          "Terjadi kesalahan saat menghapus transaksi.",
          "error"
        );
      }
    }
  };

  // const handleDeleteBarang = async () => {
  //   const result = await Swal.fire({
  //     title: "Apakah Anda yakin?",
  //     text: "Data barang ini akan dihapus secara permanen!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#d33",
  //     cancelButtonColor: "#6c757d",
  //     confirmButtonText: "Ya, hapus",
  //     cancelButtonText: "Batal",
  //     allowOutsideClick: false,
  //   });

  //   if (result.isConfirmed) {
  //     try {
  //       const res = await fetch(`${API_BASE_URL}/admin/barang/${barcode}`, {
  //         method: "DELETE",
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
  //         },
  //       });

  //       if (!res.ok) throw new Error("Gagal menghapus barang");

  //       Swal.fire({
  //         icon: "success",
  //         title: "Dihapus!",
  //         text: "Data barang berhasil dihapus.",
  //         showConfirmButton: false,
  //         timer: 1500,
  //         allowOutsideClick: false,
  //         didClose: () => {
  //           navigate("/");
  //         },
  //       });
  //     } catch (err) {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Gagal",
  //         text: "Terjadi kesalahan saat menghapus data.",
  //       });
  //     }
  //   }
  // };

  return (
    <div className="container py-4">
      <BackButton className="mb-4" />
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold text-primary">Detail Barang</h5>
        <button className="btn btn-danger btn-sm" disabled>
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
        onDelete={handleDeleteTransaksi}
      />

      <TambahTransaksiModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleTambahTransaksi}
        barcode={barcode}
      />
    </div>
  );
};

export default DetailBarang;
