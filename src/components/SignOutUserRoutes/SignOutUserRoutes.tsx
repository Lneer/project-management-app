import { useAppSelector } from 'hooks';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const SignOutUserRoutes = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  return isLoggedIn ? <Navigate to="/boards" /> : <Outlet />;
};
export default SignOutUserRoutes;
