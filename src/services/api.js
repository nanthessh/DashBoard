import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5209/api", // your backend base URL
});

// ✅ Add named exports
export const registerUser = (user) => api.post("/auth/register", user);
export const loginUser = (user) => api.post("/auth/login", user);

export default api;
