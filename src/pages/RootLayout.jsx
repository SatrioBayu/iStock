// import React from "react";
// import Header from "../components/Header/Header";
// import Footer from "../components/Footer/Footer";
// import { Outlet } from "react-router-dom";

// function RootLayout() {
//   return (
//     <>
//       <Header />
//       <div className="container-md p-4 border app-container">
//         <Outlet />
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default RootLayout;

import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router-dom";
import styles from "./RootLayout.module.css";

function RootLayout() {
  return (
    <div className={styles.layoutWrapper}>
      <Header />
      <main className={styles.mainContent}>
        <div className={styles.contentWrapper}>
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default RootLayout;
