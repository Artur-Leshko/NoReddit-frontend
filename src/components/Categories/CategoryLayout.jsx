import React from 'react';
import { Route, Routes, } from 'react-router-dom';
import { NotFound, } from '../../common';
import { CategoryList, } from './CategoryList/CategoryList';
import { CategoryPosts, } from './CategoryPosts/CategoryPosts';
import './categorylayout.scss';

export const CategoryLayout = () => {

  return (
    <div className='categories'>
      <div className='container'>
        <div className='categories__inner'>
          <Routes>
            <Route index element={<CategoryList />} />
            <Route path=':categoryName' element={<CategoryPosts />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
