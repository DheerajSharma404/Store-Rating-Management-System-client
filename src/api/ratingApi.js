import axios from "axios";
const baseURL = "http://localhost:3000/api/v1/rating";

export const createRating = async ({ rating }) => {
  console.log("jellow");
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
