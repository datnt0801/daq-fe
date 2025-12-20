import React, { useState, useEffect } from "react";
import type { Set, Buffet } from "../../shared/types/common";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Set | Buffet) => void;
  item?: Set | Buffet;
}

export const SetMenuModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  item,
}) => {
  const [form, setForm] = useState<Set | Buffet>({
    id: 0,
    name: "",
    price: 0,
    description: "",
    image: "",
    type: "set",
  });

  useEffect(() => {
    if (item) setForm(item);
    else
      setForm({
        id: 0,
        name: "",
        price: 0,
        description: "",
        image: "",
        type: "set",
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
          {item?.id !== 0 ? "Sửa Menu" : "Thêm Menu"}
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
              placeholder="Tên"
              className="peer w-full rounded-md border border-gray-300 bg-transparent p-2 text-gray-900 placeholder-transparent focus:border-blue-500 focus:outline-none"
            />
            <label
              htmlFor="name"
              className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all
               peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
               peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500 peer-focus:bg-white"
            >
              Tên
            </label>
          </div>

          <div className="relative mt-4">
            <input
              id="price"
              type="number"
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
              placeholder="URL Hình ảnh"
              className="peer w-full rounded-md border border-gray-300 bg-transparent p-2 text-gray-900 placeholder-transparent focus:border-blue-500 focus:outline-none"
            />
            <label
              htmlFor="image"
              className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all
               peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
               peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500 peer-focus:bg-white"
            >
              URL Hình ảnh
            </label>
          </div>

          <div className="mt-4">
            <p className="mb-2 text-sm text-gray-600">Loại</p>
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="type"
                  value="set"
                  checked={form.type === "set"}
                  onChange={() => setForm({ ...form, type: "set" })}
                />
                Set
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="type"
                  value="buffet"
                  checked={form.type === "buffet"}
                  onChange={() => setForm({ ...form, type: "buffet" })}
                />
                Buffet
              </label>
            </div>
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

export default SetMenuModal;