import { useState, useContext } from "react";
import styles from "./Header.module.css";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../store/auth-context";

function Header() {
  const { user, logout, loading } = useContext(AuthContext);

  if (loading) {
    return <nav className="navbar">Loading...</nav>;
  }

  return (
    <header>
      <nav className="navbar mb-5 navbar-expand-md bg-body-tertiary sticky-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img
              src="/iStock.png"
              alt="Logo"
              width="80"
              height="30"
              className="d-inline-block align-text-center"
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <NavLink
                to=""
                end
                className={`nav-link ${({ isActive }) =>
                  isActive ? "active" : undefined}`}
              >
                Beranda
              </NavLink>
              <NavLink
                to="pengajuan-barang"
                className={`nav-link ${({ isActive }) =>
                  isActive ? "active" : undefined}`}
              >
                Pengajuan Barang
              </NavLink>
              <NavLink
                to="riwayat-pengajuan"
                className={`nav-link ${({ isActive }) =>
                  isActive ? "active" : undefined}`}
              >
                Riwayat Pengajuan
              </NavLink>
            </div>
          </div>
          {!user ? (
            <Link className="navbar-brand" to="/login">
              <button className="btn btn-success">Login</button>
            </Link>
          ) : (
            <div className="navbar-brand btn-group">
              <button
                className="btn btn-outline-success dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Hi {user.nama}
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <button onClick={logout} className="btn dropdown-item">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
