import axios from "axios";

const baseURL = import.meta.env.VITE_SERVER_URL || "http://127.0.0.1:8080";

export const apiClient = axios.create({
  baseURL,
  timeout: 10000
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      error.message = "服务端鉴权已失效，请手动重新授权。";
    } else if (!error.response) {
      error.message = "连接失败，请确认 ssai-server 已启动。";
    }

    return Promise.reject(error);
  }
);
