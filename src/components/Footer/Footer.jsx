// import React from "react";
// import styles from "./Footer.module.css";

// function Footer() {
//   return (
//     <footer className="container-fluid text-center mt-3 p-2 text-primary-emphasis bg-primary-subtle">
//       <p className="m-0 ">Copyright 2025</p>
//     </footer>
//   );
// }

// export default Footer;

import React from "react";

function Footer() {
  return (
    <footer className="bg-light text-dark py-4 border-top">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
        {/* Brand + tagline */}
        <div className="mb-2 mb-md-0">
          <h5 className="fw-bold mb-1">iStock</h5>
          <small className="text-muted">
            Solusi cerdas untuk pengajuan barang
          </small>
        </div>

        {/* Copyright */}
        <div className="text-muted">
          &copy; {new Date().getFullYear()} iStock. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
