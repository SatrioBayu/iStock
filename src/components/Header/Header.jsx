import { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../store/auth-context";
import styles from "./Header.module.css";

function Header() {
  const { user, logout, loading } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  if (loading) {
    return (
      <nav className={styles.navbar}>
        <span>Loading...</span>
      </nav>
    );
  }

  return (
    <header className={styles.header}>
      {/* Top Navbar */}
      <nav className={`navbar navbar-expand-md ${styles.navbar}`}>
        <div className="container-fluid d-flex align-items-center justify-content-between">
          {/* Hamburger (mobile left) */}
          <button
            className={`${styles.menuBtn} ${
              sidebarOpen ? styles.fixedMenuBtn : ""
            }`}
            onClick={toggleSidebar}
          >
            {!sidebarOpen ? (
              <span className={styles.hamburger}></span>
            ) : (
              <span className={styles.closeIcon}>&times;</span>
            )}
          </button>

          {/* Centered Logo */}
          <Link className={`navbar-brand ${styles.brandCenter}`} to="/">
            <img
              src="/iStock.png"
              alt="Logo"
              width="90"
              height="35"
              className="d-inline-block align-text-center"
            />
          </Link>

          <div style={{ width: "30px" }}></div>

          {/* Desktop Menu */}
          <div className="collapse navbar-collapse d-none d-md-flex justify-content-end">
            <div className="navbar-nav align-items-center gap-2">
              <NavLink
                to=""
                end
                className={({ isActive }) =>
                  `${styles.navBtn} ${isActive ? styles.active : ""}`
                }
              >
                Beranda
              </NavLink>

              <NavLink
                to="pengajuan-barang"
                className={({ isActive }) =>
                  `${styles.navBtn} ${isActive ? styles.active : ""}`
                }
              >
                Pengajuan Barang
              </NavLink>

              <NavLink
                to="riwayat-pengajuan"
                className={({ isActive }) =>
                  `${styles.navBtn} ${isActive ? styles.active : ""}`
                }
              >
                Riwayat Pengajuan
              </NavLink>

              {!user ? (
                <Link to="/login" className="btn btn-success ms-3">
                  Login
                </Link>
              ) : (
                <div className="dropdown ms-3">
                  <button
                    className="btn btn-outline-primary dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    Hi, {user.nama}
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <button onClick={logout} className="dropdown-item">
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div
        className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ""}`}
      >
        <div className="mt-3">
          <nav className={styles.sidebarNav}>
            <NavLink
              to=""
              end
              onClick={closeSidebar}
              className={({ isActive }) =>
                `${styles.sidebarLink} ${isActive ? styles.active : ""}`
              }
            >
              Beranda
            </NavLink>

            <NavLink
              to="pengajuan-barang"
              onClick={closeSidebar}
              className={({ isActive }) =>
                `${styles.sidebarLink} ${isActive ? styles.active : ""}`
              }
            >
              Pengajuan Barang
            </NavLink>

            <NavLink
              to="riwayat-pengajuan"
              onClick={closeSidebar}
              className={({ isActive }) =>
                `${styles.sidebarLink} ${isActive ? styles.active : ""}`
              }
            >
              Riwayat Pengajuan
            </NavLink>
          </nav>

          <div className="mt-auto pt-3">
            {!user ? (
              <Link
                to="/login"
                onClick={closeSidebar}
                className="btn btn-primary w-100"
              >
                Login
              </Link>
            ) : (
              <button
                onClick={() => {
                  logout();
                  closeSidebar();
                }}
                className="btn btn-outline-danger w-100"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div className={styles.overlay} onClick={closeSidebar}></div>
      )}
    </header>
  );
}

export default Header;
