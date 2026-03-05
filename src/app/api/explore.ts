import client from "./client";

export const fetchTrendingHashtags = async () => {
  const { data } = await client.get("/explore/trending-hashtags");
  return Array.isArray(data) ? data : data.data || data;
};

export const fetchCategories = async () => {
  const { data } = await client.get("/explore/categories");
  return Array.isArray(data) ? data : data.data || data;
};
