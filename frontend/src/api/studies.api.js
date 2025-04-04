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

async function deleteStudy(studyId, password) {
  const response = await apiClient.delete(`/studies/${studyId}`, { headers: { Authorization: password } });
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

async function toggleTodayHabit(studyId, habitId, password) {
  const response = await apiClient.put(`/studies/${studyId}/habits/${habitId}`, undefined, { headers: { Authorization: password } });
  const data = response.data;

  return data;
}

async function finishFocus(studyId, seconds, password) {
  const response = await apiClient.post(`/studies/${studyId}/focus`, { seconds }, { headers: { Authorization: password } });
  const data = response.data;

  return data;
}

async function addEmoji(studyId, emoji) {
  const response = await apiClient.post(`/studies/${studyId}/emoji`, { emoji });
  const data = response.data;

  return data;
}

const studiesAPI = {
  getStudies,
  getStudy,
  createStudy,
  deleteStudy,
  checkStudyPassword,
  updateStudy,
  getStudyHabits,
  updateStudyHabits,
  toggleTodayHabit,
  finishFocus,
  addEmoji,
};

export default studiesAPI;
