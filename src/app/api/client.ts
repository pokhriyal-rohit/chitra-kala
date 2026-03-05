import axios from "axios";
import { API_BASE } from "../config/api";

const client = axios.create({
  baseURL: `${API_BASE}/api`,
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem("chitrakala_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default client;
