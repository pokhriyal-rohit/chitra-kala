import client from "./client";

export const fetchDrawings = async (params = {}) => {
  const { data } = await client.get("/drawings", { params });
  // Handle both response formats (with and without pagination)
  return Array.isArray(data) ? data : data.data || data;
};

export const fetchDrawing = async (id: string) => {
  const { data } = await client.get(`/drawings/${id}`);
  // Handle both response formats
  return data.data || data;
};

export const uploadDrawing = async (formData: FormData) => {
  const { data } = await client.post("/drawings", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const likeDrawing = async (id: string) => {
  const { data } = await client.post(`/drawings/${id}/like`);
  // Handle both response formats
  return data.data || data;
};

export const addComment = async (id: string, text: string) => {
  const { data } = await client.post(`/drawings/${id}/comments`, { text });
  return data;
};

export const incrementView = async (id: string) => {
  await client.post(`/drawings/${id}/view`);
};
