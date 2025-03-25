import axios from "axios";
import studiesAPI from "./studies.api";

const baseURL = import.meta.env.VITE_API_SERVER_BASE_URL;

export const apiClient = axios.create({ baseURL });

const API = {
  studies: studiesAPI,
};

export default API;
