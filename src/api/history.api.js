import { httpApi } from './axios';
export const getPurchaseHistory = (title = '', period = '') => {
  return httpApi.get(
    `/purchasehistories/purchase?title=${title}&period=${period}`
  );
};
export const getSaletHistory = (title = '', period = '') => {
  return httpApi.get(`/purchasehistories/sale?title=${title}&period=${period}`);
};
export const deleteHistory = (id) => {
  return httpApi.delete(`/purchasehistories/${id}`);
};
