import api from '../utils/api';

export const contactService = {
  getAll: async () => {
    const response = await api.get('/contact');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/contact/${id}`);
    return response.data;
  },

  send: async (contactData) => {
    const response = await api.post('/contact', contactData);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/contact/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/contact/${id}`);
    return response.data;
  },
};
