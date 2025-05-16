import './styles.css';

import React from 'react';
import ReactModal from 'react-modal';

import { CustomIcon, CustomIconVariant } from '~/components/CustomIcon';

import { ModalProps } from './types';

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onRequestClose,
  contentLabel,
  children,
  overlayClassName = 'modal-overlay',
  extraClasses = 'responsive-modal modal rounded-2xl',
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={contentLabel}
      className={extraClasses}
      overlayClassName={overlayClassName}
      ariaHideApp={false}
    >
      <CustomIcon
        icon={CustomIconVariant.Close}
        height={20}
        onClick={() => onRequestClose()}
        className="filter-primary float-right"
      />
      {children}
    </ReactModal>
  );
};

export default Modal;
