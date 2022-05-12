import React from 'react';
import { Link, } from 'react-router-dom';
import { Button, ButtonKinds, ButtonStyles, } from '../../common';
import defaulAvatar from '../../images/default_avatar.png';
import './header.scss';

export const Header = () => {
  return (
    <header className='header'>
      <div className='container'>
        <div className='header__logo'>
          <Link to='/'>NOReddit</Link>
        </div>
        <nav className='header__navigation'>
          <ul>
            <li>
              <Link className='header__navigation-link'>Do</Link>
            </li>
            <li>
              <Link className='header__navigation-link'>Re</Link>
            </li>
            <li>
              <Link className='header__navigation-link'>Me</Link>
            </li>
            <li>
              <Link className='header__navigation-link'>Fa</Link>
            </li>
            <li>
              <Link className='header__navigation-link'>Sol</Link>
            </li>
          </ul>
        </nav>
        <div className='header__user'>
          <div className='header__user-img'>
            <Link>
              <img src={defaulAvatar} alt='default user avatar' />
            </Link>
          </div>
          <div className='header__user-username'>MyName</div>
          <Button
            style={ButtonStyles.DELETE}
            kind={ButtonKinds.INFO}
            className='header__user-logout'
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};
