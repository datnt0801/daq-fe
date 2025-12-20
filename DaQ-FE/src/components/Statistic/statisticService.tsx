import axios from "axios";

const API_URL = `${import.meta.env.VITE_BASE_API_URL}`;


export const getStatistic = async () => {
    const res = await axios.get(`${API_URL}/menu/statistics`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }); 
    return res.data;
};

  