import React, { useEffect, useState, } from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { useNavigate, useParams, } from 'react-router-dom';
import { Button, ButtonKinds, ButtonStyles, Loader, EditText, } from '../../../common';
import { getSeparatePost, upvotePost, downvotePost, } from '../../../api';
import {
  updateSeparatePost,
  addUpvotedPost,
  addDownvotedPost,
  removeUpvotedPost,
  removeDownvotedPost,
} from '../../../store/actions';
import { separatePostSelector, upvotedPostsSelector, downvotedPostsSelector, } from '../../../store/selectors';
import defaultAvatar from '../../../images/default_avatar.png';
import './separatepost.scss';

export const SeparatePost = ({ currentUser, }) => {
  const post = useSelector(separatePostSelector);
  const upvotedPosts = useSelector(upvotedPostsSelector);
  const downvotedPosts = useSelector(downvotedPostsSelector);
  const avatartSrc = post?.owner?.avatar ?
    (post.owner.avatar.startsWith('http') ? post.owner.avatar : 'http://localhost:8000' + post.owner.avatar)
    : defaultAvatar;
  const [isLoading, setIsLoading,] = useState(true);
  const [isUpvoted, setIsUpvoted,] = useState(false);
  const [isDownvoted, setIsDownvoted,] = useState(false);

  const { postId, } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getSeparatePost(postId)
      .then(post => {
        updateSeparatePost(dispatch, post);
        setIsUpvoted(isPostUpvoted(post));
        setIsDownvoted(isPostDownvoted(post));
      })
      .finally(() => setTimeout(setIsLoading(false), 1000));
  }, [postId,]);

  const isPostUpvoted = (post) => {
    return upvotedPosts.find(p => p.id === post.id);
  };

  const isPostDownvoted = (post) => {
    return downvotedPosts.find(p => p.id === post.id);
  };

  return (
    isLoading ? <Loader /> :
      <>
        <div className='post__arrows'>
          <div className='post__arrows-group'>
            <div className='post__arrows-count post__arrows-count--up'>{post.upvotes}</div>
            <div className='post__arrows-up' onClick={async (e) => {
              const updatedPost = await upvotePost(post.id);
              updateSeparatePost(dispatch, updatedPost);

              if (isDownvoted) {
                removeDownvotedPost(dispatch, updatedPost);
                addUpvotedPost(dispatch, updatedPost);
                setIsUpvoted(true);
                setIsDownvoted(false);
              }
              else if (isUpvoted) {
                removeUpvotedPost(dispatch, updatedPost);
                setIsUpvoted(false);
              }
              else {
                addUpvotedPost(dispatch, updatedPost);
                setIsUpvoted(true);
              }
            }}></div>
          </div>
          <div className='post__arrows-group'>
            <div className='post__arrows-down' onClick={async (e) => {
              const updatedPost = await downvotePost(post.id);
              updateSeparatePost(dispatch, updatedPost);

              if (isUpvoted) {
                removeUpvotedPost(dispatch, updatedPost);
                addDownvotedPost(dispatch, updatedPost);
                setIsUpvoted(false);
                setIsDownvoted(true);
              }
              else if (isDownvoted) {
                removeDownvotedPost(dispatch, updatedPost);
                setIsDownvoted(false);
              }
              else {
                addDownvotedPost(dispatch, updatedPost);
                setIsDownvoted(true);
              }
            }}></div>
            <div className='post__arrows-count post__arrows-count--down'>{post.downvotes}</div>
          </div>
          <div
            className={`post__arrows-pointer ${isUpvoted ? 'upvoted' : isDownvoted ? 'downvoted' : ''}`}
          >
            <div className={isUpvoted ? 'upvoted' : isDownvoted ? 'downvoted' : ''}></div>
          </div>
        </div>
        <div className='post__info'>
          <div className='post__info-user'>
            <div className='post__info-avatar'>
              <div className='post__info-gray' onClick={e => navigate(`/noreddit/profile/${post.owner.id}`)}></div>
              <img
                src={avatartSrc}
                alt='avatar'
              />
            </div>
            <div className='post__info-username' onClick={e => navigate(`/noreddit/profile/${post.owner.id}`)}>
              {post.owner.username}
            </div>
          </div>
          <div className='post__info-title'>{post.title}</div>
          <div className='post__info-text'>
            {post.mainText}
          </div>
        </div>
        <div className='post__add'>
          <Button
            style={ButtonStyles.SUCCESS}
            kind={ButtonKinds.ADD}
            className='post__add-btn'
            text='add post'
            path='/noreddit/posts/create/'
          />
        </div>
      </>
  );
};
