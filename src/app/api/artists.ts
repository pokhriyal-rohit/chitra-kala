import client from "./client";

export const fetchArtists = async (params = {}) => {
  const { data } = await client.get("/artists", { params });
  return Array.isArray(data) ? data : data.data || data;
};

export const fetchArtist = async (id: string) => {
  const { data } = await client.get(`/artists/${id}`);
  return data.data || data;
};

export const followArtist = async (id: string) => {
  const { data } = await client.post(`/artists/${id}/follow`);
  return data.data || data;
};
