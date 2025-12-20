import ItemCart from "../../components/Menu/ItemCart";
import { useEffect, useState } from "react";
import {
  getItems,
  addItem,
  updateItem,
  deleteItem,
} from "../../components/Menu/menuService";
import type { Item } from "../../shared/types/common";
import { useQueryState } from "nuqs";
import { MenuModal } from "../../components/Menu/MenuModal";

const MenuPage = () => {
  const [items, setItems] = useState<Item[]>([]);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [totalPages, setTotalPages] = useState(1);

  const [id, setId] = useState("");
  const [category, setCategory] = useState("4");
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const [sort, setSort] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Item>({
    id: 0,
    name: "",
    categoryId: 0,
    price: 0,
    description: "",
    image: "",
    type: "item",
  });

  const fetchItems = async () => {
    const res = await getItems(page, pageSize, id, category, search, sort);
    setItems(res.data);
    setTotalPages(Math.ceil(res.total / pageSize));
  };

  useEffect(() => {
    fetchItems();
  }, [page, pageSize, id, category, search, sort]);

  const handleAddEdit = async (data: Item) => {
    if (editingItem.id !== 0) await updateItem(editingItem.id, data);
    else await addItem(data);
    setModalOpen(false);
    setEditingItem({
      id: 0,
      name: "",
      categoryId: 0,
      price: 0,
      description: "",
      image: "",
      type: "item",
    });
    fetchItems();
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure?")) {
      await deleteItem(id);
      fetchItems();
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="sticky top-0 z-10 bg-gray-100">
        <h1 className="text-xl font-bold m-2">Quản lý món</h1>
        <button
          className="px-4 py-2 border rounded hover:bg-gray-100 font-semibold focus:bg-gray-100 focus:underline m-2"
          onClick={() => {
            setEditingItem({
              id: 0,
              name: "",
              categoryId: 0,
              price: 0,
              description: "",
              image: "",
              type: "item",
            });
            setModalOpen(true);
          }}
        >
          Thêm món
        </button>
        <div className="flex justify-between gap-1 m-2 ">
          <div className="flex gap-2 mt-2">
            <input
              type="text"
              placeholder="Tim kiếm..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border p-2 rounded"
            />
            {/* <button className="px-4 py-2 border rounded hover:bg-gray-100 font-semibold focus:bg-gray-100 focus:underline">
              Tim
            </button> */}
          </div>
          <div className="flex gap-2 mt-2">
            {/* <button
              onClick={() => setCategory("1")}
              className="px-4 py-2 border rounded  hover:bg-red-100 font-semibold focus:bg-red-100 focus:underline"
            >
              Món lẻ
            </button>

            <button
              onClick={() => setCategory("2")}
              className="px-4 py-2 border rounded hover:bg-red-100 font-semibold focus:bg-red-100 focus:underline"
            >
              Buffet
            </button> */}
            {/* <button
              onClick={() => setCategory("3")}
              className="px-4 py-2 border rounded hover:bg-red-100 font-semibold focus:bg-red-100 focus:underline"
            >
              Đồ uống
            </button> */}
            <button
              onClick={() => setCategory("4")}
              className="px-4 py-2 border rounded hover:bg-red-100 font-semibold focus:bg-red-100 focus:underline"
            >
              Lẩu
            </button>
            <button
              onClick={() => setCategory("5")}
              className="px-4 py-2 border rounded hover:bg-red-100 font-semibold focus:bg-red-100 focus:underline"
            >
              Heo
            </button>
            {/* <button
              onClick={() => setCategory("6")}
              className="px-4 py-2 border rounded hover:bg-red-100 font-semibold focus:bg-red-100 focus:underline"
            >
              Cừu
            </button> */}
            <button
              onClick={() => setCategory("7")}
              className="px-4 py-2 border rounded hover:bg-red-100 font-semibold focus:bg-red-100 focus:underline"
            >
              Bò
            </button>
          </div>
        </div>
      </div>

      {/* <MenuSearchFilter /> */}
      <div className="flex justify-center flex-wrap gap-4 p-2">
        {items.map((item) => (
          <ItemCart
            key={item.id}
            item={item}
            onEdit={(item) => {
              setEditingItem(item);
              setModalOpen(true);
            }}
            onDelete={(id) => {
              handleDelete(id);
            }}
            onClick={() => {
              setEditingItem(item);
              setModalOpen(true);
            }}
          />
        ))}
      </div>

      <MenuModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingItem({
            id: 0,
            name: "",
            categoryId: 0,
            price: 0,
            description: "",
            image: "",
            type: "item",
          });
          fetchItems();
        }}
        onSubmit={handleAddEdit}
        item={editingItem}
      />
    </div>
  );
};

export default MenuPage;
