import api from './axiosConfig';

export const getMedias = () => api.get('/medias');
export const getMediaById = (id) => api.get(`/medias/${id}`);
export const createMedia = (data) => api.post('/medias', data);
export const updateMedia = (id, data) => api.put(`/medias/${id}`, data);
export const deleteMedia = (id) => api.delete(`/medias/${id}`);
