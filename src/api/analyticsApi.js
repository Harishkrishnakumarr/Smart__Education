import api from "./apiClient";

export const getWeaknessSummary = (studentId) =>
  api.get(`/analytics/student/${studentId}`);
