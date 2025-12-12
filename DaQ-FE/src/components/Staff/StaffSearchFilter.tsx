import React, { useRef, useState } from "react";
import { Search } from "lucide-react";

interface StaffSearchFilterProps {
  search: string;
  setSearch: (search: string) => void;
  status: string;
  setStatus: (status: string) => void;
  sort: string;
  setSort: (sort: string) => void;
  pageSize: number;
  setPageSize: (pageSize: number) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

export default function StaffSearchFilter({
  search,
  setSearch,
  status,
  setStatus,
  sort,
  setSort,
  pageSize,
  setPageSize,
  inputRef,
}: StaffSearchFilterProps) {
  const [inputSearch, setInputSearch] = useState(search);

  return (
    <div className="flex gap-4 items-center mb-4">
      <form
        className="flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          setSearch(inputSearch);
          console.log("check submit");
          inputRef.current?.focus();
        }}
      >
        <input
          type="text"
          placeholder="Search name or email..."
          value={inputSearch}
          onChange={(e) => setInputSearch(e.target.value)}
          ref={inputRef}
          className="border p-2 rounded"
        />
        <button className="border p-2 rounded" type="submit">
          <Search />
        </button>
      </form>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">All Status</option>
        <option value="Active">Active</option>
        <option value="Blocked">Blocked</option>
      </select>
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value || "")}
        className="border p-2 rounded ml-auto"
      >
        <option value="ASC">ASC</option>
        <option value="DESC">DESC</option>
      </select>
      <select
        value={pageSize}
        onChange={(e) => setPageSize(Number(e.target.value))}
        className="border p-2 rounded ml-auto"
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
  );
}
