import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import { useEffect, useState } from "react";
import type { Buffet, Set } from "../shared/types/common";
import { getSets, getBuffets } from "../components/Order/orderService";
import { AdminLayoutContext } from "../context/AdminLayoutContext";


export default function AdminLayout() {

  const [Sets, setSets] = useState<Set[]>([])
  const [Buffets, setBuffets] = useState<Buffet[]>([])


  useEffect(() => {
    const fetchBuffets = async () => {
      const res = await getBuffets();
      setBuffets(res.map((b) => ({ ...b, type: "buffet" })));
    };
    fetchBuffets();
  }, []);

  useEffect(() => {
    const fetchSets = async () => {
      const res = await getSets();
      setSets(res.map((s) => ({ ...s, type: "set" })));
    };
    fetchSets();
  }, []);

  return (
    <AdminLayoutContext.Provider value={{ Sets, Buffets, setSets, setBuffets }}>
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
    </AdminLayoutContext.Provider>
  );
}
