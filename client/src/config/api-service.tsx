import axios from "axios";
import { BASE_API } from "./index";

const apiService = axios.create({
  baseURL: BASE_API,
  headers: {
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Expires: "0",
  },
});

// Console.log All Request, Request error & Response, Response error
apiService.interceptors.request.use(
  (request) => {
    return request;
  },
  function (error) {
    return Promise.reject(error);
  }
);

apiService.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    const message = error.response?.data?.message || "Unknown";
    return Promise.reject({ message });
  }
);

export default apiService;
