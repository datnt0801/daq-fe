import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";

export default function AdminLayout() {
  return (
    <div className="flex h-screen">
      {/* <div className="h-12 sm:h-14 md:h-16 lg:h-20">
        <Navbar />
      </div> */}

      <div className="flex flex-1">
        <div className="w-64 bg-white shadow-md hidden md:block">
          <Sidebar />
        </div>

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
