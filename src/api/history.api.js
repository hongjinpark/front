import { httpApi } from './axios';
export const getPurchaseHistory = () => {
  return httpApi.get('/purchasehistories/purchase');
};
export const getSaletHistory = () => {
  return httpApi.get('/purchasehistories/sale');
};
