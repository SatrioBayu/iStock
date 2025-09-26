import React from "react";
import styles from "./Header.module.css";

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
              <a className="nav-link active" aria-current="page" href="#">
                Beranda
              </a>
              <a className="nav-link" href="#">
                Pengajuan Barang
              </a>
              <a className="nav-link" href="#">
                Riwayat Pengajuan Barang
              </a>
            </div>
          </div>
          <a className="navbar-brand" href="#">
            <button className="btn btn-outline-success">Login</button>
          </a>
        </div>
      </nav>
    </header>
  );
}

export default Header;
