import { useEffect, useState } from "react";
import { useOrderLayout } from "../../context/OrderLayoutContext";
import { ArrowLeft, ArrowRight, Minus, Plus, X } from "lucide-react";
import type { Item } from "../../shared/types/common";
import { getItemsByOrderId } from "../Order/orderService";
import { createOrderDetails } from "../Order/orderService";

type Props = {
  open: "sidebar" | "cart" | null;
  setOpen: (value: "sidebar" | "cart" | null) => void;
};


export default function ToggleCartSidebar({ open, setOpen }: Props) {
  const [tab, setTab] = useState("current");

  const [previousCart, setPreviousCart] = useState<{item: Item, quantity: number, status: string}[]>([]);

  const order = JSON.parse(localStorage.getItem("order")!);

  const { foodItemSelected, removeFoodItem, addFoodItem, clearFoodItems } = useOrderLayout();

  const { paymentModal, setPaymentModal } = useOrderLayout();
  
  useEffect(() => {
    fetchPreviousCart();
  }, []);

  const fetchPreviousCart = async () => {
    getItemsByOrderId(order.id).then((res) => {
      setPreviousCart(res.map((item) => ({item: item.item, quantity: item.quantity, status: item.status})));
    })
  }
  
  return (
    <>
      <div
        className={`
              fixed top-0 right-0 h-full bg-gray-900 text-white shadow-lg
              transition-transform duration-300 ease-in-out
              w-3/4 md:w-1/2 z-50 flex flex-col justify-between
              ${open === "cart" ? "translate-x-0" : "translate-x-full"}
            `}
      >
        <div className="flex justify-end">
          <button
            onClick={() => setTab("current")}
            className={`w-1/2 border-b-2 p-1 ${
              tab === "current" ? "border-red-700" : "border-transparent"
            }`}
          >
            Món Đang Gọi
          </button>
          <button
            onClick={async() => {
              setTab("previous");
              await fetchPreviousCart();
            }}
            className={`w-1/2 border-b-2 p-1 ${
              tab === "previous" ? "border-red-700" : "border-transparent"
            }`}
          >
            Món Đã Gọi
          </button>
          <button
            onClick={() => {
              setOpen(null);
            }}
            className="text-white hover:bg-gray-800 p-2 rounded"
          >
            <ArrowRight />
          </button>
        </div>

        {tab === "current" && (
          <nav className="flex-1 space-y-1 px-3 overflow-y-auto mt-2">
            {/* <div className="flex justify-between p-2 sticky top-0 z-10 bg-gray-800">
              <span className="w-2/5">Tên Món</span>
              <span className="w-2/5">Đơn Giá</span>
              <span className="w-1/5 text-center">SL</span>
            </div> */}
            {foodItemSelected.map((food) => (
              <div
                key={food.item.id}
                className="p-2 cursor-pointer hover:bg-gray-800 rounded text-white flex justify-between"
              >
                <span className="w-2/5 truncate text-center">{food.item.name}</span>
                <span className="w-2/5 truncate text-center">{food.item.price.toLocaleString()} đ</span>
                <div className="flex gap-2 w-1/5 items-center justify-center">
                  <button onClick={() => removeFoodItem(food.item.id)}><Minus className="w-5 h-5 rounded-full bg-red-700" /></button>
                  <span>{food.quantity}</span>
                  <button onClick={() => addFoodItem(food.item)}><Plus className="w-5 h-5 rounded-full bg-green-700" /></button>
                </div>
              </div>
            ))}
          </nav>
        )}

        {tab === "previous" && (
          <nav className="flex-1 space-y-1 px-3 overflow-y-auto mt-2">
            {/* <div className="flex justify-between p-2 sticky top-0 z-10 bg-gray-800">
              <span className="w-2/5">Tên Món</span>
              <span className="w-2/5">Đơn Giá</span>
              <span className="w-1/5 text-center">SL</span>
            </div> */}
            {previousCart.map((food) => (
              <div
                key={food.item.id + food.status}
                className="p-2 cursor-pointer hover:bg-gray-800 rounded text-white flex justify-between"
              >
                <span className="w-2/5 truncate text-center">{food.item.name}</span>
                <span className="w-2/5 truncate text-center">{food.status == "DOING" ? "Đang làm" : "Đã xong"}</span>
                <div className="flex gap-2 w-1/5 items-center justify-center">
                  <span className="w-1/5 text-center">{food.quantity}</span>
                </div>
              </div>
            ))}
          </nav>
        )}

        {tab === "current" && (
          <div className="flex justify-end bg-gray-800 shadow-2xl">
            <button className="w-1/2 bg-red-700 p-2 rounded"
            onClick={async()=>{
              await createOrderDetails(order.id, foodItemSelected.map((food => ({foodItemId: food.item.id, quantity: food.quantity}))))
              clearFoodItems();
              await fetchPreviousCart();
              setTab("previous");
            }}
            >Gọi Món</button>
          </div>
        )}

        {tab === "previous" && (
          <div className="flex justify-end bg-gray-800 shadow-2xl">
            <button className="w-1/2 bg-red-700 p-2 rounded"
            onClick={async()=>{
              // await updateOrder(order.id, {status: "PAID"})
              setPaymentModal(true);
            }}
            >Thanh Toán</button>
          </div>
        )}
      </div>

      {open === "cart" && (
        <div
          className="fixed inset-0 bg-black/50 z-40 "
          onClick={() => setOpen(null)}
        />
      )}
    </>
  );
}
