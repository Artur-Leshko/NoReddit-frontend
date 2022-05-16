import React from 'react';
import { NavLink, } from 'react-router-dom';
import './profile.scss';

export const Sidebar = ({ currentId, profileId, }) => {
  return (
    <div className='profile__sidebar'>
      <div className='profile__sidebar-line'></div>
      <ul className='profile__sidebar-list'>
        <li>
          <NavLink className={({ isActive, }) => isActive ? 'profile__sidebar-link profile__sidebar-link--active'
            : 'profile__sidebar-link'}
            to={`/noreddit/profile/${profileId}`}
          >
            My profile
          </NavLink>
        </li>
        <li>
          <NavLink className={({ isActive, }) => isActive ? 'profile__sidebar-link profile__sidebar-link--active'
            : 'profile__sidebar-link'}
            to='follower'>
            Followers
          </NavLink>
        </li>
        <li>
          <NavLink className={({ isActive, }) => isActive ? 'profile__sidebar-link profile__sidebar-link--active'
            : 'profile__sidebar-link'}
            to='followed'>
            Followed
          </NavLink>
        </li>
        <li>
          <NavLink className={({ isActive, }) => isActive ? 'profile__sidebar-link profile__sidebar-link--active'
            : 'profile__sidebar-link'}
            to={currentId === profileId ? '/noreddit/myposts' : 'posts'}
          >
            Posts
          </NavLink>
        </li>
      </ul>
    </div>
  );
};
