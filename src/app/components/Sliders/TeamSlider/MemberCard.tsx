import Image from 'next/image';
import React from 'react';

import { MemberCardProps } from './types';

export const MemberCard: React.FC<MemberCardProps> = ({
  name,
  role,
  image,
}) => {
  return (
    <div>
      <div className="aspect-[270/286] overflow-hidden relative rounded-t-2xl">
        <Image fill={true} style={{ objectFit: 'cover' }} src={image} alt="" />
      </div>
      <div className="border-b border-x rounded-b-2xl py-6 px-4">
        <p className="text-sm uppercase text-tertiary pb-2">{name}</p>
        <p className="pb-0">{role}</p>
      </div>
    </div>
  );
};
