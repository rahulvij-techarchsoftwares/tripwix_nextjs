import React from 'react';

export enum ContainerVariant {
  Default = 'default',
  FullWidth = 'fullWidth',
  Fluid = 'fluid',
  Offset = 'offset',
  OffsetDesktopOnly = 'offset-desktop-only',
  Small = 'small',
}

export interface ContainerProps {
  children: React.ReactNode;
  type?: ContainerVariant;
  variant?: string;
  extraClasses?: string;
}
