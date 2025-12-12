import axios from "axios";
import type { Buffet, Set, Item } from "../../shared/types/common";
import type { ItemWithQuantity } from "../../layout/OrderLayout";

const API_URL = `${import.meta.env.VITE_BASE_API_URL}`;

export const verifyEmail = async (code: string, token: string) => {
  const res = await axios.post(`${API_URL}/auth/verify-email`, 
    {
      verifyToken: code,
    },
    {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  return res.data;
}

// export const getBuffets = async (): Promise<Buffet[]> => {
//   const res = await axios.get(`${API_URL}/menu/buffets`);
//   return res.data;
// };

// export const getSets = async (): Promise<Set[]> => {
//   const res = await axios.get(`${API_URL}/menu/sets`);
//   return res.data;
// };

// export const getItemsByBuffetId = async (buffetId: string): Promise<Item[]> => {
//   const res = await axios.get(`${API_URL}/menu/items/buffet/${buffetId}`);
//   return res.data;
// };

// export const getItemsBySetId = async (setId: string): Promise<Item[]> => {
//   const res = await axios.get(`${API_URL}/menu/items/set/${setId}`);
//   return res.data;
// };

// export const createOrder = async (item: Set | Buffet | Item) => {
//   const data = {
//     "user_id": JSON.parse(localStorage.getItem("user")!).id,
//     "table_id": localStorage.getItem("tableId")! || 1, 
//     "type": item.type.toUpperCase(),
//     "type_id": item.id,
//     "status": "UNPAID",
//     "payment_method": "CASH"
//   }
//   const res = await axios.post(`${API_URL}/menu/order`, data,{
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("token")}`,
//     },
//   });
//   return res.data;
// }

// export const getItemsByOrderId = async (orderId: string): Promise<(ItemWithQuantity& {status: string})[]> => {
//   const res = await axios.get(`${API_URL}/menu/items/order/${orderId}`);
//   return res.data;
// }

