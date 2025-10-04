import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function PrivateRoute() {
  const isLoggedIn = localStorage.getItem("username"); // atau token

  const location = useLocation();

  if (!isLoggedIn) {
    // simpan lokasi terakhir biar bisa redirect balik setelah login
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
