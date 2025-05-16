'use client';

import './styles.css';

import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

import { baseStyles, ButtonVariants } from '~/components/CTA';
import { ChevronDownSVG } from '~/components/SVG';
import { ASSET_PATHS } from '~/configs/assetPaths';

import { CustomSelectProps, Option } from './types';

export const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  placeholder,
  variant = ButtonVariants.Dropdown,
  extraClasses = '',
  onChange = () => {},
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [maintaingInViewport, setMaintainInViewport] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(
    options.find(option => option.value === value)?.label ||
      placeholder ||
      'Select...'
  );

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (option: Option) => {
    setSelectedLabel(option.label);
    setIsOpen(false);
  };

  useEffect(() => {
    if (!value || value === 'null') {
      setSelectedLabel(placeholder || 'Select...');
      return;
    }
    setSelectedLabel(
      options.find(option => option.value === value)?.label || 'Select'
    );
  }, [options, placeholder, value]);

  useEffect(() => {
    // Maintain dropdown in viewport:
    const dropdownElement = dropdownRef.current;
    const rightSidePosition = dropdownElement?.getBoundingClientRect().right;
    const windowWidth = window.innerWidth;
    if (rightSidePosition && rightSidePosition > windowWidth) {
      setMaintainInViewport(true);
    }
  }, [isOpen]);

  return (
    <div className="custom-select-container">
      <div
        className={`custom-select ${isOpen ? 'open' : ''}`}
        tabIndex={0}
        onBlur={() => setIsOpen(false)}
        onClick={() => {
          setIsOpen(prev => !prev);
        }}
      >
        <div
          className={`transition-colors custom-select-trigger flex flex-row ${baseStyles[variant]} ${extraClasses}`}
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
          ref={dropdownRef}
          className={`custom-select-options text-primary rounded-2xl py-4 ${isOpen ? 'open' : ''}`}
          style={{
            left: maintaingInViewport ? 'auto' : '',
            right: maintaingInViewport ? '0' : '',
          }}
        >
          {options.map(option => (
            <div
              key={option.value}
              className="text-primary hover:text-success flex flex-row justify-between items-center custom-select-option cursor-pointer"
              onClick={e => {
                handleSelect(option);
                onChange(option.value);
                e.stopPropagation();
              }}
            >
              {option.label}
              <ChevronDownSVG extraClasses="-rotate-90 ml-4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
