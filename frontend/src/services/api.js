import axios from "axios";

const api = axios.create({
  baseURL: "https://biblioteca-freinet.onrender.com",
});

export default api;