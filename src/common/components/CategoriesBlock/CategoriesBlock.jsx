import React, { useState, useEffect, useRef, } from 'react';
import { useNavigate, } from 'react-router-dom';
import './categoriesblock.scss';

export const CategoriesBlock = ({ categories, allowedCategories,
  classNamePrefix, formMode = false, onCategoryAdd, onCategoryRemove, }) => {
  const [showCategoriesList, setShowCategoriesList,] = useState(false);

  const crossRef = useRef();
  const navigate = useNavigate();

  function subscribeEvent(e) {
    if (crossRef.current && !crossRef.current.contains(e.target)) {
      setShowCategoriesList(false);
    }
  }

  useEffect(() => {
    window.addEventListener('click', subscribeEvent);

    return () => window.removeEventListener('click', subscribeEvent);
  }, []);

  const onCategoryCrossClick = () => {
    setShowCategoriesList(true);
  };

  const onCategoryAddClick = (e, category) => {
    e.stopPropagation();
    onCategoryAdd(category);
    setShowCategoriesList(false);
  };

  const onCategoryRemoveClick = (category) => {
    onCategoryRemove(category);
  };

  return (
    <ul className={`post__info-categories${classNamePrefix ? ` post__info-categories--${classNamePrefix}` : ''}`}>
      {formMode ?
        <li
          className={`post__categories-item${classNamePrefix ?
            ` post__categories-item--${classNamePrefix}` : ' post__categories-item--form'}`}
          onClick={onCategoryCrossClick}
          ref={crossRef}
        >
          <div className={`post__categories-add${showCategoriesList ? ' post__categories-add--active' : ''}`}>
            <div className='post__categories-cross'>
              <div></div>
              <div></div>
            </div>
          </div>
          {showCategoriesList ?
            <div className={`post__categories-body${showCategoriesList ? ' post__categories-body--active' : null}`}>
              {categories.length < 3 ?
                allowedCategories.map(category => {
                  const { id, name, } = category;
                  const avatarSrc = category.categoryImage.startsWith('http') ? category.categoryImage :
                    'http://localhost:8000' + category.categoryImage;
                  const isAlreadyUsed = categories.find(c => c.id === category.id);

                  return (
                    !isAlreadyUsed ?
                      <div
                        key={id}
                        className='post__categories-allowed' onClick={(e) => onCategoryAddClick(e, category)}
                      >
                        <div>
                          <img src={avatarSrc} alt='category image' />
                        </div>
                      </div>
                      : null
                  );
                })
                : <div className='post__categories-allowed post__categories-empty'>:(</div>}
            </div> : null
          }
        </li> : null
      }
      {
        categories.map(category => {
          const { id, name, } = category;
          const avatarSrc = category.categoryImage.startsWith('http') ? category.categoryImage :
            'http://localhost:8000' + category.categoryImage;

          return (
            <li key={id}
              className={`post__categories-item${classNamePrefix ?
                ` post__categories-item--${classNamePrefix}` : ' post__categories-item--form'}`}
            >
              {
                !formMode ? <div
                  className={`post__categories-name${classNamePrefix ?
                    ` post__categories-name--${classNamePrefix}` : '  post__categories-name--form'}`}
                  onClick={(e) => navigate(`/noreddit/categories/${name}`)}
                >
                  {name}
                </div> : null
              }
              <div
                className={`post__categories-image${classNamePrefix ?
                  ` post__categories-image--${classNamePrefix}` : ' post__categories-image--form'}`}
                onClick={formMode ? () => onCategoryRemoveClick(category) : null}
              >
                <img src={avatarSrc} alt='category image' />
              </div>
            </li>
          );
        })
      }
    </ul >
  );
};
