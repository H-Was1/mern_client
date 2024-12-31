import axios from "axios";

export const BASE_URL = import.meta.env.VITE_API_URL as string;

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

// New function to generate OpenAI response
export const generateOpenAIResponse = async (prompt: string): Promise<any> => {
  try {
    const { data } = await axios.post<string>(`${BASE_URL}openai/generate`, {
      prompt,
    });
    return data;
  } catch (error: any) {
    throw new Error(
      (error.response?.data?.message as string) ||
        "Failed to fetch response from OpenAI.",
    );
  }
};
