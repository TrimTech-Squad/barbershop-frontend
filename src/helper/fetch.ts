import axios, { AxiosError, AxiosRequestConfig } from "axios";

export default async function fetchApi(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  data?: Record<string, unknown>,
  config?: AxiosRequestConfig
) {
  try {
    const res = await axios({
      method: method,
      url: import.meta.env.VITE_BASE_API_URL + url,
      data: JSON.stringify(data),
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
      ...config,
    });
    return res.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      if (err.response?.status === 401) {
        localStorage.removeItem("user");
      }
    }
    throw (err as AxiosError).response?.data;
  }
}
