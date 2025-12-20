import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import Layout from "./layout/Layout";
import AboutPage from "./pages/about/AboutPage";
import AuthPage from "./pages/auth/AuthPage";
import AdminPage from "./pages/admin/AdminPage";
import AdminLayout from "./layout/AdminLayout";
import StaffPage from "./pages/admin/Staff";
import MenuPage from "./pages/admin/Menu";
import TablePage from "./pages/admin/Table";
import UserPage from "./pages/user/UserPage";
import UserLayout from "./layout/UserLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import NotFoundPage from "./pages/NotFoundPage";
import OrderLayout from "./layout/OrderLayout";
import OrderPage from "./pages/order/OrderPage";
import OrderMenuPage from "./pages/order/OrderMenuPage";
import SetMenu from "./pages/admin/SetMenu";
import Statistic from "./pages/admin/Statistic";
// import TablesPage from "./pages/admin/Tables";
// import WarehousePage from "./pages/admin/Warehouse";
// import StatisticsPage from "./pages/admin/Statistics";
// import RolesPage from "./pages/admin/Roles";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route index element={<UserPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Route>

      <Route path="/auth">
        <Route index element={<AuthPage />} />
        <Route path=":tableId" element={<AuthPage />} />
      </Route>


      <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<AdminPage />} />
          <Route path="staff" element={<StaffPage />} />
          <Route path="menu" element={<MenuPage />} />
          <Route path="table" element={<TablePage />} />
          <Route path="set-menu" element={<SetMenu />} />
          <Route path="statistics" element={<Statistic />} />
          {/* <Route path="menu" element={<MenuPage />} />
        <Route path="tables" element={<TablesPage />} />
        <Route path="warehouse" element={<WarehousePage />} />
        <Route path="statistics" element={<StatisticsPage />} />
        <Route path="roles" element={<RolesPage />} /> */}
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["USER"]} />}>
        <Route path="user" element={<UserLayout />}>
          <Route index element={<UserPage />} />
          <Route path="menu" element={<MenuPage />} />
          <Route path="table" element={<TablePage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["USER"]} />}>
        <Route path="menu" element={<OrderLayout />}>
          <Route index element={<OrderMenuPage />} />
          <Route path="order" element={<OrderPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
