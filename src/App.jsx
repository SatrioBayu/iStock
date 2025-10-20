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
import RiwayatPengajuanStatus from "./pages/RiwayatPengajuanStatus";
import LandingPage from "./components/LandingPage/LandingPage";
import NotFound from "./components/NotFound/NotFound";
import LacakPengajuan from "./pages/LacakPengajuan";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/dashboard",
      element: <RootLayout />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          // element: (
          //   <PrivateRoute allowedRoles={["Pengelola BMN", "Kasubbag TURT"]} />
          // ),
          // children: [
          //   { path: "detail-barang/:barcode", element: <DetailBarang /> },
          // ],
          path: "detail-barang/:barcode",
          element: <DetailBarang />,
        },
        {
          path: "pengajuan-barang",
          element: <PengajuanBarang />,
        },
        {
          path: "riwayat-pengajuan",
          element: <RiwayatPengajuan />,
          children: [
            { path: ":status", element: <RiwayatPengajuanStatus /> },
            // ✅ Detail berdasarkan status & kode_request
            {
              path: ":status/:kode_request",
              element: <DetailRiwayatPengajuan />,
              loader: detailRiwayatLoader,
            },
          ],
        },
        {
          path: "track-pengajuan",
          element: <LacakPengajuan />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
