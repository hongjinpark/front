import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';

const AdminRoute = () => {
  const role = secureLocalStorage.getItem('role');

  if (role != 'ADMIN') {
    alert('권한이 없습니다.');
  }

  return role == 'ADMIN' ? <Outlet /> : <Navigate to="/" />;
};
export default AdminRoute;
