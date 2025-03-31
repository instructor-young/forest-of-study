import { apiClient } from "./index.api";

async function getStudies() {
  const response = await apiClient.get("/studies");
  const data = response.data;

  return data;
}

async function getStudy(studyId) {
  const response = await apiClient.get(`/studies/${studyId}`);
  const data = response.data;

  return data;
}

async function createStudy(dto) {
  const response = await apiClient.post("/studies", dto);
  const data = response.data;

  return data;
}

async function checkStudyPassword(studyId, password) {
  const response = await apiClient.post(`/studies/${studyId}/check-password`, {
    password,
  });
  const data = response.data;

  return data;
}

async function updateStudy(studyId, password, dto) {
  const response = await apiClient.put(`/studies/${studyId}`, dto, { headers: { Authorization: password } });
  const data = response.data;

  return data;
}

async function getStudyHabits(studyId, password) {
  const response = await apiClient.get(`/studies/${studyId}/habits`, { headers: { Authorization: password } });
  const data = response.data;

  return data;
}

async function updateStudyHabits(studyId, password, dto) {
  const response = await apiClient.put(`/studies/${studyId}/habits`, dto, { headers: { Authorization: password } });
  const data = response.data;

  return data;
}

const studiesAPI = {
  getStudies,
  getStudy,
  createStudy,
  checkStudyPassword,
  updateStudy,
  getStudyHabits,
  updateStudyHabits,
};

export default studiesAPI;
