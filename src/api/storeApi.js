import axios from "axios";
const baseURL =
  "https://store-rating-management-system-server.onrender.com/api/v1/store";

export const createStore = async ({ name, email, address }) => {
  try {
    const reqURL = `${baseURL}/admin-action/create-store`;
    const token = localStorage.getItem("x-access-token");
    axios.defaults.headers.common["x-access-token"] = token;
    const response = await axios.post(reqURL, {
      name,
      email,
      address,
    });
    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
};
