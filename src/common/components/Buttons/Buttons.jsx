import clsx from 'clsx';
import React from 'react';
import { Link, useLocation, } from 'react-router-dom';
import './Buttons.scss';

export const ButtonKinds = {
  LOGIN: 'login',
  INFO: 'info',
  ADD: 'add',
};

export const ButtonStyles = {
  CANCEL: 'cancel',
  SUCCESS: 'success',
  DELETE: 'delete',
};

export const Button = ({ kind, style, className, path, text, ...others }) => {
  const buttonClassname =
    clsx([
      'btn',
      {
        'btn-cancel': style === ButtonStyles.CANCEL,
        'btn-success': style === ButtonStyles.SUCCESS,
        'btn-delete': style === ButtonStyles.DELETE,
      },
      {
        'btn-login': kind === ButtonKinds.LOGIN,
        'btn-info': kind === ButtonKinds.INFO,
        'btn-add': kind === ButtonKinds.ADD,
      },
    ]) +
    ' ' +
    className;

  const location = useLocation();

  return kind === ButtonKinds.ADD ? (
    <Link
      to={{
        pathname: path,
        state: {
          location: location,
        },
      }}
      className={buttonClassname}
    >
      <div className='button__cross'>
        <div className='button__cross-left'></div>
        <div className='button__cross-right'></div>
      </div>
      <p className='button__text'>{text}</p>
    </Link>
  ) : (
    <button className={buttonClassname} {...others} />
  );
};
