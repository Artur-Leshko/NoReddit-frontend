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
import { Loader, } from '../../common';

export const ProfileLayout = () => {
  const [isLoading, setIsLoading,] = useState(true);
  const currentUser = useSelector(userSelector);
  const user = useSelector(anyUserSelector);
  const followers = useSelector(followersSelector);
  const followed = useSelector(followedSelector);

  const { profileId, } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);

    Promise.all([
      getAnyUserProfile(profileId).then(user => updateUser(dispatch, user)),
      getFollowed(profileId).then(followed => updateFollowed(dispatch, followed.results)),
      getFollowers(profileId).then(followers => updateFollowers(dispatch, followers.results)),
    ]).finally(() => setTimeout(() => setIsLoading(false), 1000));;
  }, [profileId,]);

  return (
    <div className='profile'>
      <div className='container'>
        <div className='profile__inner'>
          <Sidebar username={user.user?.username || null} currentId={currentUser.id} profileId={profileId} />
          {isLoading ? <Loader /> :
            <Routes>
              <Route
                index path=''
                element={
                  <Userprofile
                    user={user}
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
            </Routes>
          }
        </div>
      </div>
    </div>
  );
};
