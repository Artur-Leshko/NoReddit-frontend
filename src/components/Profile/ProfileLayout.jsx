import React, { useState, useEffect, } from 'react';
import { Route, Routes, useParams, Navigate, } from 'react-router-dom';
import { useSelector, useDispatch, } from 'react-redux';
import {
  userSelector,
  userFollowedSelector,
  anyUserSelector,
  followedSelector,
  followersSelector,
} from '../../store/selectors';
import { updateFollowers, updateFollowed, updateUser, updateCurrentUserFollowed, } from '../../store/actions';
import { getFollowers, getFollowed, getAnyUserProfile, } from '../../api';
import { Sidebar, } from './Sidebar';
import { Userprofile, } from './Userprofile/Userprofile';
import { Subscriptions, } from './Subscriptions/Subscriptions';
import { Loader, } from '../../common';
import './profilelayout.scss';

export const ProfileLayout = () => {
  const [isLoading, setIsLoading,] = useState({ isCurrentUserFollowedLoading: true, isInfoLoading: true, });
  const currentUser = useSelector(userSelector);
  const currentUserFollowed = useSelector(userFollowedSelector);
  const user = useSelector(anyUserSelector);
  const followers = useSelector(followersSelector);
  const followed = useSelector(followedSelector);

  const { profileId, } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(prevState => ({ ...prevState, isCurrentUserFollowedLoading: true, }));

    getFollowed(currentUser.id)
      .then(followed => updateCurrentUserFollowed(dispatch, followed.results))
      .finally(() => setTimeout(() => setIsLoading(prevState => ({ ...prevState, isCurrentUserFollowedLoading: false, })), 1000));
  }, []);

  useEffect(() => {
    setIsLoading(prevState => ({ ...prevState, isInfoLoading: true, }));

    Promise.all([
      getAnyUserProfile(profileId).then(user => updateUser(dispatch, user)),
      getFollowed(profileId).then(followed => updateFollowed(dispatch, followed.results)),
      getFollowers(profileId).then(followers => updateFollowers(dispatch, followers.results)),
    ]).finally(() => setTimeout(() => setIsLoading(prevState => ({ ...prevState, isInfoLoading: false, })), 1000));;
  }, [profileId,]);

  return (
    <div className='profile'>
      <div className='container'>
        <div className='profile__inner'>
          <Sidebar username={user.user?.username || null} currentId={currentUser.id} profileId={profileId} />
          {isLoading.isCurrentUserFollowedLoading || isLoading.isInfoLoading ? <Loader /> :
            <Routes>
              <Route
                index path=''
                element={
                  <Userprofile
                    currentUser={currentUser}
                    user={user}
                    currentUserFollowed={currentUserFollowed}
                    profileId={profileId}
                    currentId={currentUser.id}
                  />
                }
              />
              <Route
                path='followers'
                element={
                  <Subscriptions
                    title='Followers'
                    subscriptions={followers}
                  />
                }
              />
              <Route
                path='followed'
                element={
                  <Subscriptions
                    title='Followed'
                    subscriptions={followed}
                  />
                }
              />
              <Route path='*' element={<Navigate to='/not-found' replace />} />
            </Routes>
          }
        </div>
      </div>
    </div>
  );
};
