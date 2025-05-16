import Image from 'next/image';
import React from 'react';

import { ASSET_PATHS } from '~/configs/assetPaths';
import { capitalizeText } from '~/lib/utils';

import { CustomCheckboxProps } from './types';

export const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  label,
  checked = false,
  onChange,
  extraClasses,
  capitalizeLabel = true,
}) => {
  return (
    <div className={`flex items-center justify-between w-full ${extraClasses}`}>
      <label className="relative flex flex-row items-center group hover:cursor-pointer">
        <input
          className={'absolute min-w-4 w-4 h-4 invisible z-10'}
          type="checkbox"
          checked={checked}
          onChange={e => {
            onChange(e.target.checked);
          }}
        />
        <span
          className={`${checked ? 'bg-success' : ''} transition border border-tertiary-10 group-hover:border-success mr-2 min-w-4 w-4 h-4 flex flex-row items-center justify-center`}
        >
          <Image
            className="pb-0.5"
            src={ASSET_PATHS.CHECK}
            height={10}
            width={10}
            alt="check"
          />
        </span>
        {capitalizeLabel ? (
          <span className="inline-block text-sm text-tertiary">
            {capitalizeText(label)}
          </span>
        ) : (
          <span className="inline-block text-xs text-tertiary">{label}</span>
        )}
      </label>
    </div>
  );
};
