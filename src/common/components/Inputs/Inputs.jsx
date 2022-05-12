import React, { useState, useEffect, useRef, } from 'react';
import clsx from 'clsx';
import './Inputs.scss';

export const InputKinds = {
  LOGIN: 'login',
  INFO: 'info',
};

export const TextareaKinds = {
  INFO: 'info',
};

export const SelectKinds = {
  INFO: 'info',
};

export const Input = ({ kind, className, ...others }) => {
  const inputClassname = clsx(['input', {
    'input-login': kind === InputKinds.LOGIN,
    'input-info': kind === InputKinds.INFO,
  },]) + ' ' + className;

  return (
    <input className={inputClassname} {...others} />
  );
};

export const Textarea = ({ kind, className, ...others }) => {
  const textareaClassname = clsx(['textarea', {
    'textarea-info': kind === TextareaKinds.INFO,
  },]) + ' ' + className;

  return (
    <textarea className={textareaClassname} {...others} />
  );
};

export const Select = ({ kind, className, items, selectedItemName, onItemChange, noItemText, ...others }) => {
  const selectClassname = clsx(['select', {
    'select-info': kind === SelectKinds.INFO,
  },]) + ' ' + className;

  const [isActive, setIsActive,] = useState(false);
  const selectRef = useRef();

  function subscribeEvent(e) {
    if (!selectRef.current.contains(e.target)) {
      setIsActive(false);
    }
  }

  useEffect(() => {
    window.addEventListener('click', subscribeEvent);

    return () => window.removeEventListener('click', subscribeEvent);
  }, []);

  return (
    <div
      className={`${selectClassname} ${isActive ? ' is-active' : ''}`}
      style={{ marginBottom: `${isActive ? '2px' : '0px'}`, }}
      onClick={() => setIsActive(!isActive)}
      ref={selectRef}
      {...others}
    >
      <div className='select__header'>
        <span className='select__current'>{selectedItemName}</span>
        <div className='select__icon'></div>
      </div>

      <div className='select__body'>
        <div className='select__item' key='item' onClick={() => onItemChange('')}>{noItemText}</div>
        {items ?
          items.map(item => (
            <div
              className='select__item'
              key={item.id}
              onClick={() => onItemChange(item.id)}
            >
              {item.name}
            </div>
          ))
          : null}
      </div>
    </div>
  );
};
