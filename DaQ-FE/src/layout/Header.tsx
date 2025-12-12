import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between">
      <nav className="flex gap-2">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => navigate("/")}
        >
          Trang chủ
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => navigate("/about")}
        >
          Giới thiệu
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => navigate("/contact")}
        >
          Liên hệ
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => navigate("/auth")}
        >
          Đăng nhập
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => navigate("/auth")}
        >
          Đăng ký
        </button>
      </nav>
    </div>
  );
}
