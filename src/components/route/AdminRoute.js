import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const AdminRoute = () => {
  const [role, setRole] = useState();

  useEffect(() => {
    //role 정보 담기
    const token = localStorage.getItem('login');
    token
      ? axios
          .get('http://localhost:8090/user/info/role', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((result) => {
            setRole(result.data);
          })
      : null;
  }, []);

  //   if (role !== 'ADMIN') {
  //     alert('권한이 필요합니다');
  //     console.log(role);
  //   }

  return role == 'ADMIN' ? <Outlet /> : <Navigate to="/" />;
};
export default AdminRoute;
