import React from 'react';
import { Route, Routes, Navigate, } from 'react-router-dom';
import { useSelector, } from 'react-redux';
import { userSelector, } from '../../store/selectors';
import { SeparatePost, } from './SeparatePost/SeparatePost';
import { PostCreateForm, } from './PostCreateForm/PostCreateForm';
import './postlayout.scss';

export const PostLayout = () => {
  const currentUser = useSelector(userSelector);

  return (
    <div className='post'>
      <div className='container'>
        <div className='post__inner'>
          <Routes>
            <Route path=':postId' element={<SeparatePost currentUser={currentUser} />} />
            <Route path='create' element={<PostCreateForm />} />
            <Route path='*' element={<Navigate to='/not-found' replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
