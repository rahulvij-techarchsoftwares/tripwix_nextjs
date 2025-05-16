'use client';

import 'react-day-picker/dist/style.css';
import './styles.css';

import React, { useEffect, useState } from 'react';
import { DateRange, DayPicker } from 'react-day-picker';

import { DatePickerProps } from './types';

export const DatePicker: React.FC<DatePickerProps> = ({
  defaultValue,
  onChange = () => {},
}) => {
  const [selected, setSelected] = useState<DateRange | undefined>(
    defaultValue || undefined
  );

  const formatWeekdayName = (day: Date) => {
    return day.toLocaleDateString('en-US', { weekday: 'narrow' });
  };

  useEffect(() => {
    if (!defaultValue) {
      setSelected(undefined);
    }
  }, [defaultValue]);

  return (
    <div>
      <DayPicker
        disabled={{ before: new Date() }}
        mode="range"
        onSelect={value => {
          setSelected(value);
          onChange(value);
        }}
        formatters={{ formatWeekdayName }}
        selected={selected}
      />
    </div>
  );
};

export default DatePicker;
