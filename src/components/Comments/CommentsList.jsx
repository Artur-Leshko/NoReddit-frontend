import React from 'react';
import { useSelector, useDispatch, } from 'react-redux';
import { Button, ButtonKinds, ButtonStyles, EditText, } from '../../common';
import {

} from '../../store/actions';
import { postCommentsSelector, upvotedCommentsSelector, downvotedCommentsSelector, } from '../../store/selectors';
import defaultAvatar from '../../images/default_avatar.png';
import './commentslist.scss';

const CommentItem = ({ id, text, owner, upvotes, downvotes, className, }) => {
  const dispatch = useDispatch();

  return (
    <li key={id} className='comments__list-item'>
      <div className={`comments__list-arrows ${className && 'comments__list-arrows--' + className}`}>
        <div className='comments__arrows-group'>
          <div className='comments__arrows-count comments__arrows-count--up'>{upvotes}</div>
          <div className='comments__arrows-up' onClick={async (e) => {
            // const updatedPost = await upvotePost(post.id);
            // updatePost(dispatch, updatedPost);
            // if (isPostDownvoted(post)) {
            //   removeDownvotedPost(dispatch, updatedPost);
            //   addUpvotedPost(dispatch, updatedPost);
            // }
            // else if (isPostUpvoted(post)) removeUpvotedPost(dispatch, updatedPost);
            // else addUpvotedPost(dispatch, updatedPost);
          }}></div>
        </div>
        <div className='comments__arrows-group'>
          <div className='comments__arrows-down' onClick={async (e) => {
            // const updatedPost = await downvotePost(post.id);
            // updatePost(dispatch, updatedPost);
            // if (isPostUpvoted(post)) {
            //   removeUpvotedPost(dispatch, updatedPost);
            //   addDownvotedPost(dispatch, updatedPost);
            // }
            // else if (isPostDownvoted(post)) removeDownvotedPost(dispatch, updatedPost);
            // else addDownvotedPost(dispatch, updatedPost);
          }}></div>
          <div className='comments__arrows-count comments__arrows-count--down'>{downvotes}</div>
        </div>
      </div>
      <div className='comments__info'>
        <div className='comments__info-user'>
          <div className='comments__info-avatar'>
            <img src={owner.avatar || defaultAvatar} alt='avatar' />
          </div>
          <div className='comments__info-username'>{owner.username}</div>
        </div>
        <div className='comments__info-text'>{text}</div>
      </div>
    </li>
  );
};

export const CommentsList = () => {
  const comments = useSelector(postCommentsSelector);
  const upvotedComments = useSelector(upvotedCommentsSelector);
  const downvotedComments = useSelector(downvotedCommentsSelector);

  const isCommentUpvoted = (post) => {
    return upvotedComments.find(p => p.id === post.id);
  };

  const isCommentDownvoted = (post) => {
    return downvotedComments.find(p => p.id === post.id);
  };

  return (
    <div className='comments'>
      {comments.length > 0 ?
        <ul className='comments__lsit'>
          {comments.map(comment => {
            const upvoted = isCommentUpvoted(comment);
            const downvoted = upvoted ? false : isCommentDownvoted(comment);
            const className = upvoted ? 'up' : downvoted ? 'down' : '';

            return <CommentItem key={comment.id} className={className} {...comment} />;
          })}
        </ul>
        : <div className='comments__nocomments'></div>}
    </div>
  );
};
