import styles from "./Card.module.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../store/auth-context";

function Card({ nama_barang, stok, barcode, foto }) {
  const { user } = useContext(AuthContext);

  // Tentukan warna teks berdasarkan stok
  // const getStokColor = () => {
  //   if (stok === 0) return "text-danger fw-bold"; // merah
  //   if (stok <= 10) return "text-warning fw-bold"; // kuning
  //   return "text-success fw-bold"; // hijau
  // };

  const CardContent = (
    <div className={`card h-100 ${styles["hover-card"]}`}>
      <img
        src={foto || "/iStock.png"}
        className="card-img-top img-fluid"
        alt="Foto Barang"
        style={{
          height: "150px",
          width: "100%",
          objectFit: "contain",
        }}
      />
      <div className="card-body">
        <h6 className="card-text">{nama_barang}</h6>
      </div>
      <div className="card-footer">
        <p className={`mb-0 ${styles["card-teks"]}`}>Stok: {stok}</p>
      </div>
    </div>
  );

  return (
    <div className="col">
      {user ? (
        <Link
          className="text-decoration-none text-dark"
          to={`detail-barang/${barcode}`}
        >
          {CardContent}
        </Link>
      ) : (
        CardContent
      )}
    </div>
  );
}

export default Card;
