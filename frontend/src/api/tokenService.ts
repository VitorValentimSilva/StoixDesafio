import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
  return "";
}

api.interceptors.request.use(async (config) => {
  if (
    config.method === "post" ||
    config.method === "put" ||
    config.method === "delete"
  ) {
    let csrfToken = getCookie("XSRF-TOKEN");

    if (!csrfToken) {
      const { data } = await api.get("/csrf-token");
      csrfToken = data.csrfToken;
    }

    config.headers["X-CSRF-Token"] = csrfToken;
  }

  return config;
});

export default api;
