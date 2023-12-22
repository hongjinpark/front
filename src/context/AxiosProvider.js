import { useEffect } from 'react';
import { httpApi } from '../api/axios';
import useAuth from '../hooks/useAuth';
import history from '../utils/history';

export const AxiosProvider = ({ children }) => {
  const { setAuth } = useAuth();
  useEffect(() => {
    httpApi.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        if (error.response.status === 401) {
          //place your reentry code
          console.log('401');
          setAuth(null);
          localStorage.removeItem('user');
          localStorage.removeItem('login');
          history.replace('/login');
          return Promise.reject(error);
        }
      }
    );
  }, [setAuth]);
  return children;
};
