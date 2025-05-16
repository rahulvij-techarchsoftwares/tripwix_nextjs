'use client';

import React, { useEffect, useRef } from 'react';

import { Accordion, AccordionVariants } from '~/components/Accordion';
import { ChevronDownSVG } from '~/components/SVG';

import DatePicker from './DatePicker';
import { DatePickerProps } from './types';

export const DatePickerButton: React.FC<DatePickerProps> = ({
  value,
  onChange = () => {},
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: any) => {
    if (menuRef.current && !menuRef.current?.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <div className="md:hidden bg-white rounded-2xl px-3 py-2">
        <Accordion
          variant={AccordionVariants.Submenu}
          title={`${value ? `${value.from?.toDateString()} - ${value.to?.toDateString()}` : 'Add Dates'}`}
        >
          <DatePicker onChange={onChange} />
        </Accordion>
      </div>
      <div className="hidden md:flex flex-row relative" ref={menuRef}>
        <button
          type={'button'}
          className={`${isOpen ? 'text-success tracking-wide' : 'text-primary'} flex flex-row items-center justify-between gap-x-2`}
          onClick={() => {
            setIsOpen(prevState => !prevState);
          }}
        >
          {value ? `${value.from?.toDateString()}` : 'Add Dates'}
          {value ? <br /> : null}
          {value ? value.to?.toDateString() : ''}
          <ChevronDownSVG
            extraClasses={`transition-transform duration-500 transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>
        <div
          className={`transition-all duration-500 bg-white rounded-2xl absolute left-0 top-14 text-primary p-6 ${isOpen ? 'visible translate-y-2 opacity-1' : 'invisible -translate-y-1 opacity-0'}`}
        >
          <DatePicker onChange={onChange} />
        </div>
      </div>
    </>
  );
};
