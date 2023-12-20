import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';

const AdminRoute = () => {
  const role = secureLocalStorage.getItem('role');

  return (
    role == 'ADMIN' ? <Outlet /> : alert('권한이 필요합니다'),
    (<Navigate to="/" />)
  );
};
export default AdminRoute;
