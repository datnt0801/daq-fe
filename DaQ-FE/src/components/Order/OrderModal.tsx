import type { Set, Buffet, Item } from "../../shared/types/common";
import { useNavigate } from "react-router-dom";
import { createOrder } from "./orderService";
import { useState, useEffect } from "react";
import { useOrderLayout } from "../../context/OrderLayoutContext";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: Set | Buffet | Item;
}

function OrderModal({ isOpen, onClose, item }: ModalProps) {

  const [numberUser, setNumberUser] = useState("")
  const [validateNumberUser, setValidateNumberUser] = useState(false)

  const {foodItemSelected} = useOrderLayout();

  const navigate = useNavigate();

  if (!isOpen) return null;


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-lg font-bold">Xác nhận chọn món</h2>
        <p>
          Bạn có muốn chọn: <strong>{item?.name}</strong> không?
        </p>
        <div className="relative mt-4">
            <input
              id="numberUser"
              type="number"
              value={numberUser}
              onChange={(e) =>
                setNumberUser((e.target.value))
              }
              placeholder="Số người"
              className="peer w-full rounded-md border border-gray-300 bg-transparent p-2 text-gray-900 placeholder-transparent focus:border-blue-500 focus:outline-none"
            />
            <label
              htmlFor="numberUser"
              className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all
               peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
               peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500 peer-focus:bg-white"
            >
              Số người
            </label>
          </div>
          <div>
            {validateNumberUser && <p className="text-red-500">Số người không hợp lệ!</p>}
          </div>
        <div className="mt-4 flex justify-end gap-2">
          <button
            className="bg-gray-300 px-4 py-2 rounded"
            onClick={() => onClose()}
          >
            Hủy
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={async () => {

              const num = Number(numberUser);

              if (!numberUser || isNaN(num) || num <= 0) {
                setValidateNumberUser(true);
                return;
              }

              const res = await createOrder(item,num);
              localStorage.setItem("order", JSON.stringify(res));
              localStorage.setItem("order_price", item.price.toString());
              onClose();
              navigate(`/menu/order?type=${item.type}&id=${item.id}`, { state: { item }, replace: true });
            }}
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderModal;
