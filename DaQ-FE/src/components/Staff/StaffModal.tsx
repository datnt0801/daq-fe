// /src/components/Staff/StaffModal.tsx
import React, { useState, useEffect } from "react";
import type { Staff } from "../../shared/types/common";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Staff) => void;
  staff?: Staff;
}

export const StaffModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  staff,
}) => {
  const [form, setForm] = useState<Staff>({
    id: 0,
    name: "",
    email: "",
    status: "Active",
    userType: "Staff",
  });

  useEffect(() => {
    if (staff) setForm(staff);
    else
      setForm({
        id: 0,
        name: "",
        email: "",
        status: "Active",
        userType: "Staff",
      });
  }, [staff]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-white/10 backdrop-blur-sm flex justify-center items-center"
      onClick={onClose}
    >
      <div className="bg-white p-4 rounded w-96">
        <h2 className="text-lg font-bold mb-4">
          {staff?.id !== 0 ? "Edit Staff" : "Add Staff"}
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(form);
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <input
            className="w-full border p-2 mb-2"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            className="w-full border p-2 mb-2"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <div className="flex justify-end gap-2">
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
