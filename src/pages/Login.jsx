import { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../store/auth-context";
import { API_BASE_URL } from "../config";
import styles from "./Login.module.css";

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
      if (!response.ok)
        throw new Error(result.errors?.[0]?.message || "Login gagal");

      await login(result.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginCard}>
        <div className={styles.logoWrapper}>
          <img src="/iStock.png" alt="Logo" className={styles.logo} />
          <h5>Manajemen Persediaan</h5>
          <h5>PT TUN Makassar</h5>
          <p className={styles.subtitle}>Login Admin</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <i className="bi bi-person"></i>
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <i className="bi bi-lock"></i>
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className={styles.input}
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button
            type="submit"
            className={`${styles.btnLogin} ${isLoading ? styles.loading : ""}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="spinner-border spinner-border-sm"></span>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <NavLink to="/dashboard" className={styles.backLink}>
          Kembali ke Beranda
        </NavLink>
      </div>
    </div>
  );
}
