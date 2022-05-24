import React, { useState, } from 'react';
import { ModalContext, } from './ModelContext';
import { Modal, } from '../../common';

export const ModalProvider = ({ children, }) => {
  const [closing, setClosing,] = useState(false);
  const [modalOpened, setModelOpened,] = useState(false);
  const [modalContent, setModalContent,] = useState(null);

  const openModal = (modalConfig) => {
    setModalContent(modalConfig);
    setModelOpened(true);
  };

  const closeModal = () => {
    setClosing(true);

    const closeTimeout = setTimeout(() => {
      setModelOpened(false);
      clearTimeout(closeTimeout);
      setClosing(false);
    }, 300);
  };

  const modalProviderValue = {
    openModal,
    closeModal,
    closing,
  };

  return (
    <ModalContext.Provider value={modalProviderValue}>
      {modalOpened && <Modal {...modalContent} />}
      {children}
    </ModalContext.Provider>
  );
};
