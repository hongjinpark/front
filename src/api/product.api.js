import { httpApi } from './axios';

export const getProductList = () =>
  httpApi.get('/product/lists/all').then((result) => {
    return result;
  });

export const getMyProductList = () =>
  httpApi.get('/product/user').then((result) => {
    return result;
  });
export const updateProductStatus = (id, status) =>
  httpApi.put(`/product/status/${id}/${status}`);
