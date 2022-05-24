import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, } from 'react-router-dom';
import { NotFound, ProtectedRoute, } from '../../common';
import { Layout, } from '../Layout';
import { Login, Register, } from '../User';
import { MainPage, } from '../MainPage';
import { ProfileLayout, } from '../Profile/ProfileLayout';
import { PostLayout, } from '../Posts';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path='/' element={<Navigate to='noreddit' replace />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path='noreddit' element={<Layout />} >
            <Route index element={<MainPage />} />
            <Route path='profile/:profileId/*' element={<ProfileLayout />} />
            <Route path='posts/*' element={<PostLayout />} />
          </Route>
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
