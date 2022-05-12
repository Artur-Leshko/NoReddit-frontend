import React, { useState, } from 'react';
import { useNavigate, } from 'react-router-dom';
import {
  Input,
  InputKinds,
  Button,
  ButtonKinds,
  ButtonStyles,
  ErrorBlock,
  canBeSubmited,
  validateRegisterForm,
} from '../../common';
import { singUp, } from '../../api';
import './user.scss';

export const Register = () => {
  const [email, setEmail,] = useState('');
  const [username, setUsername,] = useState('');
  const [password, setPassword,] = useState('');
  const [passwordConfirmation, setPasswordConfirmation,] = useState('');
  const [registerMessage, setRegisterMessage,] = useState('');
  const [errors, setErrors,] = useState({
    email: [],
    username: [],
    password: [],
    passwordConfirmation: [],
  });

  const navigate = useNavigate();

  const onSignUp = event => {
    event.preventDefault();

    const newErrors = validateRegisterForm({ email, username, password, passwordConfirmation, });
    setErrors(newErrors);

    if (canBeSubmited(newErrors)) {
      singUp({ email, username, password, }).then(message => {
        setRegisterMessage(message);
        setTimeout(() => navigate('/login'), 3000);
      });
    }
  };

  return (
    <form className='box' method='post' onSubmit={(e) => e.preventDefault()}>
      <h1>Registration</h1>
      <Input
        kind={InputKinds.LOGIN}
        type='text'
        name='e-mail'
        placeholder='E-mail'
        autoComplete='off'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <ErrorBlock errorArr={errors.email} id={'email'} />
      <Input
        kind={InputKinds.LOGIN}
        type='text'
        name='e-mail'
        placeholder='Username'
        autoComplete='off'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <ErrorBlock errorArr={errors.username} id={'username'} />
      <Input
        kind={InputKinds.LOGIN}
        type='password'
        name='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <ErrorBlock errorArr={errors.password} id={'password'} />
      <Input
        kind={InputKinds.LOGIN}
        type='password'
        name='passwordConfirmation'
        placeholder='Repeat password'
        value={passwordConfirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
      />
      <ErrorBlock errorArr={errors.passwordConfirmation} id={'passwordConfirmation'} />
      {registerMessage ? <div className='auth__registration-message'>{registerMessage}</div> : null}
      <Button
        kind={ButtonKinds.LOGIN}
        style={ButtonStyles.SUCCESS}
        className='register-btn'
        type='submit'
        onClick={onSignUp}
      >
        Sign up
      </Button>
      <Button
        kind={ButtonKinds.LOGIN}
        style={ButtonStyles.CANCEL}
        className='cancel-btn'
        onClick={() => navigate('/login')}
      >
        Back to sign in
      </Button>
    </form>
  );
};
