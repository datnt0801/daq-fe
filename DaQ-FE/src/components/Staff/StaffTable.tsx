// /src/components/Staff/StaffTable.tsx
import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
} from "@tanstack/react-table";
import { ChevronUp, ChevronDown, Search } from "lucide-react";
import type { Staff } from "../../shared/types/common";
import StaffSearchFilter from "./StaffSearchFilter";

interface TableProps {
  data: Staff[];
  onEdit: (staff: Staff) => void;
  onDelete: (id: number) => void;
  page: number;
  pageSize: number;
  setPageSize: (size: number) => void;
  setPage: (page: number) => void;
  totalPages: number;
  setSearch: (search: string) => void;
  setStatus: (status: string) => void;
  setSort: (sort: string) => void;
  search: string;
  status: string;
  sort: string;
}

export const StaffTable: React.FC<TableProps> = ({
  data,
  onEdit,
  onDelete,
  page,
  pageSize,
  setPageSize,
  setPage,
  totalPages,
  setSearch,
  setStatus,
  setSort,
  search,
  status,
  sort,
}) => {
  const columns: ColumnDef<Staff>[] = useMemo(
    () => [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "name", header: "Name" },
      { accessorKey: "email", header: "Email" },
      { accessorKey: "status", header: "Status" },
      {
        accessorKey: "createdAt",
        header: "Created At",
        cell: (info) =>
          new Date(info.getValue() as string).toLocaleDateString("vi-VN"),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(row.original)}
              className="text-blue-500 hover:underline"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(row.original.id)}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    [onEdit, onDelete]
  );

  const [rowHeight, setRowHeight] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);
  const rowRef = useRef<HTMLTableRowElement>(null);
  const headerRef = useRef<HTMLTableRowElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);
  const [tableHeight, setTableHeight] = useState(0);

  useEffect(() => {
    if (rowRef.current) {
      setRowHeight(rowRef.current.offsetHeight);
    }
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
    if (tableRef.current) {
      setTableHeight(tableRef.current.offsetHeight);
    }
  }, [data]);

  // Filter dữ liệu

  const table = useReactTable({
    data: data,
    columns,
    state: { pagination: { pageIndex: page - 1, pageSize } },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="space-y-4">
      {/* Search + Filter */}
      {/* Table */}
      <div
        className="overflow-x-auto max-h-[500px] h-max border rounded-md"
        style={{
          minHeight: rowHeight * 10 + headerHeight - 6,
        }}
      >
        <table
          className="min-w-full h-full border border-gray-200 rounded-md"
          ref={tableRef}
        >
          <thead className="bg-gray-100 sticky top-0">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} ref={headerRef}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="p-2 border-b font-semibold text-left cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-1">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, i) => (
              <tr
                key={row.id}
                ref={i === 0 ? rowRef : null} // 👉 chỉ gắn ref cho dòng đầu tiên
                className="hover:bg-gray-50"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-2 border-b">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center gap-2 justify-end mt-4 sticky bottom-0 bg-white py-2 border-t">
        <button
          onClick={() => setPage(1)}
          disabled={page === 1}
          className="border px-2 py-1 rounded disabled:opacity-50"
        >
          {"<<"}
        </button>
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="border px-2 py-1 rounded disabled:opacity-50"
        >
          {"<"}
        </button>
        <span className="mx-2">
          Page <strong>{page}</strong> of <strong>{totalPages}</strong>
        </span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className="border px-2 py-1 rounded disabled:opacity-50"
        >
          {">"}
        </button>
        <button
          onClick={() => setPage(totalPages)}
          disabled={page === totalPages}
          className="border px-2 py-1 rounded disabled:opacity-50"
        >
          {">>"}
        </button>
      </div>
    </div>
  );
};
