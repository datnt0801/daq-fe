// /src/pages/admin/staff.tsx
import React, { useEffect, useRef, useState } from "react";
import type { Staff } from "../../shared/types/common";
import { StaffTable } from "../../components/Staff/StaffTable";
import { StaffModal } from "../../components/Staff/StaffModal";
import {
  getStaffs,
  addStaff,
  updateStaff,
  deleteStaff,
} from "../../components/Staff/staffService";
import { Plus } from "lucide-react";
import { useQueryState } from "nuqs";
import StaffSearchFilter from "../../components/Staff/StaffSearchFilter";

const AdminStaffPage = () => {
  const [staffs, setStaffs] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<Staff>({
    id: 0,
    name: "",
    email: "",
    status: "",
    userType: "STAFF",
  });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState("");

  const fetchStaffs = async () => {
    setLoading(true);
    const res = await getStaffs(page, pageSize, search, status, sort);
    setStaffs(res.data);
    setTotalPages(Math.ceil(res.total / pageSize));

    setLoading(false);
  };

  useEffect(() => {
    fetchStaffs();
  }, [page, pageSize, search, status, sort]);

  const handleAddEdit = async (data: Staff) => {
    if (editingStaff.id !== 0) await updateStaff(editingStaff.id, data);
    else await addStaff(data);
    setModalOpen(false);
    setEditingStaff({
      id: 0,
      name: "",
      email: "",
      status: "",
      userType: "STAFF",
    });
    fetchStaffs();
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure?")) {
      await deleteStaff(id);
      fetchStaffs();
    }
  };

  const inputRef = useRef<HTMLInputElement>(null!);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Staff Management</h1>

      <button
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded flex items-center gap-2"
        onClick={() => {
          setEditingStaff({
            id: 0,
            name: "",
            email: "",
            status: "",
            userType: "STAFF",
          });
          setModalOpen(true);
        }}
      >
        <Plus size={16} />
        Add Staff
      </button>

      <StaffSearchFilter
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        sort={sort}
        setSort={setSort}
        pageSize={pageSize}
        setPageSize={setPageSize}
        inputRef={inputRef}
      />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <StaffTable
          data={staffs}
          onEdit={(staff) => {
            setEditingStaff(staff);
            setModalOpen(true);
          }}
          onDelete={handleDelete}
          page={page}
          pageSize={pageSize}
          totalPages={totalPages}
          setPage={setPage}
          setPageSize={setPageSize}
          setSearch={setSearch}
          setStatus={setStatus}
          setSort={setSort}
          search={search}
          status={status}
          sort={sort}
        />
      )}
      <StaffModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingStaff({
            id: 0,
            name: "",
            email: "",
            status: "",
            userType: "STAFF",
          });
        }}
        onSubmit={handleAddEdit}
        staff={editingStaff}
      />
    </div>
  );
};

export default AdminStaffPage;
