import axios from "axios";

const BASE_URL = "https://server-production-424b.up.railway.app/";

export const fetchItems = async () => {
  const response = await axios.get(`${BASE_URL}items`);
  return response.data;
};

export const addItem = async (name: string, description: string) => {
  const response = await axios.post(`${BASE_URL}items`, { name, description });
  return response.data;
};

export const deleteItem = async (id: string) => {
  await axios.delete(`${BASE_URL}items/${id}`);
};
