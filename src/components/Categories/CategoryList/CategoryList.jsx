import React, { useState, useEffect, } from 'react';
import { useNavigate, } from 'react-router-dom';
import { useDispatch, useSelector, } from 'react-redux';
import { categoriesSelector, } from '../../../store/selectors';
import { updateCategories, } from '../../../store/actions';
import { getAllCategories, } from '../../../api';
import { Loader, Button, ButtonKinds, ButtonStyles, } from '../../../common';
import './categorylist.scss';

export const CategoryList = () => {
  const categories = useSelector(categoriesSelector);
  const [isLoading, setIsLoading,] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getAllCategories()
      .then(categories => updateCategories(dispatch, categories))
      .finally(() => setTimeout(() => setIsLoading(false), 1000));
  }, []);

  return (
    isLoading ? <Loader />
      :
      <>
        <div className='categories__title'>
          all categories
        </div>
        <ul className='categories__list'>
          {categories?.map(category => {
            const { id, name, description, categoryImage, } = category;

            return (
              <li className='categories__list-item' key={id}>
                <Button
                  kind={ButtonKinds.INFO}
                  style={ButtonStyles.SUCCESS}
                  className='categories__item-clickable'
                  onClick={(e) => navigate(`${name}`)}
                >
                  <div className='categories__item-upper'>
                    <div className='categories__item-name'>{name}</div>
                    <div className='categories__item-image'><img src={categoryImage} alt='category_image' /></div>
                  </div>
                  <div className='categories__item-description'>{description}</div>
                </Button>
              </li>
            );
          })}
        </ul>
      </>
  );
};
