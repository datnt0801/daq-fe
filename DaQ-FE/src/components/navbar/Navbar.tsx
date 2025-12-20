import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <nav className="bg-white fixed top-0 left-0 w-full z-50 shadow-xl ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          <div className="text-xl font-bold">
            <a
              href="/"
              className="hover:text-red-400 transition text-red-700 border-b-2 border-red-700"
            >
              DaQ Restaurant
              <p className="text-xs text-gray-500">Vietnamese Hotpot</p>
            </a>
          </div>

          
          <div className="hidden md:flex space-x-8">
            <a href="/notfound" className="hover:text-blue-400 transition">
              Ưu Đãi
            </a>
            <a href="/menu" className="hover:text-blue-400 transition">
              Thực Đơn
            </a>
            <a href="/notfound" className="hover:text-blue-400 transition">
              Đặt Bàn
            </a>
          </div>

          
          <div className="hidden md:flex items-center gap-2">
            <button className="rounded-full cursor-pointer" onClick={() => navigate("/auth")}>
              Đăng nhập
            </button>
            <button className="rounded-full cursor-pointer h-6 w-6">
              <img
                src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt="abc"
                className="w-6 h-6 rounded-full"
              />
            </button>
          </div>

          
          <div className="md:hidden flex items-center gap-2">
            <button className="rounded-full cursor-pointer" onClick={() => navigate("/auth")}>
              Đăng nhập
            </button>
            <button className="rounded-full cursor-pointer h-6 w-6">
              <img
                src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt="abc"
                className="w-6 h-6 rounded-full"
              />
            </button>
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      
      {isOpen && (
        <div className="md:hidden bg-white">
          <a href="/notfound" className="block px-4 py-2 hover:bg-gray-700">
            Ưu Đãi
          </a>
          <a href="/menu" className="block px-4 py-2 hover:bg-gray-700">
            Thực Đơn
          </a>
          <a href="/notfound" className="block px-4 py-2 hover:bg-gray-700">
            Đặt Bàn
          </a>
        </div>
      )}
    </nav>
  );
}
