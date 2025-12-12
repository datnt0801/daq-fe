import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { FEcheckPayment } from "./orderService";
import { useNavigate } from "react-router-dom";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  bankCode: string;   // vd: "mb"
  accountNumber: string; // vd: "0123456789"
  accountName: string; // vd: "NGUYEN VAN A"
  amount: number;     // số tiền muốn hiển thị
  note: string;
};

export default function PaymentQRModal({
  isOpen,
  onClose,
  bankCode,
  accountNumber,
  accountName,
  amount,
  note,
}: Props) {

  const [paymentConfirm, setPaymentConfirm] = useState(false)
  const order = JSON.parse(localStorage.getItem("order")!);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) return;

    let isCanceled = false;

    const poll = async () => {

      if (isCanceled) return;

      try {
        const res = await FEcheckPayment(order.id);
        if (res?.message === "paid") {
          setPaymentConfirm(true);
          isCanceled = true;
          return;
        }
        setTimeout(poll, 5000);
      } catch (error) {
        console.error("Polling error:", error);
      }
    };

    poll();
  }, [isOpen]);

  
  
  if (!isOpen) return null;

  const qrUrl = `https://img.vietqr.io/image/${bankCode}-${accountNumber}-compact.png?amount=${amount}&accountName=${encodeURIComponent(
    accountName
  )}&addInfo=${encodeURIComponent(note)}`;  

  return (
    
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-80 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2"
        >
          <X />
        </button>   

        <h2 className="text-xl font-semibold text-center mb-2">
          Thanh toán QR
        </h2>

        {/* QR Image */}
        <img src={qrUrl} alt="QR Payment" className="w-full rounded-lg" />

        <div className="mt-4 text-sm">
          <p><strong>Ngân hàng:</strong> {bankCode.toUpperCase()}</p>
          <p><strong>Số tài khoản:</strong> {accountNumber}</p>
          <p><strong>Chủ tài khoản:</strong> {accountName}</p>
          <p><strong>Số tiền:</strong> {amount.toLocaleString()}đ</p>
          <p><strong>Ghi chú:</strong> {note}</p>
        </div>

        <button
          className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          onClick={() => {
           navigate(`/user`);
           localStorage.removeItem("order");
           localStorage.removeItem("order_price");
           localStorage.removeItem("numberUser");
          }}
        >
          {paymentConfirm ? "Thanh toán thanh công":"Đang kiểm tra..."}
        </button>
      </div>
    </div>
  );
}
