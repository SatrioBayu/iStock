import { useState, useContext } from "react";
import styles from "../components/Login.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../store/auth-context";
import { API_BASE_URL } from "../config";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) {
        setIsLoading(false);
        throw new Error(result.errors[0].message || "Login failed");
      }
      await login(result.token);
      navigate("/");
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className={`${styles.wrapper} ${styles.bg}`}>
      <div className={`${styles.isi} px-3 py-5`}>
        <div className="row align-items-center gy-2">
          <div className="col-md-2">
            <img src="iStock.png" className={`${styles["img-logo"]}`} alt="" />
          </div>
          <div className="col-md-10">
            <h5 className="mb-0 fw-bold">
              Manajemen Persediaan PT TUN Makassar
            </h5>
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
        {error && <p className="text-danger">{error}</p>}

        <NavLink to="/">
          <p className="mb-0">Kembali ke Beranda</p>
        </NavLink>
      </div>
    </div>
  );
}
