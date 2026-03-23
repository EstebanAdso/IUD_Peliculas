import api from './axiosConfig';

export const getGeneros = () => api.get('/generos');
export const getGeneroById = (id) => api.get(`/generos/${id}`);
export const createGenero = (data) => api.post('/generos', data);
export const updateGenero = (id, data) => api.put(`/generos/${id}`, data);
export const deleteGenero = (id) => api.delete(`/generos/${id}`);
