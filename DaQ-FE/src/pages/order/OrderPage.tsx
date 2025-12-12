import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { Item } from "../../shared/types/common";
import { getItemsByBuffetId, getItemsBySetId } from "../../components/Order/orderService";
import { getItems } from "../../components/Menu/menuService";
import { useOutletContext } from "react-router-dom";
import { getItemsAndCategories } from "../../components/Menu/menuService";
import { useOrderLayout } from "../../context/OrderLayoutContext";
import PaymentModal from "../../components/Order/PaymentModal";

interface OrderCartProps {
  item: Item;
  hidden?: boolean;
  setFoodItemSelected?: (value: Item) => void;
}

export function OrderCart({ item, hidden, setFoodItemSelected }: OrderCartProps) {
  return (
    <div className="flex gap-2 bg-gray-800 text-white rounded-2xl md:w-[calc(50%-10px)]">
      <img
        className="w-1/2 rounded-l-2xl"
        src={
          item.image
            ? item.image
            : "https://brand-pcms.ggg.systems/media/catalog/product/cache/fccf9bc1c56510f6f2e84ded9c30a375/6/0/60001584-ba-chi-heo-iberico_2_1.jpg"
        }
        alt="abc"
      />
      <div className="w-1/2 flex gap-2 justify-between p-2 ">
        <h1 className="self-start">{item.name}</h1>
        <div className="flex gap-2  self-end ">
          {hidden ? null : (
            <button className="p-2 rounded flex justify-center items-center bg-red-700"
            onClick={() => {
              setFoodItemSelected?.(item);
              console.log(item);
              
            }}>
              Thêm
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function OrderPage() {

  const {itemsAndCategories, setItemsAndCategories} = useOutletContext<{itemsAndCategories: [], setItemsAndCategories: (value: []) => void}>();

  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const id = searchParams.get("id");
  const [items, setItems] = useState<Item[]>([]);
  const { paymentModal, setPaymentModal } = useOrderLayout();

  const { addFoodItem} = useOrderLayout();
  
  useEffect(() => {
    const fetchData = async () => {
      if (type === "buffet" && id) {
        await getItemsByBuffetId(id).then((res) => setItems(res));
      }
      if (type === "set" && id) {
        await getItemsBySetId(id).then((res) => setItems(res));
      }
      if (type === "item" && id) {
        await getItems(1, 99, id, "", "", "").then((res) => setItems(res));
      }
      setItemsAndCategories(await getItemsAndCategories(type!,id!));
    };
    fetchData();
  }, [type, id]);

  const order = JSON.parse(localStorage.getItem("order")!);

  const order_price = localStorage.getItem("order_price") || "0";

  return (
    <div className="flex flex-col h-full">
      <PaymentModal isOpen={paymentModal} 
      onClose={() => {setPaymentModal(false)}}
       bankCode="mb" accountNumber="0345985454" 
       accountName="Nguyen Tien Dat" amount={order.total * Number(order_price)} 
       note={`DH${order.id}`} />
      <div className="flex justify-center flex-wrap gap-2 overflow-y-auto bg-gray-900">
        {items.map((item) => (
          <OrderCart
            key={item.id}
            item={item}
            setFoodItemSelected={addFoodItem}
          />
        ))}
        
      </div>
    </div>
  );
}

export default OrderPage;
