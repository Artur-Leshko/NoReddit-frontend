import React from 'react';
import { Route, Routes, useParams, } from 'react-router-dom';
import { useSelector, } from 'react-redux';
import { userSelector, followedSelector, followersSelector, } from '../../store/selectors';
import { updateFollowers, updateFollowed, } from '../../store/actions';
import { getFollowers, getFollowed, } from '../../api';
import { Sidebar, } from './Sidebar';
import { Userprofile, } from './Userprofile/Userprofile';
import { Subscriptions, } from './Subscriptions/Subscriptions';
import './profilelayout.scss';

export const ProfileLayout = () => {
  const currentUser = useSelector(userSelector);

  const { profileId, } = useParams();

  return (
    <div className='profile'>
      <div className='container'>
        <div className='profile__inner'>
          <Sidebar currentId={currentUser.id} profileId={profileId} />
          <Routes>
            <Route index path='' element={<Userprofile />} />
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
