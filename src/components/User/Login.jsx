import React, { useState, } from 'react';
import { useNavigate, useLocation, } from 'react-router-dom';
import { AUTH_TOKEN_KEY, REFRESH_TOKEN_KEY, } from '../../config';
import {
  Input,
  InputKinds,
  Button,
  ButtonKinds,
  ButtonStyles,
} from '../../common';
import { signIn, } from '../../api';
import './user.scss';

export const Login = () => {
  const [email, setEmail,] = useState('');
  const [password, setPassword,] = useState('');
  const [error, setError,] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  const onSignIn = event => {
    event.preventDefault();

    signIn({ email, password, }).then(({ access, refresh, }) => {
      localStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(access));
      localStorage.setItem(REFRESH_TOKEN_KEY, JSON.stringify(refresh));

      if (location.state?.from) {
        navigate(location.state.from.pathname);
      } else {
        navigate('/');
      }
    }).catch(err => setError('Bad email or password'));
  };

  return (
    <form className='box' onSubmit={(e) => e.preventDefault()}>
      <h1>Login</h1>
      <Input
        kind={InputKinds.LOGIN}
        type='text'
        name='e-mail'
        placeholder='E-mail'
        autoComplete='off'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        kind={InputKinds.LOGIN}
        type='password'
        name='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error ? <span className='error-span' >{error}</span> : null}
      <Button
        kind={ButtonKinds.LOGIN}
        style={ButtonStyles.SUCCESS}
        type='submit'
        onClick={onSignIn}
      >
        Sign in
      </Button>
      <Button
        kind={ButtonKinds.LOGIN}
        style={ButtonStyles.SUCCESS}
        onClick={() => navigate('/register')}
      >
        Sign up
      </Button>
    </form>
  );
};
