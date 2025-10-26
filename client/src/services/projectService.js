import api from '../utils/api';

export const projectService = {
  getAll: async (params = {}) => {
    const response = await api.get('/projects', { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  },

  create: async (projectData) => {
    const response = await api.post('/projects', projectData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  update: async (id, projectData) => {
    const response = await api.put(`/projects/${id}`, projectData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/projects/${id}`);
    return response.data;
  },
};
