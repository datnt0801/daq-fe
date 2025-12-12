import { Plus } from "lucide-react";
import TableCart from "../../components/Table/TableCart";
import {
  getTables,
  addTable,
  updateTable,
  deleteTable,
} from "../../components/Table/tableService";
import { useEffect, useState } from "react";
import type { Table } from "../../shared/types/common";
import { TableModal } from "../../components/Table/TableModal";

const TablePage = () => {
  const [tables, setTables] = useState<Table[]>([]);
  const [status, setStatus] = useState("");
  const [floor, setFloor] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState<Table>({
    id: 0,
    name: "",
    status: "Available",
    capacity: 0,
    floor: 0,
  });
  const [refresh, setRefresh] = useState(false);

  const handleAddEditTable = async (table: Table) => {
    if (selectedTable.id !== 0) {
      await updateTable(selectedTable.id, table);
      setTables((prev) =>
        prev.map((t) => (t.id === selectedTable.id ? { ...t, ...table } : t))
      );
    } else {
      const newTable = await addTable(table);
      setTables((prev) => [...prev, newTable]);
    }
    setIsModalOpen(false);
    setSelectedTable({
      id: 0,
      name: "",
      status: "Available",
      capacity: 0,
      floor: 0,
    });
    setRefresh(!refresh);
  };

  const handleDeleteTable = async (table: Table) => {
    await deleteTable(table.id);
    setRefresh(!refresh);
  };

  useEffect(() => {
    const fetchTables = async () => {
      const tables = await getTables(status, floor);
      setTables(tables);
    };
    fetchTables();
  }, [status, floor, refresh]);

  return (
    <div className="flex flex-col">
      <div className="sticky top-0 z-10 bg-gray-100 p-2">
        <div>
          <h1 className="text-xl font-bold m-2">Table Management</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mb-4 px-4 py-2 bg-green-500 text-white rounded flex items-center gap-2"
          >
            <Plus size={16} />
            Add Table
          </button>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setFloor("1")}
              className="px-4 py-2 border rounded hover:bg-gray-100 font-semibold focus:bg-gray-100 focus:underline"
            >
              Tầng 1
            </button>
            <button
              onClick={() => setFloor("2")}
              className="px-4 py-2 border rounded hover:bg-gray-100 font-semibold focus:bg-gray-100 focus:underline"
            >
              Tầng 2
            </button>
            <button
              onClick={() => setFloor("3")}
              className="px-4 py-2 border rounded hover:bg-gray-100 font-semibold focus:bg-gray-100 focus:underline"
            >
              Tầng 3
            </button>
            <button
              onClick={() => setFloor("")}
              className="px-4 py-2 border rounded hover:bg-gray-100 font-semibold focus:bg-gray-100 focus:underline"
            >
              Tất cả
            </button>
          </div>
          <div>
            <select
              onChange={(e) => setStatus(e.target.value)}
              className="px-4 py-2 border rounded hover:bg-gray-100 font-semibold focus:bg-gray-100 focus:underline justify-center items-center text-center"
            >
              <option value="">All</option>
              <option value="Available">Available</option>
              <option value="Unavailable">Unavailable</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        {tables.map((table: Table) => (
          <TableCart
            key={table.id}
            table={table}
            handleDeleteTable={handleDeleteTable}
            setSelectedTable={setSelectedTable}
            setIsModalOpen={setIsModalOpen}
          />
        ))}
      </div>
      <TableModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddEditTable}
        item={selectedTable}
      />
    </div>
  );
};

export default TablePage;
