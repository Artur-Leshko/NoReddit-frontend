import React, { useState, useEffect, } from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { useNavigate, } from 'react-router-dom';
import { Button, ButtonKinds, ButtonStyles, Loader, } from '../../common';
import { getPopularPosts, } from '../../api';
import { updatePopularPosts, } from '../../store/actions';
import { popularPostsSelector, } from '../../store/selectors';
import defaultAvatar from '../../images/default_avatar.png';
import './mainpage.scss';

export const MainPage = () => {
  const [isLoading, setIsLoading,] = useState(false);
  const popularPosts = useSelector(popularPostsSelector);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);

    getPopularPosts()
      .then(posts => updatePopularPosts(dispatch, posts.results))
      .finally(() => setTimeout(() => setIsLoading(false), 1000));
  }, []);

  const onInfoClick = (e, postId) => {
    e.preventDefault();

    navigate(`/posts/${postId}`);
  };

  return (
    <div className='main'>
      <div className='container'>
        <div className='main__inner'>
          {isLoading ? <Loader />
            : <>
              <div className='main__inner-title'>Popular posts</div>
              {popularPosts.length > 0 ?
                <ul className='main__posts'>
                  {popularPosts.map(post => (
                    <li key={post.id}>
                      <div className='main__posts-arrows'>
                        <div className='main__arrows-group'>
                          <div className='main__arrows-count main__arrows-count--up'>{post.upvotes}</div>
                          <div className='main__arrows-up'></div>
                        </div>
                        <div className='main__arrows-group'>
                          <div className='main__arrows-down'></div>
                          <div className='main__arrows-count main__arrows-count--down'>{post.downvotes}</div>
                        </div>
                      </div>
                      <div className='main__posts-info' onClick={(e) => onInfoClick(e, post.id)}>
                        <div className='main__posts-user'>
                          <div className='main__posts-avatar'>
                            <img src={post.owner.avatar ? post.owner.avatar : defaultAvatar} alt='avatar' />
                          </div>
                          <div className='main__posts-username'>{post.owner.username}</div>
                        </div>
                        <div className='main__posts-title'>{post.title}</div>
                        <div className='main__posts-text'>
                          {post.mainText.length > 100 ? post.mainText.slice(101) + '...' : post.mainText}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                : <div className='main__inner-noposts'>No popular posts :(</div>
              }
              <div className='main__inner-add'>
                <Button
                  style={ButtonStyles.SUCCESS}
                  kind={ButtonKinds.ADD}
                  className='main__inner-btn'
                  text='add post'
                  path='/posts/create/'
                />
              </div>
            </>
          }
        </div>
      </div>
    </div>
  );
};
