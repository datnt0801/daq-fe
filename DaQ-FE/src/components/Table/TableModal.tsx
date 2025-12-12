import React, { useState, useEffect } from "react";
import type { Table } from "../../shared/types/common";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Table) => void;
  item?: Table;
}

export const TableModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  item,
}) => {
  const [form, setForm] = useState<Table>({
    id: 0,
    name: "",
    status: "Available",
    capacity: 0,
    floor: 0,
  });

  useEffect(() => {
    if (item) setForm(item);
    else
      setForm({
        id: 0,
        name: "",
        status: "Available",
        capacity: 0,
        floor: 0,
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
          {item?.id !== 0 ? "Edit Table" : "Add Table"}
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
              Name
            </label>
          </div>

          <div className="relative mt-4">
            <input
              id="capacity"
              type="number"
              value={form.capacity}
              onChange={(e) =>
                setForm({ ...form, capacity: Number(e.target.value) })
              }
              placeholder="Capacity"
              className="peer w-full rounded-md border border-gray-300 bg-transparent p-2 text-gray-900 placeholder-transparent focus:border-blue-500 focus:outline-none"
            />
            <label
              htmlFor="capacity"
              className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all
               peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
               peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500 peer-focus:bg-white"
            >
              Capacity
            </label>
          </div>

          <div className="relative mt-4">
            <input
              id="floor"
              type="number"
              value={form.floor}
              onChange={(e) =>
                setForm({ ...form, floor: Number(e.target.value) })
              }
              placeholder="Floor"
              className="peer w-full rounded-md border border-gray-300 bg-transparent p-2 text-gray-900 placeholder-transparent focus:border-blue-500 focus:outline-none"
            />
            <label
              htmlFor="floor"
              className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all
               peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
               peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500 peer-focus:bg-white"
            >
              Floor
            </label>
          </div>

          <div className="flex justify-end gap-2 mt-2">
            <button
              className="px-3 py-1 border"
              onClick={onClose}
              type="button"
            >
              Cancel
            </button>
            <button className="px-3 py-1 bg-blue-500 text-white" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
