import React, { useContext, } from 'react';
import { useSelector, useDispatch, } from 'react-redux';
import { useNavigate, } from 'react-router-dom';
import { Button, ButtonKinds, ButtonStyles, EditTextarea, validateCommentText, } from '../../common';
import { ModalContext, } from '../../contexts';
import {
  addUpvotedComment,
  addDownvotedComment,
  removeUpvotedComment,
  removeDownvotedComment,
  updateSeparatePostComment,
  removePostComment,
} from '../../store/actions';
import { updateComment, upvoteComment, downvoteComment, deleteComment, } from '../../api';
import {
  postCommentsSelector,
  upvotedCommentsSelector,
  downvotedCommentsSelector,
} from '../../store/selectors';
import defaultAvatar from '../../images/default_avatar.png';
import './commentslist.scss';

const CommentItem = ({ id, text, owner, upvotes, downvotes, className,
  isCommentDownvoted, isCommentUpvoted, isEditable, isDeletable, }) => {
  const { openModal, closeModal, } = useContext(ModalContext);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const avatartSrc = owner.avatar ?
    (owner.avatar.startsWith('http') ? owner.avatar : 'http://localhost:8000' + owner.avatar)
    : defaultAvatar;

  const onSave = (e, key, data) => {
    e.preventDefault();

    const body = { [key]: data, };

    updateComment(id, body)
      .then(comment => {
        updateSeparatePostComment(dispatch, comment);
      });
  };

  const onDeleteConfirm = () => {
    deleteComment(id)
      .then(() => {
        removePostComment(dispatch, { id, text, });
        closeModal();
      });
  };

  const onDelete = () => {
    openModal({
      title: 'Do you want to delete this comment?',
      children: <>
        <Button
          kind={ButtonKinds.INFO}
          style={ButtonStyles.DELETE}
          onClick={onDeleteConfirm}
          className='modal-btn'
        >
          Delete
        </Button>
        <Button
          kind={ButtonKinds.INFO}
          style={ButtonStyles.CANCEL}
          onClick={closeModal}
          className='modal-btn'
        >
          Cancel
        </Button>
      </>,
    });
  };

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
            <div className='comments__info-gray' onClick={e => navigate(`/noreddit/profile/${owner.id}`)}></div>
            <img src={avatartSrc} alt='avatar' />
          </div>
          <div className='comments__info-username'
            onClick={e => navigate(`/noreddit/profile/${owner.id}`)}
          >
            {owner.username}
          </div>
          {isDeletable ?
            <Button
              kind={ButtonKinds.INFO}
              style={ButtonStyles.DELETE}
              className='comments__info-delete'
              onClick={onDelete}
            >
              Delete
            </Button>
            : null}
        </div>
        <EditTextarea
          defaultInfo={text}
          infoType='text'
          placeholder='Text'
          classNamePrefix='comments__info'
          isEditable={isEditable}
          validateFunc={validateCommentText}
          onSave={onSave}
        />
      </div>
    </li>
  );
};

export const CommentsList = ({ currentUser, postOwnerId, }) => {
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
            const isEditable = currentUser.id === comment.owner.id;
            const isDeletable = currentUser.id === comment.owner.id || currentUser.id === postOwnerId;

            const upvoted = isCommentUpvoted(comment);
            const downvoted = upvoted ? false : isCommentDownvoted(comment);
            const className = upvoted ? 'up' : downvoted ? 'down' : '';

            return <CommentItem
              key={comment.id}
              className={className}
              isCommentUpvoted={() => isCommentUpvoted(comment)}
              isCommentDownvoted={() => isCommentDownvoted(comment)}
              isEditable={isEditable}
              isDeletable={isDeletable}
              {...comment}
            />;
          })}
        </ul>
        : <div className='comments__nocomments'></div>}
    </div>
  );
};
