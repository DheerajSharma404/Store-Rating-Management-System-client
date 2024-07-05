import axios from "axios";
const baseURL =
  "https://store-rating-management-system-server.onrender.com/api/v1/rating";

export const createRating = async ({ rating }) => {
  try {
    const reqURL = `${baseURL}/create-rating/6687418db131a4dcca86a0b5`;
    const token = localStorage.getItem("x-access-token");
    axios.defaults.headers.common["x-access-token"] = token;
    const response = await axios.post(reqURL, {
      rating,
    });
    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
};
