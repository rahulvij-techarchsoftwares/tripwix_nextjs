'use client';

import { format } from 'date-fns';
import Image from 'next/image';
import { MonthCaptionProps, useDayPicker } from 'react-day-picker';

import RightChevron from '/public/assets/arrows/nextArrow.svg';
import LeftChevron from '/public/assets/arrows/prevArrow.svg';

export function CalendarHeader(props: MonthCaptionProps) {
  const { goToMonth, nextMonth, previousMonth } = useDayPicker();
  return (
    <div className="flex flex-row justify-between px-3">
      <button
        type="button"
        disabled={!previousMonth}
        onClick={() => previousMonth && goToMonth(previousMonth)}
      >
        <Image src={LeftChevron} width="10" height="7" alt="" />
      </button>
      <span>{format(props.calendarMonth.date, 'MMM yyy')}</span>
      <button
        type="button"
        disabled={!nextMonth}
        onClick={() => nextMonth && goToMonth(nextMonth)}
      >
        <Image src={RightChevron} width="10" height="7" alt="" />
      </button>
    </div>
  );
}
