import { ChefHat } from "lucide-react"
import { useState } from "react"
import { useAdminLayout } from "../../context/AdminLayoutContext";
import SetMenuModal from "../../components/Setmenu/SetmenuModal";
import type { Buffet, Set } from "../../shared/types/common";
import { getSets, getBuffets } from "../../components/Order/orderService";
import { useEffect } from "react";
import { addSetBuffet, deleteSetBuffet, updateSetBuffet } from "../../components/Setmenu/setmenuService";

interface MenuCartProps {
  name: string;
  price: number;
  description: string;
  image: string;
  item: Set | Buffet;
  handleEditItem: (item: Set | Buffet) => void;
  handleDeleteItem: (item: Set | Buffet) => void;
}

function MenuCart({name, price, description, image, item, handleEditItem, handleDeleteItem}: MenuCartProps) {
  return (
    <div className="flex gap-2 bg-gray-100 w-[calc(33.33%-10px)] h-[calc(33.33%-10px)] shadow-lg rounded-lg border
     hover:bg-gray-200 cursor-pointer">
      <div className="w-3/4">
        <img src={image} className="w-full h-full object-cover" alt="" />
      </div>
      <div className="w-1/4 flex flex-col gap-2 mr-2 justify-around">
        <div className="flex flex-col gap-2">
          <h1>{name}</h1>
          <p>{description}</p>
          <p>{price} </p>
        </div>
        <div className="flex flex-col gap-2">
          <button onClick={() => handleEditItem(item)} className="bg-blue-500 text-white rounded">Sửa</button>
          <button onClick={() => handleDeleteItem(item)} className="bg-red-500 text-white rounded">Xóa</button>
        </div>
      </div>
      
    </div>
  )
}

function SetMenu() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Set | Buffet >({
    id: 0,
    name: "",
    price: 0,
    description: "",
    image: "",
    type: "set",
  });

  const [refresh, setRefresh] = useState(false);

  const {Sets,Buffets,setSets,setBuffets} = useAdminLayout();
  const [filter, setFilter] = useState<"buffet"|"set"|"all">("all")

  useEffect(() => {
    const fetchSets = async () => {
      const res = await getSets();
      setSets(res.map((s) => ({ ...s, type: "set" })));
    };
    fetchSets();
  }, [refresh]);

  useEffect(() => {
    const fetchBuffets = async () => {
      const res = await getBuffets();
      setBuffets(res.map((b) => ({ ...b, type: "buffet" })));
    };
    fetchBuffets();
  }, [refresh]);

  const handleAddEditItem = async (item: Set | Buffet) => {

    if (item.type === "buffet") {
      if (selectedItem.id !== 0) {
        await updateSetBuffet(selectedItem.id, item);
        setBuffets((prev: Buffet[]) =>
          prev.map((s) => (s.id === selectedItem.id ? { ...s, ...item } : s))
        );
      } else {
        const newItem = await addSetBuffet(item);
        setBuffets((prev: Buffet[]) => [...prev, newItem]);
      }
      setIsModalOpen(false);
      setSelectedItem({
        id: 0,
        name: "",
        price: 0,
        description: "",
        image: "",
        type: "set",
      });
      setRefresh(!refresh);
    }
    if (item.type === "set") {
      if (selectedItem.id !== 0) {
        await updateSetBuffet(selectedItem.id, item);
        setSets((prev: Set[]) =>
          prev.map((s) => (s.id === selectedItem.id ? { ...s, ...item } : s))
        );
      } else {
        const newItem = await addSetBuffet(item);
        setSets((prev: Set[]) => [...prev, newItem]);
      }
      setIsModalOpen(false);
      setSelectedItem({
        id: 0,
        name: "",
        price: 0,
        description: "",
        image: "",
        type: "set",
      });
      setRefresh(!refresh);
    }
  };

  const handleDeleteItem = async (item: Set | Buffet) => {
    await deleteSetBuffet(item);
    setRefresh(!refresh);
  };

  return (
    <div className="flex flex-col bg-white h-full w-full shadow-lg">
      <SetMenuModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleAddEditItem} item={selectedItem} />
      <div className="flex flex-col gap-2 p-2">
        <div className="flex items-center p-2"> 
          <ChefHat></ChefHat>
          <h1><b>Quản lý set menu Buffet</b></h1>
        </div>
        <button className="bg-blue-500 text-white p-2 rounded w-28" onClick={() => {
          setIsModalOpen(true);
          setSelectedItem({
            id: 0,
            name: "",
            price: 0,
            description: "",
            image: "",
            type: "set",
          });
        }}>+ Thêm</button>
         <div className="flex">
          <button className="p-2 rounded-lg border bg-purple-600 text-white shadow-lg hover:bg-purple-700 w-28" onClick={() => setFilter("all")}>All</button>
          <button className="p-2 rounded-lg border bg-purple-600 text-white shadow-lg hover:bg-purple-700 w-28" onClick={() => setFilter("buffet")}>Buffet</button>
          <button className="p-2 rounded-lg border bg-purple-600 text-white shadow-lg hover:bg-purple-700 w-28" onClick={() => setFilter("set")}>Set</button>
         </div>
         {/* <div className="flex justify-start">
          <input type="text" placeholder="Search" className="p-2 rounded-lg border" />
         </div> */}
      </div>
      <div className="flex flex-wrap flex-1 overflow-y-auto border-t border-gray-200 gap-2">
         {filter === "all" || filter === "set" ? Sets.map((s) => (
            <MenuCart key={s.id} name={s.name} price={s.price} description={s.description} image={s.image} item={s} handleEditItem={(item) => {handleAddEditItem(item);
              setIsModalOpen(true);
              setSelectedItem(item);
            }} handleDeleteItem={(item) => handleDeleteItem(item)} />
         )): null}
         {filter === "all" || filter === "buffet" ? Buffets.map((b) => (
            <MenuCart key={b.id} name={b.name} price={b.price} description={b.description} image={b.image} item={b} handleEditItem={(item) => {handleAddEditItem(item);
              setIsModalOpen(true);
              setSelectedItem(item);
            }} handleDeleteItem={(item) => handleDeleteItem(item)} />
         )): null}
      </div>
    </div>
  )
}

export default SetMenu
