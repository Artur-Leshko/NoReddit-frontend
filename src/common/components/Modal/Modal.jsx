import React, { useContext, } from 'react';
import { ModalContext, } from '../../../contexts';
import './modal.scss';

export const Modal = ({ children, title, }) => {
  const { closeModal, closing, } = useContext(ModalContext);

  const backgroundClass = closing ? 'background background-hide' : 'background';

  return (
    <div className={backgroundClass} onClick={closeModal}>
      <div className='modal' onClick={(e) => e.stopPropagation()}>
        <div className='modal-header'>
          {title}
        </div>
        <div className='modal-body'>
          {children}
        </div>
      </div>
    </div>
  );
};
