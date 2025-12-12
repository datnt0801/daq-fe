import axios from "axios";
import type { Table } from "../../shared/types/common";

const API_URL = `${import.meta.env.VITE_BASE_API_URL}/admin/table`;

export const getTables = async (status: string, floor: string) => {
  const res = await axios.get(
    `${API_URL}?page=1&size=99&order=ASC${
      status === "" ? "" : `&status=${status}`
    }${floor === "" ? "" : `&floor=${floor}`}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return res.data.data;
};

export const addTable = async (table: Table) => {
  const res = await axios.post(
    `${API_URL}`,
    {
      name: table.name,
      status: "Available",
      capacity: table.capacity,
      floor: table.floor,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return res.data;
};

export const updateTable = async (id: number, table: Table) => {
  const res = await axios.put(
    `${API_URL}/${id}`,
    {
      name: table.name,
      status: "Available",
      capacity: table.capacity,
      floor: table.floor,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return res.data;
};

export const deleteTable = async (id: number) => {
  const res = await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.data;
};
