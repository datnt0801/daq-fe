import axios from "axios";
import type { Item } from "../../shared/types/common";

const API_URL = `${import.meta.env.VITE_BASE_API_URL}/admin/food-item`;
const BASE_URL = `${import.meta.env.VITE_BASE_API_URL}`;

export const getItems = async (
  page: number,
  pageSize: number,
  id: string,
  category: string,
  name: string,
  sort: string
) => {
  const res = await axios.get(
    API_URL +
      `?page=${page}&size=${pageSize}
      ${id === "" ? "" : `&id=${id}`}
      ${category === "" ? "" : `&foodCategoryId=${category}`}
      ${name === "" ? "" : `&name=${name}`}
      ${sort === "" ? "" : `&order=${sort}`}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return res.data;
};

export const addItem = async (item: Item): Promise<Item> => {
  const res = await axios.post(
    API_URL,
    {
      name: item.name,
      price: Number(item.price),
      description: item.description,
      foodCategoryId: Number(item.categoryId),
      image: item.image,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return res.data;
};

export const updateItem = async (id: number, item: Item): Promise<Item> => {
  const res = await axios.put(
    `${API_URL}/${id}`,
    {
      name: item.name,
      price: Number(item.price),
      description: item.description,
      foodCategoryId: Number(item.categoryId),
      image: item.image,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return res.data;
};

export const deleteItem = async (id: number): Promise<Item> => {
  const res = await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.data;
};

export const getItemsAndCategories = async (type: string, id: string) => {
  const res = await axios.get(
    BASE_URL +
      `/menu/categories/type/${type}/menu/${id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return res.data;
};

