import { httpApi } from './axios';

export const getProductList = () =>
  httpApi.get('/product/lists/all').then((result) => {
    return result;
  });
