import Image from 'next/image';
import React from 'react';

import { CustomImageProps } from './types';

export const CustomImage: React.FC<CustomImageProps> = ({
  imageSrc,
  extraClassNames,
}) => {
  return (
    <div className={`relative w-20 h-20 ${extraClassNames}`}>
      <Image src={imageSrc} alt="" fill style={{ objectFit: 'cover' }} />
    </div>
  );
};
