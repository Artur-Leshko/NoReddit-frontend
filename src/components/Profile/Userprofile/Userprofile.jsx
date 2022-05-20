import React, { useState, useRef, } from 'react';
import { useDispatch, } from 'react-redux';
import { subscribeOnUser, unsubscribeFromUser, updateUserProfile, } from '../../../api';
import {
  updateCurrentUser,
  updateUser,
  addCurrentUserFollowed,
  removeCurrentUserFollowed,
  addFollower,
  removeFollower,
} from '../../../store/actions';
import { Button, ButtonKinds, ButtonStyles, EditText, validateUsernameForm, } from '../../../common';
import defaulAvatar from '../../../images/default_avatar.png';
import './userprofile.scss';

export const Userprofile = ({ currentUser, user, currentUserFollowed, profileId, currentId, }) => {
  const [isFollowing, setIsFollowing,] = useState(Boolean(currentUserFollowed.find(user => user.id === profileId)));
  const [avatar, setAvatar,] = useState(user.avatar);

  const inputRef = useRef();
  const dispatch = useDispatch();

  const onSubscribe = (e) => {
    e.preventDefault();

    if (isFollowing) {
      unsubscribeFromUser(profileId)
        .then(user => {
          updateUser(dispatch, user);
          removeCurrentUserFollowed(dispatch, user);
          removeFollower(dispatch, currentUser);
          setIsFollowing(false);
        });
    } else {
      subscribeOnUser(profileId)
        .then(user => {
          updateUser(dispatch, user);
          addCurrentUserFollowed(dispatch, user);
          addFollower(dispatch, currentUser);
          setIsFollowing(true);
        });
    }
  };

  const onAvatartChange = (e) => {
    const file = e.target.files[0];
    onSave(e, 'avatar', file);
  };

  const onSave = (e, key, data) => {
    e.preventDefault();

    let bodyFormData = new FormData();
    bodyFormData.append(key, data);

    updateUserProfile(bodyFormData)
      .then(currentUser => {
        updateCurrentUser(dispatch, currentUser);
        updateUser(dispatch, currentUser);
      });
  };

  return (
    <div className='profile__user'>
      <div className='profile__user-avatar'>
        <div className='profile__user-title'>Avatar</div>
        <div className='profile__user-img'>
          <div className='profile__user-gray' onClick={e => currentId === profileId ? inputRef.current.click() : null}></div>
          <input
            type='file'
            accept='.png,.jpg,.jpeg'
            className='profile__avatar-input--hidden'
            ref={inputRef}
            onChange={e => onAvatartChange(e)}
          />
          <img src={user.avatar ? 'http://127.0.0.1:8000' + user.avatar : defaulAvatar} alt='avatar' />
        </div>
        <div className='profile__user-subscriptions'>
          <div className='profile__user-followers'>Followers <span>{user.followersCount}</span></div>
          <div className='profile__user-followed'>Followed <span>{user.followedCount}</span></div>
        </div>
      </div>
      <div className='profile__user-info'>
        <div className='profile__user-item'>
          <EditText
            defaultInfo={user.user.username}
            infoType='username'
            labelName='Username'
            placeholder='Username'
            classNamePrefix='profile__user'
            isEditable={currentId === profileId}
            validateFunc={validateUsernameForm}
            onSave={onSave}
          />
        </div>
        <div className='profile__user-item'>
          <EditText
            defaultInfo={user?.firstname || 'Unknown'}
            infoType='firstname'
            labelName='Firstname'
            placeholder='Firstname'
            classNamePrefix='profile__user'
            isEditable={currentId === profileId}
            onSave={onSave}
          />
        </div>
        <div className='profile__user-item'>
          <EditText
            defaultInfo={user?.surname || 'Unknown'}
            infoType='surname'
            labelName='Surname'
            placeholder='Surname'
            classNamePrefix='profile__user'
            isEditable={currentId === profileId}
            onSave={onSave}
          />
        </div>
        {currentId !== profileId ?
          <div className='profile__user-item'>
            <Button
              kind={ButtonKinds.LOGIN}
              style={isFollowing ? ButtonStyles.DELETE : ButtonStyles.SUCCESS}
              className='profile__user-subscribe'
              onClick={onSubscribe}
            >
              {isFollowing ? 'Unsubscribe' : 'Subscribe'}
            </Button>
          </div>
          : null
        }
      </div>
    </div >
  );
};
