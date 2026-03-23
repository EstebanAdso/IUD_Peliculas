import api from './axiosConfig';

export const getProductoras = () => api.get('/productoras');
export const getProductoraById = (id) => api.get(`/productoras/${id}`);
export const createProductora = (data) => api.post('/productoras', data);
export const updateProductora = (id, data) => api.put(`/productoras/${id}`, data);
export const deleteProductora = (id) => api.delete(`/productoras/${id}`);
