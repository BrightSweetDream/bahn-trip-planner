import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://v5.db.transport.rest",
});

export default axiosInstance;
