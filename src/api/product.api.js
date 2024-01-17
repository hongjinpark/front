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

export const deleteProduct = (id) => httpApi.delete(`/product/${id}`);

export const renewProduct = (id) => httpApi.post(`/product/renew/${id}`);

export const getProductById = (id) => httpApi.get(`/product/list/${id}`);
