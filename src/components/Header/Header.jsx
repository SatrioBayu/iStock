import React from "react";
import styles from "./Header.module.css";
import { Link, NavLink } from "react-router-dom";

function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-md bg-body-tertiary sticky-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img
              src="/iStock.png"
              alt="Logo"
              width="80"
              height="30"
              className="d-inline-block align-text-center"
            />
          </a>
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
                to="/"
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
          <Link className="navbar-brand" to="/login">
            <button className="btn btn-outline-success">Login</button>
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
