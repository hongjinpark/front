import useAuth from './../hooks/useAuth';
import { Navigate } from 'react-router-dom';
const RequireAuth = ({ children }) => {
  const { auth } = useAuth();

  if (!auth) {
    // Redirect to the login page if not logged in
    alert('로그인이 필요합니다.');
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default RequireAuth;
