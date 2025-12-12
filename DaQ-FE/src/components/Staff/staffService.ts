// /src/components/Staff/staffService.ts
import axios from "axios";
import type { Staff } from "../../shared/types/common";

const API_URL = `${import.meta.env.VITE_BASE_API_URL}/admin/staff`;

export const getStaffs = async (
  page: number,
  pageSize: number,
  search?: string,
  status?: string,
  sort?: string
) => {
  try {
    console.log(
      "route",
      `${API_URL}?page=${page}&size=${pageSize}${
        search === "" ? "" : `&search=${search}`
      }${status === "" ? "" : `&status=${status}`}${
        sort === "" ? "" : `&order=${sort}`
      }`
    );
    const res = await axios.get(
      `${API_URL}?page=${page}&size=${pageSize}${
        search === "" ? "" : `&search=${search}`
      }${status === "" ? "" : `&status=${status}`}${
        sort === "" ? "" : `&order=${sort}`
      }`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.log(error);
    return { data: [], total: 0 };
  }
};

export const addStaff = async (data: Staff) => {
  const res = await axios.post(
    `${API_URL}`,
    {
      name: data.name,
      email: data.email,
      userType: "STAFF",
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return res.data;
};

export const updateStaff = async (id: number, data: Staff) => {
  const res = await axios.put(
    `${API_URL}/${id}`,
    {
      name: data.name,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return res.data;
};

export const deleteStaff = async (id: number) => {
  const res = await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.data;
};
