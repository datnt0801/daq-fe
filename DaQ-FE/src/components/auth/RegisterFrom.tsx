import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { verifyEmail } from "./authService";

export default function RegisterForm({ onClick }: { onClick: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [ConfirmEmail, setConfirmEmail] = useState(false);
  const [confirmCode, setConfirmCode] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("DEBUG REGISTER");
    e.preventDefault();
    setLoading(true);
    try {
      const baseURL = import.meta.env.VITE_BASE_AUTH_API_URL;
      const res = await axios.post(`${baseURL}/sign-up`, {
        email,
        password,
        rePassword,
      });
      const data = res.data;
      localStorage.setItem("token", data.signInData.accessToken);
      localStorage.setItem("refresh_token", data.signInData.refreshAccessToken);
      localStorage.setItem("user", JSON.stringify(data.signInData.user));
      console.log("DEBUG REGISTER DATA",data);
      toast("Đăng ký thành công!");
      setConfirmEmail(true);
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setConfirmEmail(false);
      if (Array.isArray(err.response?.data?.message)) {
        err.response.data.message.forEach((message: string) => toast(message));
      } else {
        toast(err.response?.data?.message);
      }
     
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmEmail = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      console.log("DEBUG CONFIRM EMAIL TOKEN",token);
      const res = await verifyEmail(confirmCode, token!);
      console.log("DEBUG CONFIRM EMAIL",res);
      toast("Xác nhận email thành công!");
      onClick();
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
      <div className="flex flex-col gap-2 border border-gray-500/50 p-4 rounded shadow bg-gray-950/10 text-white">
        <p className="mb-2">
          Bạn đã có tài khoản ?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => onClick()}
          >
            Đăng nhập
          </span>
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!ConfirmEmail && <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="border border-gray-500/50 rounded p-2
             text-white text-sm text-shadow-lg
             placeholder:text-white placeholder:text-sm placeholder:text-shadow-lg 
             focus:outline-none focus:ring-2 focus:ring-blue-500
             "
          />}
          {!ConfirmEmail && <input
            type="password"
            placeholder="Mật khẩu"
            className="border border-gray-500/50 rounded p-2
             text-white text-sm text-shadow-lg
             placeholder:text-white placeholder:text-sm placeholder:text-shadow-lg 
             focus:outline-none focus:ring-2 focus:ring-blue-500
             "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />}
          { <input
            type={ConfirmEmail ? "text" : "password"}
            placeholder={ConfirmEmail ? "Mã xác nhận" : "Nhập lại mật khẩu"}
            className="border border-gray-500/50 rounded p-2
                      text-white text-sm text-shadow-lg
                      placeholder:text-white placeholder:text-sm placeholder:text-shadow-lg 
                      focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={ConfirmEmail ? confirmCode : rePassword}
            onChange={(e) => ConfirmEmail ? setConfirmCode(e.target.value) : setRePassword(e.target.value)}
          />}
          {!ConfirmEmail && <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded text-shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            {loading ? "Loading..." : "Đăng ký"}
          </button>}
        </form>
        {ConfirmEmail && <button
            type="button"
            className="bg-blue-500 text-white p-2 rounded text-shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
            onClick={() => (handleConfirmEmail())}
          >
            {loading ? "Loading..." : "Xác nhận email"}
          </button>}
      </div>
    </div>
  );
}
