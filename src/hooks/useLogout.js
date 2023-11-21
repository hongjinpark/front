import useAuth from './useAuth';

export const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('login');
    setAuth({});
  };

  return logout;
};
