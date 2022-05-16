import React, { useState, useEffect, } from 'react';
import { useParams, } from 'react-router-dom';
import { useDispatch, useSelector, } from 'react-redux';
import { Loader, } from '../../../common';
import './subscriptions.scss';

export const Subscriptions = ({ title, getSubscriptions, updateSubscriptions, subscriptionsSelector, }) => {
  const subscriptions = useSelector(subscriptionsSelector);
  const [isLoading, setIsLoading,] = useState(true);

  const { profileId, } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    getSubscriptions(profileId).then(subscriptions => updateSubscriptions(dispatch, subscriptions.results)).finally(() => setTimeout(() => setIsLoading(false), 1000));
  }, [profileId, title,]);

  return (
    isLoading ? <Loader /> :
      <div className='profile__subscriptions'>
        <div className='profile__subscriptions-title'>{title}</div>
        {subscriptions.length > 0 ?
          <ul className='profile__subscriptions-list'>
            {subscriptions.map(subscription => {

              return (
                <li key={subscription.id}>
                  {subscription.id}
                </li>
              );
            })}
          </ul>
          : <div className='profile__subscriptions-noitems'></div>
        }
      </div>
  );
};
