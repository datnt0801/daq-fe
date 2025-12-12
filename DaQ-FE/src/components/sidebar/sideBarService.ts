import axios from "axios";

const API_URL = `${import.meta.env.VITE_BASE_API_URL}/auth/sign-out`;

export function signout() {
  axios
    .post(
      API_URL,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )

    .then(() => {
      console.log("Sign out successfully");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/";
    });
}
