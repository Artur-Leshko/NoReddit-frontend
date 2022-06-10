import React, { useState, useEffect, } from 'react';
import { useNavigate, } from 'react-router-dom';
import { useSelector, useDispatch, } from 'react-redux';
import { createPost, getAllCategories, } from '../../../api';
import {
  Button,
  ButtonKinds,
  ButtonStyles,
  Input,
  InputKinds,
  Textarea,
  TextareaKinds,
  ErrorBlock,
  Loader,
  CategoriesBlock,
  validatePostForm,
  canBeSubmited,
} from '../../../common';
import { updateCategories, } from '../../../store/actions';
import { categoriesSelector, } from '../../../store/selectors';
import './postcreate.scss';

export const PostCreateForm = () => {
  const allowedCategories = useSelector(categoriesSelector);
  const [isLoading, setIsLoading,] = useState(true);
  const [title, setTitle,] = useState('');
  const [mainText, setMainText,] = useState('');
  const [categories, setCategories,] = useState([]);
  const [isPostBtnVisible, setIsPostBtnVisible,] = useState(false);
  const [createdPost, setCreatedPost,] = useState(null);
  const [errors, setErrors,] = useState({
    title: [],
    mainText: [],
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getAllCategories()
      .then(categories => updateCategories(dispatch, categories))
      .finally(() => setTimeout(() => setIsLoading(false), 1000));
  }, []);

  const onSave = (e) => {
    e.preventDefault();

    const newErrors = validatePostForm({ title, mainText, });
    setErrors(newErrors);

    if (canBeSubmited(newErrors)) {
      createPost({ title, main_text: mainText, categories, }).then(createdPost => {
        setCreatedPost(createdPost);
        setIsPostBtnVisible(true);
      });
    }
  };

  const onCategoryAdd = (category) => {
    setCategories(prev => [...prev, { ...category, },]);
  };

  const onCategoryRemove = (category) => {
    setCategories(prev => [...prev.filter(c => c.id !== category.id),]);
  };

  const onCancel = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const onPostBtnClick = (e) => {
    e.preventDefault();
    navigate(`/noreddit/posts/${createdPost.id}`);
  };

  return (
    <div className='post__create'>
      <div className='post__create-subtitle'>Create your new post!</div>
      {isLoading ? <Loader /> :
        <form className='post__create-form'>
          <label className='post__create-title'>Title:
            <Input
              disabled={isPostBtnVisible}
              kind={InputKinds.INFO}
              placeholder='Title'
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </label>
          <ErrorBlock errorArr={errors.title} id='title' />
          <label className='post__create-text'>Text:
            <Textarea
              disabled={isPostBtnVisible}
              kind={TextareaKinds.INFO}
              placeholder='Text'
              value={mainText}
              onChange={e => setMainText(e.target.value)}
            />
          </label>
          <ErrorBlock errorArr={errors.mainText} id='text' />
          <label className='post__create-categories'>Categories:
            <CategoriesBlock
              categories={categories}
              formMode={true}
              allowedCategories={allowedCategories}
              onCategoryAdd={onCategoryAdd}
              onCategoryRemove={onCategoryRemove}
            />
          </label>
          {isPostBtnVisible ? <div className='post__create-success'>Post created!</div> : null}
          <div className='post__create-btns'>
            {!isPostBtnVisible ?
              <>
                <Button
                  kind={ButtonKinds.INFO}
                  style={ButtonStyles.SUCCESS}
                  className='post__create-save'
                  onClick={onSave}
                >
                  Save
                </Button>
                <Button
                  kind={ButtonKinds.INFO}
                  style={ButtonStyles.CANCEL}
                  className='post__create-cancel'
                  text='Back'
                  onClick={onCancel}
                >
                  Back
                </Button>
              </>
              : <Button
                kind={ButtonKinds.INFO}
                style={ButtonStyles.SUCCESS}
                className='post__create-continue'
                text='Go to new post!'
                onClick={onPostBtnClick}
              >
                Go to new post!
              </Button>
            }
          </div>
        </form>
      }
    </div>
  );
};
