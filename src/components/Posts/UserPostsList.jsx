import React from 'react';
import { useDispatch, } from 'react-redux';
import { useNavigate, } from 'react-router-dom';
import { Button, ButtonKinds, ButtonStyles, } from '../../common';
import { upvotePost, downvotePost, } from '../../api';
import defaultAvatar from '../../images/default_avatar.png';
import './userpostslist.scss';

export const UserPostsList = ({ title, posts, needBtn, fixedBtn, main, updatePost, }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onInfoClick = (e, postId) => {
    e.preventDefault();

    navigate(`/posts/${postId}`);
  };

  return (
    <div className={`posts ${main ? 'posts--main' : ''}`}>
      {title ? <div className='posts__title'>{title}</div> : null}
      {posts.length > 0 ?
        <ul className='posts__list'>
          {posts.map(post => {
            const avatartSrc = post.owner.avatar ?
              (post.owner.avatar.startsWith('http') ? post.owner.avatar : 'http://localhost:8000' + post.owner.avatar)
              : defaultAvatar;
            return (
              <li key={post.id}>
                <div className='posts__list-arrows'>
                  <div className='posts__arrows-group'>
                    <div className='posts__arrows-count posts__arrows-count--up'>{post.upvotes}</div>
                    <div className='posts__arrows-up' onClick={async (e) => {
                      const updatedPost = await upvotePost(post.id);
                      updatePost(dispatch, updatedPost);
                    }}></div>
                  </div>
                  <div className='posts__arrows-group'>
                    <div className='posts__arrows-down' onClick={async (e) => {
                      const updatedPost = await downvotePost(post.id);
                      updatePost(dispatch, updatedPost);
                    }}></div>
                    <div className='posts__arrows-count posts__arrows-count--down'>{post.downvotes}</div>
                  </div>
                </div>
                <div className='posts__info' onClick={(e) => onInfoClick(e, post.id)}>
                  <div className='posts__info-user'>
                    <div className='posts__info-avatar'>
                      <img
                        src={avatartSrc}
                        alt='avatar'
                      />
                    </div>
                    <div className='posts__info-username'>{post.owner.username}</div>
                  </div>
                  <div className='posts__info-title'>{post.title}</div>
                  <div className='posts__info-text'>
                    {post.mainText.length > 100 ? post.mainText.slice(101) + '...' : post.mainText}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        : <div className='posts__noposts'>No popular posts :(</div>
      }
      {needBtn ?
        <div className={`posts__add ${fixedBtn ? 'posts__add--fixed' : ''}`}>
          <Button
            style={ButtonStyles.SUCCESS}
            kind={ButtonKinds.ADD}
            className='posts__add-btn'
            text='add post'
            path='/posts/create/'
          />
        </div>
        : null
      }
    </div>
  );
};
