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
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <p className="mb-0">
        © {new Date().getFullYear()} <strong>iStock v.4.4</strong> — Sistem
        Manajemen Persediaan Barang. • All rights reserved.
      </p>
      <p className="mb-0"></p>
    </footer>
  );
}

export default Footer;
