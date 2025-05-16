import React from 'react';

import { BooleanToggleProps } from './types';

export const BooleanToggle: React.FC<BooleanToggleProps> = ({
  value,
  onChange,
}) => {
  return (
    <button
      className={`relative w-[46px] h-[24px] rounded-xl flex flex-row items-center justify-center ${value ? 'bg-primary' : 'bg-tertiary'} transition-all duration-300`}
      onClick={onChange}
    >
      <span
        className={`w-[20px] h-[20px] rounded-full bg-white z-10 inline-block ${value ? 'translate-x-[50%]' : '-translate-x-[50%]'} transition-all duration-600`}
      />
    </button>
  );
};
