import React, { useState, useEffect } from "react";
import type { Item } from "../../shared/types/common";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Item) => void;
  item?: Item;
}

export const MenuModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  item,
}) => {
  const [form, setForm] = useState<Item>({
    id: 0,
    name: "",
    categoryId: 0,
    price: 0,
    description: "",
    image: "",
    type: "item",
  });

  useEffect(() => {
    if (item) setForm(item);
    else
      setForm({
        id: 0,
        name: "",
        categoryId: 0,
        price: 0,
        description: "",
        image: "",
        type: "item",
      });
  }, [item]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-white/10 backdrop-blur-sm flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white p-4 rounded w-96"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold mb-4">
          {item?.id !== 0 ? "Edit Menu" : "Add Menu"}
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(form);
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative mt-4">
            <input
              id="name"
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Name"
              className="peer w-full rounded-md border border-gray-300 bg-transparent p-2 text-gray-900 placeholder-transparent focus:border-blue-500 focus:outline-none"
            />
            <label
              htmlFor="name"
              className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all
               peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
               peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500 peer-focus:bg-white"
            >
              Tên món
            </label>
          </div>

          <div className="relative mt-4">
            <select
              id="categoryId"
              value={form.categoryId}
              onChange={(e) =>
                setForm({ ...form, categoryId: Number(e.target.value) })
              }
              className="peer w-full rounded-md border border-gray-300 bg-transparent p-2 text-gray-900
                        focus:border-blue-500 focus:outline-none"
            >
              <option value="" disabled hidden />
              <option value={4}>Lẩu</option>
              <option value={5}>Heo</option>
              <option value={7}>Bò</option>
            </select>

            <label
              htmlFor="categoryId"
              className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all
                        peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500
                        peer-[&:not([value=''])]:-top-2.5
                        peer-[&:not([value=''])]:text-sm"
            >
              Loại món
            </label>
          </div>


          <div className="relative mt-4">
            <input
              id="price"
              type="text"
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: Number(e.target.value) })
              }
              placeholder="Giá"
              className="peer w-full rounded-md border border-gray-300 bg-transparent p-2 text-gray-900 placeholder-transparent focus:border-blue-500 focus:outline-none"
            />
            <label
              htmlFor="price"
              className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all
               peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
               peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500 peer-focus:bg-white"
            >
              Giá
            </label>
          </div>

          <div className="relative mt-4">
            <input
              id="description"
              type="text"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="Mô tả"
              className="peer w-full rounded-md border border-gray-300 bg-transparent p-2 text-gray-900 placeholder-transparent focus:border-blue-500 focus:outline-none"
            />
            <label
              htmlFor="description"
              className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all
               peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
               peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500 peer-focus:bg-white"
            >
              Mô tả
            </label>
          </div>

          <div className="relative mt-4">
            <input
              id="image"
              type="text"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              placeholder="Image"
              className="peer w-full rounded-md border border-gray-300 bg-transparent p-2 text-gray-900 placeholder-transparent focus:border-blue-500 focus:outline-none"
            />
            <label
              htmlFor="image"
              className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all
               peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
               peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500 peer-focus:bg-white"
            >
              Hình ảnh
            </label>
          </div>
          <div className="flex justify-end gap-2 mt-2">
            <button
              className="px-3 py-1 border"
              onClick={onClose}
              type="button"
            >
              Hủy
            </button>
            <button className="px-3 py-1 bg-blue-500 text-white" type="submit">
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
