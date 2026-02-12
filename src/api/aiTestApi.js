import api from "./apiClient";

export const generateAiTest = (payload) =>
  api.post("/api/ai-test/generate", payload);

export const getAiTestById = (id) => api.get(`/api/ai-tests/${id}`);

export const getAllAiTests = () => api.get("/api/ai-test");
