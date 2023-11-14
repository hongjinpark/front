import { httpApi } from './axios';

export const login = (requestUser) =>
  httpApi.post('/user/login', requestUser).then((result) => {
    return result;
  });
