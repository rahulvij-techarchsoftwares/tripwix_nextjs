import Image from 'next/image';
import React from 'react';

import { StayWithUsProps } from './types';

export const StayWithUs: React.FC<StayWithUsProps> = ({ title, items }) => {
  return (
    <div className="md:bg-quaternary md:p-12 my-10">
      <h4 className="capitalize">{title}</h4>
      <div className="flex md:flex-row flex-col flex-wrap justify-between mt-8">
        {items.map(item => (
          <div key={item.id} className="w-full md:w-6/12">
            <p className={'w-full md:w-8/12 flex flex-row items-start'}>
              <Image
                className={'mt-1 mr-3'}
                src={'/rounded_check.svg'}
                height={20}
                width={20}
                alt=""
              />
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
