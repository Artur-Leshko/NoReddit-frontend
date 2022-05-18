import React, { useState, } from 'react';
import { useDispatch, } from 'react-redux';
import { subscribeOnUser, unsubscribeFromUser, } from '../../../api';
import { updateUser, addCurrentUserFollowed, removeCurrentUserFollowed, addFollower, removeFollower, } from '../../../store/actions';
import { Input, InputKinds, Button, ButtonKinds, ButtonStyles, } from '../../../common';
import defaulAvatar from '../../../images/default_avatar.png';
import './userprofile.scss';

export const Userprofile = ({ currentUser, user, currentUserFollowed, profileId, currentId, }) => {
  const [isFollowing, setIsFollowing,] = useState(Boolean(currentUserFollowed.find(user => user.id === profileId)));

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

  return (
    <div className='profile__user'>
      <div className='profile__user-avatar'>
        <div className='profile__user-title'>Avatar</div>
        <div className='profile__user-img'>
          <div className='profile__user-gray'></div>
          <img src={user.avatar ? 'http://127.0.0.1:8000' + user.avatar : defaulAvatar} alt='avatar' />
        </div>
        <div className='profile__user-subscriptions'>
          <div className='profile__user-followers'>Followers <span>{user.followersCount}</span></div>
          <div className='profile__user-followed'>Followed <span>{user.followedCount}</span></div>
        </div>
      </div>
      <div className='profile__user-info'>
        <div className='profile__user-item'>
          <div className='profile__user-title'>Username:</div>
          <div className='profile__user-username'>{user.user.username}</div>
        </div>
        <div className='profile__user-item'>
          <div className='profile__user-title'>Firstname:</div>
          <div className='profile__user-firstname'>{user?.firstname || 'Unknown'}</div>
        </div>
        <div className='profile__user-item'>
          <div className='profile__user-title'>Surname:</div>
          <div className='profile__user-surname'>{user?.surname || 'Unknown'}</div>
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
    </div>
  );
};
