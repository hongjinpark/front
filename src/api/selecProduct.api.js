import { httpApi } from './axios';

export const getSelectProduct = (period = '') => {
  return httpApi.get(`/selectProduct?period=${period}`);
};
