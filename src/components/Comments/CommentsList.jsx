import React from 'react';
import { useSelector, useDispatch, } from 'react-redux';
import { Button, ButtonKinds, ButtonStyles, EditText, } from '../../common';
import {
  addUpvotedComment,
  addDownvotedComment,
  removeUpvotedComment,
  removeDownvotedComment,
  updateSeparatePostComment,
} from '../../store/actions';
import { upvoteComment, downvoteComment, } from '../../api';
import { postCommentsSelector, upvotedCommentsSelector, downvotedCommentsSelector, } from '../../store/selectors';
import defaultAvatar from '../../images/default_avatar.png';
import './commentslist.scss';

const CommentItem = ({ id, text, owner, upvotes, downvotes, className, isCommentDownvoted, isCommentUpvoted, }) => {
  const dispatch = useDispatch();
  const avatartSrc = owner.avatar ?
    (owner.avatar.startsWith('http') ? owner.avatar : 'http://localhost:8000' + owner.avatar)
    : defaultAvatar;
  return (
    <li key={id} className='comments__list-item'>
      <div className={`comments__list-arrows ${className && 'comments__list-arrows--' + className}`}>
        <div className='comments__arrows-group'>
          <div className='comments__arrows-count comments__arrows-count--up'>{upvotes}</div>
          <div className='comments__arrows-up' onClick={async (e) => {
            const updatedComment = await upvoteComment(id);
            updateSeparatePostComment(dispatch, updatedComment);
            if (isCommentDownvoted()) {
              removeDownvotedComment(dispatch, updatedComment);
              addUpvotedComment(dispatch, updatedComment);
            }
            else if (isCommentUpvoted()) removeUpvotedComment(dispatch, updatedComment);
            else addUpvotedComment(dispatch, updatedComment);
          }}></div>
        </div>
        <div className='comments__arrows-group'>
          <div className='comments__arrows-down' onClick={async (e) => {
            const updatedComment = await downvoteComment(id);
            updateSeparatePostComment(dispatch, updatedComment);
            if (isCommentUpvoted()) {
              removeUpvotedComment(dispatch, updatedComment);
              addDownvotedComment(dispatch, updatedComment);
            }
            else if (isCommentDownvoted()) removeDownvotedComment(dispatch, updatedComment);
            else addDownvotedComment(dispatch, updatedComment);
          }}></div>
          <div className='comments__arrows-count comments__arrows-count--down'>{downvotes}</div>
        </div>
      </div>
      <div className='comments__info'>
        <div className='comments__info-user'>
          <div className='comments__info-avatar'>
            <img src={avatartSrc} alt='avatar' />
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

            return <CommentItem
              key={comment.id}
              className={className}
              isCommentUpvoted={() => isCommentUpvoted(comment)}
              isCommentDownvoted={() => isCommentDownvoted(comment)}
              {...comment}
            />;
          })}
        </ul>
        : <div className='comments__nocomments'></div>}
    </div>
  );
};
