import { Facebook, Instagram, Twitter } from "lucide-react";

function Footer() {
  return (
    <div className="bg-gray-900 text-white p-4 flex flex-col gap-4">
      CÔNG TY CỔ PHẦN TẬP ĐOÀN GOLDEN GATE
      <p className="text-sm text-gray-400">
        Trụ sở chính: Số 60 Phố Giang Văn Minh, Phường Đội Cấn, Quận Ba Đình,
        Thành phố Hà Nội, Việt Nam VPGG: Tầng 6, Tòa nhà Toyota, Số 315 Trường
        Chinh, P.Khương Mai, Q.Thanh Xuân, TP Hà Nội, Việt Nam. Chịu trách nhiệm
        nội dung: (Ông) Lê Quốc Tuấn GPĐK: 0102721191 cấp ngày 09/04/2008 ĐT:
        043 222 3000 Email: support.hn@ggg.com.vn
      </p>
      <p className="text-sm text-gray-400">
        Giấy chứng nhận đăng ký kinh doanh số: 0102721191 cấp ngày 09/04/2008
      </p>
      <div className="flex justify-start gap-3">
        <Facebook
          size={24}
          className="cursor-pointer hover:text-blue-400 transition"
          onClick={() => window.open("https://www.facebook.com")}
        />
        <Instagram
          size={24}
          className="cursor-pointer hover:text-blue-400 transition"
          onClick={() => window.open("https://www.instagram.com")}
        />
        <Twitter
          size={24}
          className="cursor-pointer hover:text-blue-400 transition"
          onClick={() => window.open("https://twitter.com")}
        />
      </div>
    </div>
  );
}

export default Footer;
