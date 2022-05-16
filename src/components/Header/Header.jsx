import React from 'react';
import { Link, } from 'react-router-dom';
import { useDispatch, } from 'react-redux';
import { logoutUser, } from '../../store/actions';
import { Button, ButtonKinds, ButtonStyles, } from '../../common';
import { AUTH_TOKEN_KEY, REFRESH_TOKEN_KEY, } from '../../config';
import defaulAvatar from '../../images/default_avatar.png';
import './header.scss';

export const Header = () => {
  const dispatch = useDispatch();

  const onLogout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    logoutUser(dispatch);
  };

  return (
    <header className='header'>
      <div className='container'>
        <div className='header__inner'>
          <div className='header__logo'>
            <Link to='/'>
              <span className='header__logo-white'>N</span>
              <span className='header__logo-red'>O</span>
              <span className='header__logo-white'>R</span>
              <span className='header__logo-black'>e</span>
              <span className='header__logo-black'>d</span>
              <span className='header__logo-white'>d</span>
              <span className='header__logo-red'>i</span>
              <span className='header__logo-white'>t</span>
            </Link>
          </div>
          <nav className='header__navigation'>
            <ul className='header__navigation-list'>
              <li>
                <Link to='categories' className='header__navigation-link'>Post categories</Link>
              </li>
              <li>
                <Link to='myposts' className='header__navigation-link'>My posts</Link>
              </li>
            </ul>
          </nav>
          <div className='header__user'>
            <div className='header__user-username'>
              <Link to='profile'>
                MyName
              </Link>
            </div>
            <div className='header__user-img'>
              <Link to='profile' className='header__user-gray'></Link>
              <img src={defaulAvatar} alt='default user avatar' />
            </div>
            <Button
              style={ButtonStyles.DELETE}
              kind={ButtonKinds.INFO}
              className='header__user-logout'
              onClick={() => onLogout()}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
