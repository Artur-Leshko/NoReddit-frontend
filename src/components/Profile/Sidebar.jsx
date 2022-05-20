import React from 'react';
import { NavLink, } from 'react-router-dom';
import './profilelayout.scss';

export const Sidebar = ({ username, currentId, profileId, }) => {
  return (
    <div className='profile__sidebar'>
      <div className='profile__sidebar-username'>{username?.length > 12 ? username.slice(0, 13) + '...' : username}</div>
      <ul className='profile__sidebar-list'>
        <li>
          <NavLink className={({ isActive, }) => isActive ? 'profile__sidebar-link profile__sidebar-link--active'
            : 'profile__sidebar-link'}
            end to=''
          >
            Profile
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
        <li>
          <NavLink className={({ isActive, }) => isActive ? 'profile__sidebar-link profile__sidebar-link--active'
            : 'profile__sidebar-link'}
            to='followers'>
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
      </ul>
    </div>
  );
};
