import api from "./apiClient";

export const getAllStudents = () => api.get("/api/students");
export const getStudent = (id) => api.get(`/api/students/${id}`);
export const createStudent = (data) => api.post("/api/students", data);
export const updateStudent = (id, data) => api.put(`/api/students/${id}`, data);
export const deleteStudent = (id) => api.delete(`/api/students/${id}`);

export const getTestsForStudent = (studentId) =>
  api.get(`/tests/student/${studentId}`);

export const getStudentSummary = (studentId) =>
  api.get(`/analytics/student/${studentId}`);
