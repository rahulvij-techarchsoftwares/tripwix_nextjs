import React from 'react';

import { PropertyPrice } from '~/types/globalTypes';

export interface BookingFrameProps {
  price: PropertyPrice;
  children: React.ReactNode;
}
