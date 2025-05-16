import './styles.css';

import { format } from 'date-fns';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { DayPicker } from 'react-day-picker';

import { CustomIcon, CustomIconVariant } from '~/components/CustomIcon';

import { CalendarFieldProps } from './types';

export const CalendarField = forwardRef<HTMLInputElement, CalendarFieldProps>(
  (
    {
      extraClasses,
      placeholder,
      defaultValue,
      readOnly,
      onChange,
      iconVariant = CustomIconVariant.CheckIn,
      minDate,
    },
    forwardedRef
  ) => {
    const [isCalendarVisible, setIsCalendarVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(
      defaultValue || undefined
    );
    const calendarRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      const handleOutsideClick = (event: MouseEvent) => {
        if (
          calendarRef.current &&
          !calendarRef.current.contains(event.target as Node)
        ) {
          setIsCalendarVisible(false);
        }
      };

      const adjustHorizontalPosition = () => {
        if (calendarRef.current) {
          const rect = calendarRef.current.getBoundingClientRect();
          const viewportWidth = window.innerWidth;
          const style = calendarRef.current.style;

          // Check if it overflows on the right
          if (rect.right > viewportWidth) {
            const overflow = rect.right - viewportWidth;
            style.left = `-${overflow}px`;
            style.transform = 'translateX(0)'; // Force remove alignment
          }

          // Check if it overflows on the left
          if (rect.left < 0) {
            style.left = `0px`;
            style.transform = 'translateX(0)'; // Force remove alignment
          }
        }
      };

      if (isCalendarVisible) {
        adjustHorizontalPosition();
        window.addEventListener('resize', adjustHorizontalPosition);
      }

      document.addEventListener('mousedown', handleOutsideClick);

      return () => {
        window.removeEventListener('resize', adjustHorizontalPosition);
        document.removeEventListener('mousedown', handleOutsideClick);
      };
    }, [isCalendarVisible]);

    useEffect(() => {
      if (defaultValue) {
        setSelectedDate(defaultValue);
      }
    }, [defaultValue]);

    const handleInputClick = () => {
      setIsCalendarVisible(true);
    };

    const handleDateSelect = (date: Date | undefined) => {
      if (date) {
        setSelectedDate(date);
        onChange(date);
        setIsCalendarVisible(false);
      }
    };

    const today = new Date();

    return (
      <div className="relative flex items-center">
        <CustomIcon
          icon={iconVariant}
          className="absolute left-3 text-gray-500"
          height={18}
        />
        <input
          type="text"
          className={`border w-full h-12 !px-8 rounded-md ${extraClasses}`}
          readOnly
          placeholder={placeholder}
          onFocus={handleInputClick}
          onClick={handleInputClick}
          value={selectedDate ? format(selectedDate, 'd MMMM yyyy') : ''}
          title={selectedDate ? format(selectedDate, 'd MMMM yyyy') : ''}
          ref={forwardedRef}
        />
        <CustomIcon
          icon={CustomIconVariant.ArrowDown}
          className="absolute right-3 text-gray-500"
          height={6}
        />
        {isCalendarVisible && (
          <div
            ref={calendarRef}
            className={`calendar ${isCalendarVisible && 'active'} mt-2 z-10 transition-all duration-500 bg-white rounded-2xl absolute left-0 top-14 text-primary p-6`}
          >
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              defaultMonth={selectedDate || minDate || today}
              disabled={{ before: minDate ? minDate : today }}
            />
          </div>
        )}
      </div>
    );
  }
);

CalendarField.displayName = 'CalendarField';
