/* eslint-disable react-hooks/exhaustive-deps */
import { Layout, SignOutUserRoutes, SignInUserRoutes } from 'components';
import {
  BoardsPage,
  MainPage,
  NotFoundPage,
  ProfilePage,
  SingInPage,
  SingUpPage,
  TasksPage,
} from 'pages';
import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAppDispatch } from 'hooks';
import { handleFailedIntialLogIn, handleInitialRenderLogIn } from 'store/authSlice';
import { ConfigProvider } from 'antd';
import './styles/index.scss';

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  axios.defaults.baseURL = 'https://react-final-task-production.up.railway.app';
  useEffect(() => {
    const token = localStorage.getItem('token') as string;
    const id = localStorage.getItem('id') as string;
    if (token) {
      dispatch(handleInitialRenderLogIn({ token: token, id: id }))
        .unwrap()
        .catch(() => {
          navigate('/');
        });
    } else dispatch(handleFailedIntialLogIn());
  }, []);
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#84a17d',
          colorPrimaryHover: '#6d9f61',
          borderRadius: 3,
          fontFamily: 'Roboto',
        },
      }}
    >
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route element={<SignOutUserRoutes />}>
            <Route path="/signin" element={<SingInPage />} />
            <Route path="/signup" element={<SingUpPage />} />
          </Route>
          <Route element={<SignInUserRoutes />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/boards" element={<BoardsPage />} />
            <Route path="/boards/:id" element={<TasksPage />} />
          </Route>
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Route>
      </Routes>
    </ConfigProvider>
  );
}

export default App;
