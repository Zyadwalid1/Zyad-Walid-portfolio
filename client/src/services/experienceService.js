import api from '../utils/api';

export const experienceService = {
  getAll: async () => {
    const response = await api.get('/experience');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/experience/${id}`);
    return response.data;
  },

  create: async (data) => {
    const response = await api.post('/experience', data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/experience/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/experience/${id}`);
    return response.data;
  },
};
