import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Utensils,
  Table,
  Box,
  BarChart3,
  Shield,
  LogOut,
} from "lucide-react";
import { signout } from "./sideBarService";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const links = [
    { name: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/admin" },
    {
      name: "Quản lý nhân viên",
      icon: <Users size={18} />,
      path: "/admin/staff",
    },
    {
      name: "Quản lý thực đơn",
      icon: <Utensils size={18} />,
      path: "/admin/menu",
    },
    {
      name: "Quản lý set menu & buffet",
      icon: <Utensils size={18} />,
      path: "/admin/set-menu",
    },
    { name: "Quản lý bàn", icon: <Table size={18} />, path: "/admin/table" },
    { name: "Quản lý kho", icon: <Box size={18} />, path: "/admin/warehouse" },
    {
      name: "Thống kê doanh thu",
      icon: <BarChart3 size={18} />,
      path: "/admin/statistics",
    },
    { name: "Phân quyền", icon: <Shield size={18} />, path: "/admin/roles" },
  ];

  return (
    <aside className="w-64 bg-gray-50 h-full shadow-md hidden md:block">
      <div className="p-4 font-bold text-lg border-b">Admin Panel</div>
      <ul className="p-2">
        {links.map((link) => (
          <li key={link.path}>
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-200 ${
                  isActive ? "bg-gray-200 font-semibold" : ""
                }`
              }
            >
              {link.icon}
              {link.name}
            </NavLink>
          </li>
        ))}
        <li>
          <button
            className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-200"
            onClick={() => {
              signout();
              // console.log("logout");
              // localStorage.removeItem("refresh_token");
              // localStorage.removeItem("token");
              // localStorage.removeItem("user");
              // navigate("/");
            }}
          >
            <LogOut size={18} />
            Đăng xuất
          </button>
        </li>
      </ul>
    </aside>
  );
}
