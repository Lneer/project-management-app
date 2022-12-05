import { useAppSelector } from 'hooks';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const SignInUserRoutes = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  return isLoggedIn === false ? <Navigate to="/signin" /> : <Outlet />;
};
export default SignInUserRoutes;
