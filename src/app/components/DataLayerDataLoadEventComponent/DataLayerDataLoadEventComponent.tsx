'use client';

import React from 'react';

import useDataLayer from '~/lib/hooks/useDataLayer';

import { DataLayerDataLoadEventComponentProps } from './types';

export const DataLayerDataLoadEventComponent: React.FC<
  DataLayerDataLoadEventComponentProps
> = () => {
  useDataLayer();
  return <></>;
};
