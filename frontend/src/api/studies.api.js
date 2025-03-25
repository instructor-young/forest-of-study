import { apiClient } from "./index.api";

async function getStudies() {
  const response = await apiClient.get("/studies");
  const data = response.data;

  return data;
}

const studiesAPI = {
  getStudies,
};

export default studiesAPI;
