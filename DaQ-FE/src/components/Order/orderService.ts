import axios from "axios";
import type { Buffet, Set, Item } from "../../shared/types/common";
import type { ItemWithQuantity } from "../../layout/OrderLayout";

const API_URL = `${import.meta.env.VITE_BASE_API_URL}`;

export const getBuffets = async (): Promise<Buffet[]> => {
  const res = await axios.get(`${API_URL}/menu/buffets`);
  return res.data;
};

export const getSets = async (): Promise<Set[]> => {
  const res = await axios.get(`${API_URL}/menu/sets`);
  return res.data;
};

export const getItemsByBuffetId = async (buffetId: string): Promise<Item[]> => {
  const res = await axios.get(`${API_URL}/menu/items/buffet/${buffetId}`);
  return res.data;
};

export const getItemsBySetId = async (setId: string): Promise<Item[]> => {
  const res = await axios.get(`${API_URL}/menu/items/set/${setId}`);
  return res.data;
};

export const createOrder = async (item: Set | Buffet | Item, numberUser: number) => {
  const data = {
    "user_id": JSON.parse(localStorage.getItem("user")!).id,
    "table_id": localStorage.getItem("tableId") || 1, //TODO: quet qr chua table_id luu vao local storage
    "type": item.type.toUpperCase(),
    "type_id": item.id,
    "status": "UNPAID",
    "payment_method": "CASH",
    "total": numberUser
  }
  const res = await axios.post(`${API_URL}/menu/order`, data,{
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.data;
}

export const getItemsByOrderId = async (orderId: string): Promise<(ItemWithQuantity& {status: string})[]> => {
  const res = await axios.get(`${API_URL}/menu/items/order/${orderId}`);
  return res.data;
}

//http://localhost:8000/api/menu/items/order/15

export const createOrderDetails = async (orderId: string, data: {foodItemId: number, quantity: number}[]) => {
  
  const res = await axios.post(`${API_URL}/menu/order-details/order/${orderId}`, data,{
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.data;
}

export const FEcheckPayment = async (orderId: string) => {
  const res = await axios.post(`${API_URL}/payment/confirm/${orderId}`);
  return res.data;
}

//http://localhost:8000/api/menu/items/order/8
///api/menu/order-details/order/{orderId}
// [
//   {
//     "foodItemId": 40,
//     "quantity": 10
//   },
//   {
//     "foodItemId": 51,
//     "quantity": 5
//   },
//  {
//     "foodItemId": 49,
//     "quantity": 3
//   }
// ]