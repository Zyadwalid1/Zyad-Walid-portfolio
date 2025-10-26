import api from '../utils/api';

export const profileService = {
  get: async () => {
    const response = await api.get('/profile');
    return response.data;
  },

  update: async (profileData) => {
    const response = await api.put('/profile', profileData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};
