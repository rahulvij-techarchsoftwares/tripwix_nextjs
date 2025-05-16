'use client';

import React, { useEffect, useState } from 'react';
import { getTrackBackground, Range } from 'react-range';

import { RangeSliderProps } from './types';

const MIN = 0;
const MAX = 10000;

export const RangeSlider: React.FC<RangeSliderProps> = ({
  extraClasses = '',
  min = MIN,
  max = MAX,
  selectedMin = MIN,
  selectedMax = MAX,
  onChange,
}) => {
  const [values, setValues] = useState([
    selectedMin > min ? selectedMin : min,
    selectedMax < max ? selectedMax : max,
  ]);

  useEffect(() => {
    if (!selectedMin && !selectedMax) setValues([min, max]);
  }, [selectedMin, selectedMax, min, max]);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-6">
        <span>
          {values[0]}€ - {values[1]}€
        </span>
      </div>
      <div className={extraClasses}>
        <Range
          step={100}
          min={min}
          max={max}
          values={values}
          onChange={values => {
            onChange({ min: values[0], max: values[1] });
            setValues(values);
          }}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              style={{
                ...props.style,
                width: '100%',
                background: getTrackBackground({
                  values,
                  colors: ['#CBD5E0', '#1A202C', '#CBD5E0'], // Colors: unselected - selected - unselected
                  min: min,
                  max: max,
                }),
              }}
              className="flex items-center w-full h-1"
            >
              {children}
            </div>
          )}
          renderThumb={({ props: { key, ...thumbProps } }) => (
            <div
              {...thumbProps}
              key={key}
              style={{
                ...thumbProps.style,
                height: '20px',
                width: '20px',
                marginTop: '2px',
                backgroundColor: '#1A202C',
                borderRadius: '50%',
              }}
              className="focus:outline-none -top-1/2"
            />
          )}
        />
      </div>
    </div>
  );
};
