import React, { useState, } from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { useNavigate, } from 'react-router-dom';
import { Button, ButtonKinds, ButtonStyles, Sort, } from '../../../common';
import { upvotePost, downvotePost, } from '../../../api';
import {
  addUpvotedPost,
  addDownvotedPost,
  removeUpvotedPost,
  removeDownvotedPost,
} from '../../../store/actions';
import { upvotedPostsSelector, downvotedPostsSelector, } from '../../../store/selectors';
import defaultAvatar from '../../../images/default_avatar.png';
import './userpostslist.scss';

export const UserPostsList = ({ title, posts, needBtn, fixedBtn, main, updatePost, filterPosts, needOrder, }) => {
  const upvotedPosts = useSelector(upvotedPostsSelector);
  const downvotedPosts = useSelector(downvotedPostsSelector);
  const [order, setOrder,] = useState('DESC');
  const ordering = [{ id: 'asc', name: 'ASC', }, { id: 'desc', name: 'DESC', },];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onInfoClick = (e, postId) => {
    e.preventDefault();

    navigate(`/noreddit/posts/${postId}`);
  };

  const isPostUpvoted = (post) => {
    return upvotedPosts.find(p => p.id === post.id);
  };

  const isPostDownvoted = (post) => {
    return downvotedPosts.find(p => p.id === post.id);
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
            const categories = post.categories;
            const upvoted = isPostUpvoted(post);
            const downvoted = upvoted ? false : isPostDownvoted(post);
            const className = upvoted ? 'up' : downvoted ? 'down' : '';

            return (
              <li className={'posts__list-item ' + className} key={post.id}>
                <div className={`posts__list-arrows ${className && 'posts__list-arrows--' + className}`}>
                  <div className='posts__arrows-group'>
                    <div className='posts__arrows-count posts__arrows-count--up'>{post.upvotes}</div>
                    <div className='posts__arrows-up' onClick={async (e) => {
                      const updatedPost = await upvotePost(post.id);
                      updatePost(dispatch, updatedPost);
                      if (isPostDownvoted(post)) {
                        removeDownvotedPost(dispatch, updatedPost);
                        addUpvotedPost(dispatch, updatedPost);
                      }
                      else if (isPostUpvoted(post)) removeUpvotedPost(dispatch, updatedPost);
                      else addUpvotedPost(dispatch, updatedPost);
                    }}></div>
                  </div>
                  <div className='posts__arrows-group'>
                    <div className='posts__arrows-down' onClick={async (e) => {
                      const updatedPost = await downvotePost(post.id);
                      updatePost(dispatch, updatedPost);
                      if (isPostUpvoted(post)) {
                        removeUpvotedPost(dispatch, updatedPost);
                        addDownvotedPost(dispatch, updatedPost);
                      }
                      else if (isPostDownvoted(post)) removeDownvotedPost(dispatch, updatedPost);
                      else addDownvotedPost(dispatch, updatedPost);
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
                    {categories.length > 0 ?
                      <ul className='posts__info-categories'>
                        {categories.map(category => {
                          const { id, name, } = category;
                          const avatarSrc = category.categoryImage.startsWith('http') ? category.categoryImage :
                            'http://localhost:8000' + category.categoryImage;

                          return (
                            <li key={id} className='posts__categories-item'>
                              <div className='posts__categories-name'>{name}</div>
                              <div className='posts__categories-image'><img src={avatarSrc} alt='category image' /></div>
                            </li>
                          );
                        })}
                      </ul>
                      : null
                    }
                  </div>
                  <div className='posts__info-title'>{post.title}</div>
                  <div className='posts__info-text'>
                    {post.mainText.length > 40 ? post.mainText.slice(0, 41) + '...' : post.mainText}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        : <div className='posts__noposts'>Sorry, there are no posts :(</div>
      }
      {needOrder ?
        <Sort
          title='Date sort:'
          className='posts__sort'
          items={ordering}
          selectedItemName={order}
          onItemChange={(id) => filterPosts(id, ordering, setOrder)}
        />
        : null
      }
      {needBtn ?
        <div className={`posts__add ${fixedBtn ? 'posts__add--fixed' : ''}`}>
          <Button
            style={ButtonStyles.SUCCESS}
            kind={ButtonKinds.ADD}
            className='posts__add-btn'
            text='add post'
            path='/noreddit/posts/create/'
          />
        </div>
        : null
      }
    </div>
  );
};
