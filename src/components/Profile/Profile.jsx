import React, { useState, useEffect, } from 'react';
import { useParams, } from 'react-router-dom';
import { useDispatch, useSelector, } from 'react-redux';
import { anyUserSelector, userSelector, } from '../../store/selectors';
import { getAnyUserProfile, } from '../../api';
import { updateUser, } from '../../store/actions';
import { Input, InputKinds, Button, ButtonKinds, ButtonStyles, Loader, } from '../../common';
import { Sidebar, } from './Sidebar';
import defaulAvatar from '../../images/default_avatar.png';
import './profile.scss';

export const Profile = () => {
  const [isLoading, setIsLoading,] = useState(true);
  const currentUser = useSelector(userSelector);
  const user = useSelector(anyUserSelector);

  const { profileId, } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    getAnyUserProfile(profileId).then(user => updateUser(dispatch, user)).finally(() => setTimeout(() => setIsLoading(false), 1000));
  }, [profileId,]);

  return (
    <div className='profile'>
      <div className='container'>
        <div className='profile__inner'>
          <Sidebar currentId={currentUser.id} profileId={profileId} />
          {isLoading ? <Loader /> :
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
          }
        </div>
      </div>
    </div>
  );
};
