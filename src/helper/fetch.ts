import axios, { AxiosError, AxiosRequestConfig } from "axios";

export async function fetchApi(options: AxiosRequestConfig) {
  try {
    const res = await axios({
      method: options.method,
      url: import.meta.env.BASE_API_URL + options.url,
      data: JSON.stringify(options.data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response?.status === 401) {
        throw new Error("Unauthorized");
      }
    }
  }
}
