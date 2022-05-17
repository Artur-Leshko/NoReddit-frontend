import React, { useState, useEffect, } from 'react';
import { Route, Routes, useParams, } from 'react-router-dom';
import { useSelector, useDispatch, } from 'react-redux';
import { userSelector, anyUserSelector, followedSelector, followersSelector, } from '../../store/selectors';
import { updateFollowers, updateFollowed, updateUser, } from '../../store/actions';
import { getFollowers, getFollowed, getAnyUserProfile, } from '../../api';
import { Sidebar, } from './Sidebar';
import { Userprofile, } from './Userprofile/Userprofile';
import { Subscriptions, } from './Subscriptions/Subscriptions';
import './profilelayout.scss';

export const ProfileLayout = () => {
  const [isUserLoading, setIsUserLoading,] = useState(true);
  const currentUser = useSelector(userSelector);
  const user = useSelector(anyUserSelector);

  const { profileId, } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    setIsUserLoading(true);
    getAnyUserProfile(profileId).then(user => updateUser(dispatch, user)).finally(() => setTimeout(() => setIsUserLoading(false), 1000));
  }, [profileId,]);

  return (
    <div className='profile'>
      <div className='container'>
        <div className='profile__inner'>
          <Sidebar username={user.user?.username || null} currentId={currentUser.id} profileId={profileId} />
          <Routes>
            <Route
              index path=''
              element={
                <Userprofile
                  isLoading={isUserLoading}
                  user={user}
                />
              }
            />
            <Route
              path='followers'
              element={
                <Subscriptions
                  title='Followers'
                  getSubscriptions={getFollowers}
                  updateSubscriptions={updateFollowers}
                  subscriptionsSelector={followersSelector}
                />
              }
            />
            <Route
              path='followed'
              element={
                <Subscriptions
                  title='Followed'
                  getSubscriptions={getFollowed}
                  updateSubscriptions={updateFollowed}
                  subscriptionsSelector={followedSelector}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};
