import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
export default function UserLayout() {
  return (
    <div className="h-screen w-screen flex flex-col">
      <div className="mb-20">
        <Navbar />
      </div>

      <div className="flex-1 overflow-y-auto">
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}
