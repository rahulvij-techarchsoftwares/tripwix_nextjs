import './styles.css';

import React from 'react';

import { ContainerProps, ContainerVariant } from './types';

export const Container: React.FC<ContainerProps> = ({
  children,
  variant = ContainerVariant.Default,
  extraClasses = '',
}) => {
  let baseContainer = 'w-[90%] m-auto';
  let width = 'w-[90%] m-auto max-w-[1200px]';

  switch (variant) {
    case ContainerVariant.Default:
      width = `${baseContainer} max-w-[1200px]`;
      break;
    case ContainerVariant.FullWidth:
      width = `${baseContainer} 100%`;
      break;
    case ContainerVariant.Fluid:
      width = `${baseContainer} max-w-[1300px]`;
      break;
    case ContainerVariant.Small:
      width = `${baseContainer} max-w-[860px]`;
      break;
    case ContainerVariant.Offset:
      width = 'offset-container';
      break;
    case ContainerVariant.OffsetDesktopOnly:
      width = `${baseContainer} md:w-full offset-container offset-container--desktop-only`;
      break;
  }

  return (
    <div className={`overflow-hidden ${extraClasses}`}>
      <div className={`${width}`}>{children}</div>
    </div>
  );
};
