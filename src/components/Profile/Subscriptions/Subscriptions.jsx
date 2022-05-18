import React from 'react';
import { Link, } from 'react-router-dom';
import defaultAvatar from '../../../images/default_avatar.png';
import './subscriptions.scss';

export const Subscriptions = ({ title, subscriptions, }) => {
  return (
    <div className='profile__subscriptions'>
      <div className='profile__subscriptions-title'>{title}</div>
      {subscriptions.length > 0 ?
        <ul className='profile__subscriptions-list'>
          {subscriptions.map(subscription => {
            const name = subscription.firstname && subscription.surname ?
              subscription.firstname + ' ' + subscription.surname
              : subscription.username;
            return (
              <li key={subscription.id}>
                <div className='profile__subscriptions-info'>
                  <div className='profile__subscriptions-img'>
                    <img src={subscription.avatar ? 'http://127.0.0.1:8000' + subscription.avatar
                      : defaultAvatar} alt='avatar' />
                  </div>
                  <div className='profile__subscriptions-name'>
                    {name}
                  </div>
                </div>
                <Link
                  to={`/noreddit/profile/${subscription.id}`}
                  className='profile__subscriptions-arrow'
                >
                  <div className='profile__subscriptions-arrow--top'></div>
                  <div className='profile__subscriptions-arrow--right'></div>
                </Link>
              </li>
            );
          })}
        </ul>
        : <div className='profile__subscriptions-noitems'>The list is empty :(</div>
      }
    </div>
  );
};
