import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginPage({ onClick }: { onClick: () => void }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const baseURL = import.meta.env.VITE_BASE_AUTH_API_URL;

      const res = await axios.post(`${baseURL}/sign-in`, {
        email: username,
        password,
      });
      const data = res.data;
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("refresh_token", data.refreshAccessToken);
      localStorage.setItem("user", JSON.stringify(data.user));
      toast("Đăng nhập thành công!");
      console.log("data", data);
      if (data.user.userType === "ADMIN") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/user", { replace: true });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (Array.isArray(err.response?.data?.message)) {
        err.response.data.message.forEach((message: string) => toast(message));
      } else {
        toast(err.response?.data?.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 justify-center items-center h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200">
      <div className="flex flex-col gap-2 justify-center items-center p-4 rounded shadow bg-gray-950/10 text-white text-shadow-lg border border-gray-500/50">
        <p className="text-center mb-2">
          Bạn chưa có tài khoản?{" "}
          <span onClick={onClick} className="text-blue-500 cursor-pointer">
            Đăng ký
          </span>
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <input
            type="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Email"
            className="border border-gray-500/50 rounded p-2
             text-white text-sm text-shadow-lg
             placeholder:text-white placeholder:text-sm placeholder:text-shadow-lg 
             focus:outline-none focus:ring-2 focus:ring-blue-500
             "
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mật khẩu"
            className="border border-gray-500/50 rounded p-2
             text-white text-sm text-shadow-lg
             placeholder:text-white placeholder:text-sm placeholder:text-shadow-lg 
             focus:outline-none focus:ring-2 focus:ring-blue-500
             "
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded text-shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            {loading ? "Loading..." : "Đăng nhập"}
          </button>
        </form>
      </div>
    </div>
  );
}
