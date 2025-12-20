import type { Table } from "../../shared/types/common";

interface TableProps {
  table: Table;
  handleDeleteTable: (table: Table) => void;
  setSelectedTable: (table: Table) => void;
  setIsModalOpen: (open: boolean) => void;
}

const TableCart = ({
  table,
  handleDeleteTable,
  setSelectedTable,
  setIsModalOpen,
}: TableProps) => {
  return (
    <div
      className={`border rounded-2xl w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)] h-48 flex justify-around items-center ${
        table.status === "Available" ? "bg-green-400" : "bg-red-400"
      }`}
    >
      <div className="flex flex-col gap-2 justify-evenly h-full">
        <div>
          <h1>{table.name}</h1>
          <p>
            Trạng thái: {table.status === "Available" ? "Trống" : "Đã có người"}
          </p>
          <p>Sức chứa: {table.capacity} người</p>
          <p>Tầng: {table.floor}</p>
        </div>

        <div className="flex gap-2">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => {
              setSelectedTable(table);
              setIsModalOpen(true);
            }}
          >
            Sửa
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={() => handleDeleteTable(table)}
          >
            Xóa
          </button>
        </div>
      </div>
      <div className=" gap-2">
        <img src={`https://quickchart.io/qr?text=localhost:5173/auth/${table.id}`} alt="QR code" />
      </div>
    </div>
  );
};

export default TableCart;
