import Home from "./pages/Home";
import RiwayatPengajuan from "./pages/RiwayatPengajuan";
import PengajuanBarang from "./pages/PengajuanBarang";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import DetailRiwayatPengajuan from "./pages/DetailRiwayatPengajuan";
import { loader as detailRiwayatLoader } from "./pages/DetailRiwayatPengajuan";
import Login from "./pages/Login";
import DetailBarang from "./pages/DetailBarang";
import PrivateRoute from "./pages/PrivateRoute";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        // {
        //   path: "detail-barang/:barcode",
        //   element: <DetailBarang />,
        // },
        {
          element: (
            <PrivateRoute allowedRoles={["Pengelola BMN", "Kasubbag TURT"]} />
          ),
          children: [
            { path: "detail-barang/:barcode", element: <DetailBarang /> },
          ],
        },
        {
          path: "pengajuan-barang",
          element: <PengajuanBarang />,
        },
        {
          path: "riwayat-pengajuan",
          children: [
            {
              path: "",
              element: <RiwayatPengajuan />,
            },
            {
              path: ":kode_request",
              element: <DetailRiwayatPengajuan />,
              loader: detailRiwayatLoader,
            },
          ],
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
