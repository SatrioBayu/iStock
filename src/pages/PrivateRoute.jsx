import { Navigate, Outlet, useLocation } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../store/auth-context";

function PrivateRoute({ allowedRoles }) {
  // const { user } = useContext(AuthContext);
  const location = useLocation();
  const token = localStorage.getItem("token");

  // Cek login atau tidak
  if (token) return <Outlet />;

  // // Cek user role
  // if (user && allowedRoles.includes(user.role)) {
  //   return <Outlet />;
  // }

  // Jika tidak ada user atau role tidak sesuai, redirect ke halaman login
  return <Navigate to="/login" state={{ from: location }} replace />;
}
export default PrivateRoute;
