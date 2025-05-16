'use client';

import './styles.css';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import { baseStyles, ButtonVariants } from '~/components/CTA';
import { ChevronDownSVG } from '~/components/SVG';
import { ASSET_PATHS } from '~/configs/assetPaths';
import { capitalizeText } from '~/lib/utils';

import { DestinationSelectProps, Option } from './types';

export const DestinationSelect: React.FC<DestinationSelectProps> = ({
  options,
  countryValue,
  regionValue,
  placeholder,
  variant = ButtonVariants.Dropdown,
  extraClasses = '',
  onChange = () => {},
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(
    options.find(option => option.value === countryValue)?.label ||
      placeholder ||
      'Select...'
  );

  const handleSelect = (option: Option) => {
    setSelectedLabel(option.label);
    setIsOpen(false);
  };

  useEffect(() => {
    if (!countryValue || countryValue === 'null') {
      setSelectedLabel(placeholder || 'Select...');
      return;
    }
    setSelectedLabel(
      options.find(option => option.value === countryValue)?.label || 'Select'
    );
  }, [options, placeholder, countryValue, regionValue]);

  return (
    <div className="relative pt-[4px]">
      <div
        tabIndex={0}
        onBlur={() => {
          setIsOpen(false);
        }}
        onClick={() => {
          setIsOpen(prev => !prev);
        }}
      >
        <div
          className={`transition-colors flex flex-row ${baseStyles[variant]} ${extraClasses}`}
        >
          <span
            className={`${isOpen ? `${variant === ButtonVariants.DropdownFooter ? 'text-white' : 'text-success'}` : ''} inline-block`}
          >
            {selectedLabel}
          </span>
          <Image
            className={`right-2 custom-select-chevron ${isOpen ? 'open rotate-180' : ''}`}
            src={
              variant === ButtonVariants.DropdownFooter
                ? ASSET_PATHS.CHEVRON_DOWN_WHITE
                : ASSET_PATHS.CHEVRON_DOWN_DARK
            }
            height={10}
            width={10}
            alt="chevron down"
          />
        </div>
        <div
          className={`absolute top-12 bg-white border text-primary rounded-2xl py-4 ${isOpen ? '' : 'hidden'}`}
        >
          {options.map(option => (
            <div
              key={option.value}
              className="relative text-primary group hover:text-success flex flex-row justify-between items-center custom-select-option cursor-pointer"
              onClick={e => {
                handleSelect(option);
                onChange({ country: option.value, region: '' });
                e.stopPropagation();
              }}
            >
              {option.label}
              <div className="absolute z-20 -top-4 left-full hidden group-hover:block pl-4">
                <div className="bg-white rounded-2xl py-4 text-left w-40 border">
                  {option.destinations.map(destination => (
                    <div
                      key={destination.id}
                      className="text-primary hover:text-success flex flex-row justify-between items-center custom-select-option cursor-pointer"
                      onClick={e => {
                        handleSelect(option);
                        onChange({
                          country: option.value,
                          region: destination.id,
                        });
                        e.stopPropagation();
                      }}
                    >
                      {capitalizeText(destination.name)}
                    </div>
                  ))}
                </div>
              </div>
              <ChevronDownSVG extraClasses="-rotate-90 ml-4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
