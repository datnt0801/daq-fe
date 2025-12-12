import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  allowedRoles: string[];
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // Nếu chưa đăng nhập -> đá về trang /auth
  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  // Nếu role không khớp -> đá về home
  if (!allowedRoles.includes(user?.userType || "")) {
    if (user?.userType === "ADMIN") {
      return <Navigate to="/admin" replace />;
    }
    if (user?.userType === "USER") {
      return <Navigate to="/user" replace />;
    }
    return <Navigate to="/" replace />;
  }

  // Hợp lệ -> render route con
  return <Outlet />;
}
