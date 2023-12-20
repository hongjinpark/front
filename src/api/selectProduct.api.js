import { httpApi } from './axios';

export const getSelectProduct = (title = '', period = '') => {
  return httpApi.get(`/selectProduct?period=${period}&title=${title}`);
};
export const deleteSelectProduct = (id) => {
  return httpApi.delete(`/selectProduct/${id}`);
};
