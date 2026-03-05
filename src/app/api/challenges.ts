import client from "./client";

export const fetchChallenges = async (params = {}) => {
  const { data } = await client.get("/challenges", { params });
  return Array.isArray(data) ? data : data.data || data;
};

export const fetchChallenge = async (id: string) => {
  const { data } = await client.get(`/challenges/${id}`);
  return data.data || data;
};

export const createChallenge = async (formData: FormData) => {
  const { data } = await client.post("/challenges", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const voteChallenge = async (
  id: string,
  side: "challenger" | "challengee",
) => {
  const { data } = await client.post(`/challenges/${id}/vote`, { side });
  return data.data || data;
};

export const acceptChallenge = async (id: string) => {
  const { data } = await client.post(`/challenges/${id}/accept`);
  return data;
};

export const submitToChallenge = async (id: string, drawingId: string) => {
  const { data } = await client.post(`/challenges/${id}/submit`, { drawingId });
  return data;
};
