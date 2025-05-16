'use client';
import React from 'react';

import { CustomIcon, CustomIconVariant } from '~/components/CustomIcon';

import { DrawerProps, DrawerVariant } from './types';

const getVariantClasses = (variant: DrawerVariant, isOpen: boolean) => {
  switch (variant) {
    case DrawerVariant.Right:
      return isOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0';
    case DrawerVariant.Top:
      return isOpen ? 'translate-y-0' : '-translate-y-full md:translate-y-0';
    case DrawerVariant.Bottom:
      return isOpen ? 'translate-y-0' : 'translate-y-full md:translate-y-0';
    case DrawerVariant.Left:
    default:
      return isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0';
  }
};

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  children,
  variant = DrawerVariant.Left,
}) => {
  const offset = '0'; // '12', offset for the drawer (tailwind sizes, including full)
  const positionClasses = {
    left: 'left-0',
    right: 'right-0',
    top: 'top-0',
    bottom: 'bottom-0',
  };
  const positionClasses2 = {
    left: `h-full mr-${offset} md:mr-0`,
    right: `h-full ml-${offset} md:ml-0`,
    top: `h-full mb-${offset} md:mb-0`,
    bottom: `h-full mt-${offset} md:mt-0`,
  };

  return (
    <div
      className={`fixed md:relative inset-0 z-50 pb-8 md:z-auto transition-transform transform ${getVariantClasses(variant, isOpen)}`}
    >
      {/* <div className="absolute inset-0 bg-black opacity-50"></div> */}
      <div
        className={`absolute md:relative h-full w-full overflow-hidden ${positionClasses[variant]}`}
        onClick={() => onClose()}
      >
        <CustomIcon
          icon={CustomIconVariant.CloseColored}
          height={20}
          onClick={() => onClose()}
          className="responsive-filters-toggle-button--close border shadow rounded-full text-success p-2 w-10 h-10 left-auto top-6 right-6 absolute bg-white z-10 md:hidden"
        />
        <div
          className={`bg-white overflow-auto shadow-2xl md:shadow-none p-4 md:p-0 ${positionClasses2[variant]}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
