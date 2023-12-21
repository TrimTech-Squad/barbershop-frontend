import axios, { AxiosError, AxiosRequestConfig } from "axios";

export default async function fetchApi(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  data?: Record<string, unknown>,
  config?: AxiosRequestConfig
) {
  console.log(import.meta.env.VITE_BASE_API_URL);
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
    throw (err as AxiosError).response?.data;
  }
}
