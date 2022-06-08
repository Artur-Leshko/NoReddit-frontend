import React, { useState, useEffect, } from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { Link, useNavigate, } from 'react-router-dom';
import { getSearchedUsers, } from '../../api';
import { updateAllUsers, } from '../../store/actions';
import { allUsersSelector, } from '../../store/selectors';
import { Loader, Input, InputKinds, } from '../../common';
import defaultAvatar from '../../images/default_avatar.png';
import './user.scss';

export const UsersList = () => {
  const users = useSelector(allUsersSelector);
  const [isLoading, setIsLoading,] = useState(true);
  const [searchText, setSearchText,] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onInputChange = (e) => {
    const newValue = e?.target?.value || '';

    setIsLoading(true);
    setSearchText(newValue);

    getSearchedUsers({ search: newValue, })
      .then(users => updateAllUsers(dispatch, users.results))
      .finally(() => setTimeout(() => setIsLoading(false), 1000));
  };

  useEffect(() => {
    onInputChange();
  }, []);

  return (
    <div className='users'>
      <div className='container'>
        <div className='users__inner'>
          <div className='users__inner-title'>Users</div>
          <div className='users__inner-search'>
            <Input
              kind={InputKinds.INFO}
              value={searchText}
              onChange={onInputChange}
              placeholder='Search users ...'
            />
          </div>
          {isLoading ? <Loader />
            : users.length > 0 ?
              <ul className='users__inner-list'>
                {users.map(user => {
                  const name = user.firstname && user.surname ?
                    user.firstname + ' ' + user.surname
                    : user.username;

                  return (
                    <li key={user.id} className='users__list-item'>
                      <div className='users__list-info'>
                        <div className='users__list-img'>
                          <img src={user?.avatar || defaultAvatar} alt='avatar' />
                        </div>
                        <div className='users__list-name'>
                          {name}
                        </div>
                      </div>
                      <Link
                        to={`/noreddit/profile/${user.id}`}
                        className='users__list-arrow'
                      >
                        <div className='users__list-arrow--top'></div>
                        <div className='users__list-arrow--right'></div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              : <div className='users__inner-nousers'>There is no such a user you're looking for :(</div>
          }
        </div>
      </div>
    </div>
  );
};
