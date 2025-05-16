'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import { Filters } from '~/(pages)/[lang]/(pagegroup)/luxury-home-rentals/Filters';
import {
  FilterItemsProps,
  SearchParams,
} from '~/(pages)/[lang]/(pagegroup)/luxury-home-rentals/Filters/types';
import { CustomSelect } from '~/components';
import { Button, ButtonVariants } from '~/components/CTA';
import { CustomIcon, CustomIconVariant } from '~/components/CustomIcon';
import { CURRENCY_OPTIONS } from '~/lib/constants';
import { useStore } from '~/lib/store/currency';

interface PropertyListFiltersProps {
  isMapView: boolean;
  toggleMapView: () => void;
  selectedFilters: { label: string; value: string }[];
  searchParams: SearchParams;
  propertyCount?: number;
  parsedFiltersData: FilterItemsProps;
}

export const PropertyListFilters: React.FC<PropertyListFiltersProps> = ({
  isMapView = false,
  toggleMapView,
  searchParams,
  selectedFilters,
  propertyCount,
  parsedFiltersData,
}) => {
  const router = useRouter();
  const { selectedCurrency, setSelectedCurrency } = useStore();

  return (
    <div className="flex flex-col xl:flex-row xl:items-center mb-5 gap-3">
      <div className="hidden md:flex flex-row justify-start flex-wrap gap-3 items-center">
        {selectedFilters?.map(key => (
          <button
            key={key.value}
            onClick={() => {
              const params = new URLSearchParams(searchParams);
              if (key.value === 'country') {
                params.delete('destination');
                params.delete('community');
              }
              params.delete(key.value);
              router.push(`?${params.toString()}`, { scroll: false });
            }}
            className="flex flex-row items-center bg-success text-sm rounded-lg text-white px-2 py-1 hover:cursor-pointer"
          >
            <span
              className="whitespace-wrap text-left pr-2 capitalize truncate max-w-[300px]"
              title={`${key.label}`}
            >
              {key.label}
            </span>
            <CustomIcon icon={CustomIconVariant.Close} height={15} />
          </button>
        ))}
      </div>
      <div className="flex flex-row flex-wrap items-center flex-grow gap-3 md:min-w-fit justify-end">
        <div className="md:hidden pb-2">
          <Filters
            filterList={parsedFiltersData}
            searchParams={searchParams}
            propertyCount={propertyCount}
          />
        </div>
        <div className="hidden md:block">
          <CustomSelect
            options={CURRENCY_OPTIONS}
            value={selectedCurrency}
            variant={ButtonVariants.Dropdown}
            onChange={value => {
              setSelectedCurrency(value);
            }}
          />
        </div>
        <CustomSelect
          options={[
            { label: 'Price Ascendant', value: 'price-asc' },
            { label: 'Price Descendant', value: 'price-desc' },
            { label: 'Name Ascendant', value: 'name-asc' },
            { label: 'Name Descendant', value: 'name-desc' },
            { label: 'Recommended', value: 'recommended' },
          ]}
          onChange={selected => {
            const params = new URLSearchParams(searchParams);

            if (selected === 'null') {
              params.delete('order_by');
            } else {
              params.set('order_by', selected);
            }

            router.push(`?${params.toString()}`, { scroll: false });
          }}
          value={searchParams.order_by || 'null'}
          placeholder="Sort By"
          variant={ButtonVariants.Dropdown}
          extraClasses={'mx-0'}
        />
        <Button
          variant={ButtonVariants.Dropdown}
          onClick={toggleMapView}
          extraClasses="mb-2"
        >
          {isMapView ? (
            <>
              <CustomIcon icon={CustomIconVariant.List} height={16} />
              <span>List</span>
            </>
          ) : (
            <>
              <CustomIcon
                icon={CustomIconVariant.Map}
                height={16}
                className="inline-block"
              />
              <span>Map</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
