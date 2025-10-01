import { useState } from "react";
import styles from "../components/Login.module.css";
import { NavLink, useNavigate } from "react-router-dom";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    localStorage.setItem("username", data.username);
    navigate("/");
  };

  return (
    <div className={`${styles.wrapper} ${styles.bg}`}>
      <div className={`${styles.isi} px-3 py-5`}>
        <div className="row align-items-center gy-2">
          <div className="col-md-2">
            <img src="iStock.png" className={`${styles["img-logo"]}`} alt="" />
          </div>
          <div className="col-md-10">
            <h5 className="mb-0 fw-bold">Manajemen Gudang PT TUN Makassar</h5>
          </div>
        </div>
        <p className={`my-2 ${styles["secondary"]}`}>Login Admin</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group mb-3">
            <span className="input-group-text" id="visible-addon">
              @
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              name="username"
              required
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="visible-addon">
              @
            </span>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              required
            />
          </div>
          {isLoading ? (
            <button className={`btn ${styles["btn-login"]} disabled mb-3`}>
              <span className="spinner-border spinner-border-sm"></span>
              Loading...
            </button>
          ) : (
            <button className={`btn ${styles["btn-login"]} mb-3`}>Login</button>
          )}
        </form>

        <NavLink to="/">
          <p className="mb-0">Kembali ke Beranda</p>
        </NavLink>
      </div>
    </div>
  );
}
