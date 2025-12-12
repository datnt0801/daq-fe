import { useState, useEffect } from "react";
import ToggleSidebar from "../components/sidebar/ToggleSidebar";
import Header from "../components/Header/Header";
import { Outlet, useLocation } from "react-router-dom";
import ToggleCartSidebar from "../components/sidebar/ToggleCartSidebar";
import { getBuffets, getSets } from "../components/Order/orderService";
import { getItems } from "../components/Menu/menuService";
import type { Buffet } from "../shared/types/common";
import type { Set } from "../shared/types/common";
import type { Item } from "../shared/types/common";
import OrderModal from "../components/Order/OrderModal";
import DetailModal from "../components/Order/DetailModal";
import { OrderLayoutContext } from "../context/OrderLayoutContext";

export type ItemWithCategory = {
  item: Item;
  quantity: number;
};

export type ItemWithQuantity = {
  item: Item;
  quantity: number;
};

function OrderLayout() {
  const [open, setOpen] = useState<"sidebar" | "cart" | null>(null);
  const [buffets, setBuffets] = useState<Buffet[]>([]);
  const [sets, setSets] = useState<Set[]>([]);
  const [monLe, setMonLe] = useState<Set[]>([
    {
      id: "1",
      name: "Gọi món trả tiền chỉ từ",
      price: 10000,
      type: "set",
      image: "",
    },
  ]);
  const [doUong, setDoUong] = useState<Item[]>([]);
  const [tab, setTab] = useState<boolean[]>([false, false, false, false]);

  const location = useLocation();

  const hiddenCartSidebarRoutes = ["/menu"];

  const hideCartSidebar = hiddenCartSidebarRoutes.includes(location.pathname);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [itemsAndCategories, setItemsAndCategories] = useState<ItemWithCategory[]>([]);

  const [selectedItem, setSelectedItem] = useState<Set | Buffet | Item>(
    {} as Set | Buffet | Item
  );

  const [foodItemSelected, setFoodItemSelected] = useState<ItemWithQuantity[]>(() => {
    const stored = localStorage.getItem("foodItemSelected");
    return stored ? JSON.parse(stored) : [];
  });

  const [paymentModal, setPaymentModal] = useState(false)

  useEffect(() => {
    localStorage.setItem("foodItemSelected", JSON.stringify(foodItemSelected));
  }, [foodItemSelected]);

  const addFoodItem = (item: Item) => {
    setFoodItemSelected(prev => {
      const existingIndex = prev.findIndex(i => i.item.id === item.id);
  
      if (existingIndex !== -1) {        
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1
        };
        return updated;
      }
  
      return [...prev, { item, quantity: 1 }];
    });
  };
  
  
  const removeFoodItem = (id: number) => {
    setFoodItemSelected(prev =>
      prev
        .map(i => {
          if (i.item.id === id) {
            if (i.quantity === 1) return null;
            return {
              ...i,
              quantity: i.quantity - 1,
            };
          }
          return i;
        })
        .filter(i => i !== null)
    );
  };
  
  const clearFoodItems = () => setFoodItemSelected([]);
  

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

  useEffect(() => {
    const fetchDoUong = async () => {
      const res = await getItems(1, 99, "", "3", "", "");
      setDoUong(res.data.map((s: Item) => ({ ...s, type: "item" })));
    };
    fetchDoUong();
  }, []);

  return (
    <OrderLayoutContext.Provider value={{
      foodItemSelected,
      addFoodItem,
      removeFoodItem,
      clearFoodItems,
      selectedItem,
      paymentModal,
      setPaymentModal,
    }}>
      <div className="flex h-screen overflow-hidden">
        <OrderModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          item={selectedItem}
        />
      { <ToggleSidebar
          open={open}
          setOpen={setOpen}
          buffets={buffets}
          sets={sets}
          monLe={monLe}
          doUong={doUong}
          tab={tab}
          setTab={setTab}
          itemsAndCategories={itemsAndCategories}
        />}
        {!hideCartSidebar && <ToggleCartSidebar open={open} setOpen={setOpen} />}

        <div className="flex-1 flex flex-col">
          <Header
            open={open}
            setOpen={setOpen}
            hideCartSidebar={hideCartSidebar}
          />

          <main className="relative flex-1 h-full w-full overflow-y-auto bg-gray-900">
            <div className="flex h-full w-full">
            <Outlet
              context={{
                buffets,
                sets,
                monLe,
                doUong,
                tab,
                setIsModalOpen,
                setSelectedItem,
                setIsDetailModalOpen,
                itemsAndCategories,
                setItemsAndCategories,
              }}
            />
            </div>
            <DetailModal
              isOpen={isDetailModalOpen}
              onClose={() => {
                setSelectedItem({} as Set | Buffet | Item);
                setIsDetailModalOpen(false);
              }}
              item={selectedItem}
            />
          </main>
          <div className="flex justify-end bg-black h-16 text-white"></div>
        </div>
      </div>
      </OrderLayoutContext.Provider>
  );
}

export default OrderLayout;
