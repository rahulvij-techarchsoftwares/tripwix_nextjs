'use client';

import './styles.css';

import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

import { CustomIcon } from '~/components/CustomIcon';
import { ASSET_PATHS } from '~/configs/assetPaths';

import { QuantitySelectorProps } from './types';

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  value = 0,
  extraClasses = '',
  onChange = () => {},
  min = 1,
  max = 40,
  step = 1,
  singularDescription = 'Guest',
  pluralDescription = 'Guests',
  placeholder = 'Select',
  iconVariant,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [val, setVal] = useState(value > max ? max : value);
  const selectRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      selectRef.current &&
      !selectRef.current?.contains(event?.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleIncrement = () => {
    if (val + step <= max) {
      setVal(val + step);
      onChange(val + step);
    }
  };

  const handleDecrement = () => {
    if (val - step >= min) {
      setVal(val - step);
      onChange(val - step);
    }
  };

  const description = val === 1 ? singularDescription : pluralDescription;

  return (
    <div className="quantity-select-container">
      <div
        className={`quantity-select w-full ${isOpen ? 'open' : ''}`}
        tabIndex={0}
        ref={selectRef}
        onClick={() => {
          setIsOpen(prev => !prev);
        }}
      >
        <div
          className={`transition-colors quantity-select-trigger flex flex-row gap-2 justify-between ${extraClasses}`}
        >
          {iconVariant && (
            <CustomIcon
              className="flex-shrink-0"
              height={18}
              icon={iconVariant}
            />
          )}
          <p
            className={`${isOpen ? 'text-success' : ''} inline-block pb-0 flex-grow overflow-hidden whitespace-nowrap text-ellipsis`}
          >
            {val > 0 ? (
              <span
                className={`${isOpen ? 'text-success' : ''} whitespace-nowrap inline-block`}
              >
                {val} {description}
              </span>
            ) : (
              <span className="whitespace-nowrap inline-block text-gray-500">
                {placeholder}
              </span>
            )}
          </p>
          <Image
            className={`flex-shrink-0 right-2 quantity-select-chevron ${isOpen ? 'open rotate-180' : ''}`}
            src={ASSET_PATHS.CHEVRON_DOWN_DARK}
            height={10}
            width={10}
            alt="chevron down"
          />
        </div>
        <div
          className={`flex flex-row quantity-select-options text-primary rounded-2xl py-4 px-4 gap-2 ${isOpen ? 'open' : ''}`}
          onClick={e => e.stopPropagation()}
        >
          <button
            className={`border border-tertiary-20 rounded-2xl inline-flex items-center w-10 justify-center ${val <= min ? 'opacity-25' : ''}`}
            type="button"
            onClick={handleDecrement}
            disabled={val == null || val <= min}
          >
            <Image
              src={'/assets/minus.svg'}
              alt="minus"
              width={12}
              height={12}
            />
          </button>
          <input
            className="text-center border border-tertiary-20 rounded-full"
            type="number"
            min={min}
            max={max}
            value={val != 0 ? val : min}
            readOnly
          />
          <button
            className={`border border-tertiary-20 rounded-2xl w-10 inline-flex flex-row items-center justify-center ${val >= max ? 'opacity-25' : ''}`}
            type="button"
            onClick={handleIncrement}
            disabled={val >= max}
          >
            <Image src={'/assets/plus.svg'} alt="plus" width={12} height={12} />
          </button>
        </div>
      </div>
    </div>
  );
};
