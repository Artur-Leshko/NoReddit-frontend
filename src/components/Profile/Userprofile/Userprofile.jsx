import React, { useState, useRef, } from 'react';
import { useDispatch, } from 'react-redux';
import { subscribeOnUser, unsubscribeFromUser, updateUserProfile, } from '../../../api';
import {
  updateCurrentUser,
  updateUser,
  addCurrentUserFollowed,
  removeCurrentUserFollowed,
  addFollower,
  removeFollower,
} from '../../../store/actions';
import {
  Button, ButtonKinds, ButtonStyles,
  Input, InputKinds, canBeSubmited, ErrorBlock, validateUsernameForm,
} from '../../../common';
import defaulAvatar from '../../../images/default_avatar.png';
import './userprofile.scss';

const UserField = ({ title, inputValue, fieldValue, fieldName, errors, isEditMode, setField, }) => {
  return (
    <div className='profile__user-item'>
      <div className='profile__user-title'>{title}: </div>
      {isEditMode ?
        <Input
          kind={InputKinds.INFO}
          placeholder={title}
          onChange={(e) => setField(e.target.value)}
          value={inputValue}
        />
        : <div className={`profile__user-${fieldName}`}>{fieldValue}</div>
      }
      <div className='profile__user-errors'>
        <ErrorBlock errorArr={errors || []} id={fieldName} />
      </div>
    </div>
  );
};

export const Userprofile = ({ currentUser, user, currentUserFollowed, profileId, currentId, }) => {
  const [username, setUsername,] = useState(user.user.username);
  const [firstname, setFirstname,] = useState(user.firstname);
  const [surname, setSurname,] = useState(user.surname);
  const [avatar, setAvatar,] = useState(user.avatar ? 'http://127.0.0.1:8000' + user.avatar : defaulAvatar);
  const [changedAvatar, setChangedAvatar,] = useState({ file: null, avatar, });
  const [isAvatarChanged, setIsAvatartChanged,] = useState(false);
  const [isEditMode, setIsEditMode,] = useState(false);
  const [isFollowing, setIsFollowing,] = useState(Boolean(currentUserFollowed.find(user => user.id === profileId)));
  const [errors, setErrors,] = useState({
    username: [],
  });

  const inputRef = useRef();
  const dispatch = useDispatch();

  const onSubscribe = (e) => {
    e.preventDefault();

    if (isFollowing) {
      unsubscribeFromUser(profileId)
        .then(user => {
          updateUser(dispatch, user);
          removeCurrentUserFollowed(dispatch, user);
          removeFollower(dispatch, currentUser);
          setIsFollowing(false);
        });
    } else {
      subscribeOnUser(profileId)
        .then(user => {
          updateUser(dispatch, user);
          addCurrentUserFollowed(dispatch, user);
          addFollower(dispatch, currentUser);
          setIsFollowing(true);
        });
    }
  };

  const onAvatartChange = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onload = event => {
      const src = event.target.result;
      setChangedAvatar({ file, avatar: src, });
      setIsAvatartChanged(true);
    };

    reader.readAsDataURL(file);
  };

  const onSave = (e) => {
    e.preventDefault();

    const newErrors = validateUsernameForm(username);
    setErrors(newErrors);

    if (canBeSubmited(newErrors)) {
      let bodyFormData = new FormData();
      bodyFormData.append('username', username);
      bodyFormData.append('firstname', firstname);
      bodyFormData.append('surname', surname);
      if (isAvatarChanged) bodyFormData.append('avatar', changedAvatar.file);

      updateUserProfile(bodyFormData)
        .then(currentUser => {
          updateCurrentUser(dispatch, currentUser);
          updateUser(dispatch, currentUser);
          setAvatar('http://127.0.0.1:8000' + currentUser.avatar);
          setErrors({ username: [], });
          setIsEditMode(false);
          setIsAvatartChanged(false);
        });
    }
  };

  return (
    <div className='profile__user'>
      <div className='profile__user-avatar'>
        <div className='profile__user-title'>Avatar</div>
        <div className='profile__user-img'>
          <div
            className={`profile__user-gray${!isEditMode ? '--hidden' : ''}`}
            onClick={e => currentId === profileId ? inputRef.current.click() : null}>
          </div>
          <input
            type='file'
            accept='.png,.jpg,.jpeg'
            className='profile__avatar-input--hidden'
            ref={inputRef}
            onChange={e => onAvatartChange(e)}
          />
          <img src={!isEditMode ? avatar : changedAvatar.avatar} alt='avatar' />
        </div>
        <div className='profile__user-subscriptions'>
          <div className='profile__user-followers'>Followers <span>{user.followersCount}</span></div>
          <div className='profile__user-followed'>Followed <span>{user.followedCount}</span></div>
        </div>
      </div>
      <div className='profile__user-info'>
        <UserField
          title='Username'
          inputValue={username}
          fieldValue={user.user.username}
          fieldName='username'
          isEditMode={isEditMode}
          setField={setUsername}
          errors={errors.username}
        />
        <UserField
          title='Firstname'
          inputValue={firstname}
          fieldValue={user.firstname}
          fieldName='firstname'
          isEditMode={isEditMode}
          setField={setFirstname}
        />
        <UserField
          title='Surname'
          inputValue={surname}
          fieldValue={user.surname}
          fieldName='surname'
          isEditMode={isEditMode}
          setField={setSurname}
        />
        {currentId !== profileId ?
          <div className='profile__user-item'>
            <Button
              kind={ButtonKinds.LOGIN}
              style={isFollowing ? ButtonStyles.DELETE : ButtonStyles.SUCCESS}
              className='profile__user-subscribe'
              onClick={onSubscribe}
            >
              {isFollowing ? 'Unsubscribe' : 'Subscribe'}
            </Button>
          </div>
          : null
        }
        {currentId === profileId ?
          <div className='profile__btns'>
            {!isEditMode ?
              <Button
                kind={ButtonKinds.INFO}
                style={ButtonStyles.CANCEL}
                className='profile__btns-edit'
                onClick={(e) => setIsEditMode(true)}
              >
                Edit profile
              </Button>
              :
              <>
                <Button
                  kind={ButtonKinds.INFO}
                  style={ButtonStyles.SUCCESS}
                  className='profile__btns-save'
                  onClick={onSave}
                >
                  Save
                </Button>
                <Button
                  kind={ButtonKinds.INFO}
                  style={ButtonStyles.CANCEL}
                  className='profile__btns-cancel'
                  onClick={(e) => {
                    setErrors({ username: [], });
                    setIsEditMode(false);
                  }}
                >
                  Cancel
                </Button>
              </>
            }
          </div>
          : null
        }
      </div>
    </div>
  );
};
