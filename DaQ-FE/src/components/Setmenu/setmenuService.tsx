import axios from "axios";
import type { Buffet, Set } from "../../shared/types/common";

const API_URL = `${import.meta.env.VITE_BASE_API_URL}`;


export const addSetBuffet = async (item: Set | Buffet) => {
  if (item.type === "buffet") {
    const res = await axios.post(`${API_URL}/menu/buffet`, {
      name: item.name,
      price: item.price,
      description: item.description,
      image: item.image,
      },{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }); 
    return res.data;
  }
  if (item.type === "set") {
    const res = await axios.post(`${API_URL}/menu/set`, {
      name: item.name,
      price: item.price,
      description: item.description,
      image: item.image,
    },{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }); 
    return res.data;
  }
};

export const updateSetBuffet = async (id: number, item: Set | Buffet) => {
  if (item.type === "buffet") {
    const res = await axios.patch(`${API_URL}/menu/buffet/${id}`, {
      name: item.name,
      price: item.price,
      description: item.description,
      image: item.image
    },{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res.data;
  }
  if (item.type === "set") {
    const res = await axios.patch(`${API_URL}/menu/set/${id}`, {
      name: item.name,
      price: item.price,
      description: item.description,
      image: item.image
    },{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res.data;
  }
};

export const deleteSetBuffet = async (item: Set | Buffet) => {
  if (item.type === "buffet") {
    const res = await axios.delete(`${API_URL}/menu/buffet/${item.id}`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res.data;
  }
  if (item.type === "set") {
    const res = await axios.delete(`${API_URL}/menu/set/${item.id}`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res.data;
  }
};
  