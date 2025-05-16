'use client';

import React, { createContext, useContext, useState } from 'react';

import { ContactForm } from '~/components/Contact';
import { Modal } from '~/components/Modal';

interface ModalContextType {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.classList.add('body-lock-scroll');
  };
  const closeModal = () => {
    setIsModalOpen(false);
    document.body.classList.remove('body-lock-scroll');
  };

  return (
    <ModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
      {children}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <ContactForm />
      </Modal>
    </ModalContext.Provider>
  );
};

export default ModalProvider;

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
