import Home from "./pages/Home";
import RiwayatPengajuan from "./pages/RiwayatPengajuan";
import PengajuanBarang from "./pages/PengajuanBarang";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout";

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
        {
          path: "pengajuan-barang",
          element: <PengajuanBarang />,
        },
        {
          path: "riwayat-pengajuan",
          element: <RiwayatPengajuan />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
