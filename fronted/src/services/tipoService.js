import api from './axiosConfig';

export const getTipos = () => api.get('/tipos');
export const getTipoById = (id) => api.get(`/tipos/${id}`);
export const createTipo = (data) => api.post('/tipos', data);
export const updateTipo = (id, data) => api.put(`/tipos/${id}`, data);
export const deleteTipo = (id) => api.delete(`/tipos/${id}`);
