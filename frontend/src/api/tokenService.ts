import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

api.interceptors.request.use(async (config) => {
  if (
    config.method === "post" ||
    config.method === "put" ||
    config.method === "delete"
  ) {
    let csrfToken = localStorage.getItem("csrfToken");

    if (!csrfToken) {
      const { data } = await api.get("/csrf-token");
      csrfToken = data.csrfToken;
      localStorage.setItem("csrfToken", csrfToken ?? "");
    }

    config.headers["X-CSRF-Token"] = csrfToken;
  }

  return config;
});

export default api;
