import React, { useState, useEffect, } from 'react';
import { useParams, } from 'react-router-dom';
import { useDispatch, useSelector, } from 'react-redux';
import { anyUserSelector, } from '../../../store/selectors';
import { getAnyUserProfile, } from '../../../api';
import { updateUser, } from '../../../store/actions';
import { Input, InputKinds, Button, ButtonKinds, ButtonStyles, Loader, } from '../../../common';
import defaulAvatar from '../../../images/default_avatar.png';
import './userprofile.scss';

export const Userprofile = () => {
  const [isLoading, setIsLoading,] = useState(true);
  const user = useSelector(anyUserSelector);

  const { profileId, } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    getAnyUserProfile(profileId).then(user => updateUser(dispatch, user)).finally(() => setTimeout(() => setIsLoading(false), 1000));
  }, [profileId,]);

  return (
    isLoading ? <Loader /> :
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
        </div>
      </div>
  );
};
