import api from './axiosConfig';

export const getDirectores = () => api.get('/directores');
export const getDirectorById = (id) => api.get(`/directores/${id}`);
export const createDirector = (data) => api.post('/directores', data);
export const updateDirector = (id, data) => api.put(`/directores/${id}`, data);
export const deleteDirector = (id) => api.delete(`/directores/${id}`);
