import useAuth from './useAuth';

export const useLogout = () => {
  const { setAuth } = useAuth();

  console.log('remove LocalStorage');
  localStorage.removeItem('user');
  localStorage.removeItem('login');
  setAuth(null);
};
