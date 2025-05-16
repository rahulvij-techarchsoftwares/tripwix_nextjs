'use client';

import './styles.css';

import { format } from 'date-fns';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';

import {
  Button,
  ButtonVariants,
  CustomCheckbox,
  DatePicker,
} from '~/components';
import { Accordion, AccordionVariants } from '~/components/Accordion';
import { BooleanToggle } from '~/components/BooleanToggle';
import { CustomIcon, CustomIconVariant } from '~/components/CustomIcon';
import { RangeSlider } from '~/components/RangeSlider';
import { SEARCH_PARAMETERS } from '~/lib/constants';
import { urlParametersHandler } from '~/lib/urlParametersHandler';

import { DestinationsSelector } from './DestinationsSelector';
import { FiltersProps } from './types';

const customCheckboxExtraClasses = 'pb-3';

interface OptionValues {
  dates: DateRange;
  selectedFilters: {
    [key: string]: string[];
  };
}

export const Filters: React.FC<FiltersProps> = ({
  filterList,
  searchParams,
  propertyCount,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilterOptions, setSelectedFilterOptions] = useState<
    OptionValues['selectedFilters']
  >({
    [SEARCH_PARAMETERS.NUM_GUESTS]: searchParams.num_guests?.split(',') || [],
    [SEARCH_PARAMETERS.NUM_BEDROOMS]: searchParams.categories?.split(',') || [],
    [SEARCH_PARAMETERS.NUM_BATHROOMS]:
      searchParams.num_bathrooms?.split(',') || [],
    [SEARCH_PARAMETERS.CATEGORIES]: searchParams.categories?.split(',') || [],
    [SEARCH_PARAMETERS.AMENITIES]: searchParams.amenities?.split(',') || [],
    [SEARCH_PARAMETERS.ACCESSIBILITY]:
      searchParams.accessibility?.split(',') || [],
    [SEARCH_PARAMETERS.CATEGORY]: searchParams.category?.split(',') || [],
    [SEARCH_PARAMETERS.PRICE_MIN]: searchParams.price_min?.split(',') || [],
    [SEARCH_PARAMETERS.PRICE_MAX]: searchParams.price_max?.split(',') || [],
    [SEARCH_PARAMETERS.ARRIVAL_DATE]:
      searchParams[SEARCH_PARAMETERS.ARRIVAL_DATE]?.split(',') || [],
    [SEARCH_PARAMETERS.DEPARTURE_DATE]:
      searchParams[SEARCH_PARAMETERS.DEPARTURE_DATE]?.split(',') || [],
    [SEARCH_PARAMETERS.LIFESTYLE]: searchParams.lifestyle?.split(',') || [],
    [SEARCH_PARAMETERS.SPECIAL_OFFER]:
      searchParams.special_offer?.split(',') || [],
    [SEARCH_PARAMETERS.INSTANT_BOOKING]:
      searchParams.instant_booking?.split(',') || [],

    [SEARCH_PARAMETERS.COUNTRY]: searchParams.country?.split(',') || [],
    [SEARCH_PARAMETERS.DESTINATION]: searchParams.destination?.split(',') || [],
    [SEARCH_PARAMETERS.COMMUNITY]: searchParams.community?.split(',') || [],
    [SEARCH_PARAMETERS.ORDER_BY]: searchParams.community?.split(',') || [],
  });
  const GuestOptions = Array.from({ length: 9 }, (_, i) =>
    ((i + 1) * 2).toString()
  );
  const BedRoomOptions = Array.from({ length: 9 }, (_, i) =>
    (i + 1).toString()
  );
  const BathroomOptions = Array.from({ length: 9 }, (_, i) =>
    (i + 1).toString()
  );
  const handleSingleOption = (
    value: string,
    itemKey: keyof typeof selectedFilterOptions
  ) => {
    const updatedSelectedFilters = {
      ...selectedFilterOptions,
      [itemKey]: selectedFilterOptions[itemKey]?.includes(value) ? [] : [value],
    };
    setSelectedFilterOptions(updatedSelectedFilters);
  };

  const handleMultipleObjs = (
    options: {
      value: string;
      name: SEARCH_PARAMETERS;
    }[]
  ) => {
    const updatedSelectedFilters = options.reduce((acc, option) => {
      return {
        ...acc,
        [option.name]: [option.value],
      };
    }, selectedFilterOptions);

    setSelectedFilterOptions(updatedSelectedFilters);
  };

  const handleMultipleChoice = (
    value: string,
    itemKey: keyof typeof selectedFilterOptions
  ) => {
    const currentValues = selectedFilterOptions[itemKey];

    if (Array.isArray(currentValues)) {
      const updatedValues = currentValues.includes(value)
        ? currentValues.filter(selectedValue => selectedValue !== value)
        : [...currentValues, value];

      const updatedSelectedFilters = {
        ...selectedFilterOptions,
        [itemKey]: updatedValues,
      };

      setSelectedFilterOptions(updatedSelectedFilters);
    }
  };

  const handleChangeRange = ({
    minValue,
    maxValue,
    minKey,
    maxKey,
  }: {
    minValue: string;
    maxValue: string;
    minKey: string;
    maxKey: string;
  }) => {
    const updatedSelectedFilters = {
      ...selectedFilterOptions,
      [minKey]: [minValue],
      [maxKey]: [maxValue],
    };
    setSelectedFilterOptions(updatedSelectedFilters);
  };

  useEffect(() => {
    const params = new URLSearchParams(selectedFilterOptions as any);
    const paramsResult = urlParametersHandler(params);
    router.push(`?${paramsResult}`, { scroll: false });
  }, [pathname, router, selectedFilterOptions]);

  useEffect(() => {
    const newFilterOptions = Object.keys(selectedFilterOptions).reduce(
      (acc, key) => {
        const typedKey = key as keyof typeof selectedFilterOptions;
        const value = searchParams[key];
        acc[typedKey] = value ? value.split(',') : [];
        return acc;
      },
      {} as OptionValues['selectedFilters']
    );

    setSelectedFilterOptions(newFilterOptions);
  }, [searchParams]);

  const activeFilterCounter = (key: string) => {
    return selectedFilterOptions[key] && selectedFilterOptions[key].length > 0
      ? `(${selectedFilterOptions[key].length})`
      : false;
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('body-lock-scroll');
    } else {
      document.body.classList.remove('body-lock-scroll');
    }
  }, [isOpen]);

  return (
    <>
      <button
        className="responsive-filters-toggle-button transition-colors gap-2 inline-flex w-fit items-center text-center py-2 px-4 rounded-xl text-black border border-tertiary-30 bg-white"
        onClick={() => setIsOpen(true)}
      >
        <CustomIcon icon={CustomIconVariant.Filter} height={16} />
        <span>Filter</span>
      </button>
      <div className={`responsive-filters ${isOpen && 'open'}`}>
        <div>
          <CustomIcon
            icon={CustomIconVariant.CloseColored}
            height={20}
            onClick={() => setIsOpen(false)}
            className="responsive-filters-toggle-button--close border shadow rounded-full text-success p-2 w-10 h-10 left-auto right-6 absolute bg-white z-10"
          />
          <div className="flex flex-row items-center pb-5 gap-4 md:justify-between">
            <Image
              src={'/assets/filter.svg'}
              width={15}
              height={15}
              alt="filter by"
              className="md:hidden"
            />
            <span className="text-lg pb-0">Filter By</span>
            <button
              className="hover:cursor-pointer hidden md:flex flex-row items-center justify-between gap-2 text-sm"
              onClick={() => {
                router.push('?', { scroll: false });
              }}
            >
              <Image
                src={'/assets/properties/reset_filters.svg'}
                width={10}
                height={10}
                alt="reset filters"
              />
              Reset Search
            </button>
          </div>
          <DestinationsSelector
            filterList={filterList}
            handleSubmitProp={handleMultipleObjs}
            searchParams={searchParams}
            extraInfo={activeFilterCounter(SEARCH_PARAMETERS.DESTINATION)}
          />
          <Accordion
            variant={AccordionVariants.Menu}
            title="Add Dates"
            extraInfo={
              (activeFilterCounter(SEARCH_PARAMETERS.ARRIVAL_DATE) ||
                activeFilterCounter(SEARCH_PARAMETERS.DEPARTURE_DATE)) &&
              `(1)`
            }
          >
            <DatePicker
              defaultValue={
                searchParams.available_at_before
                  ? ({
                      from: searchParams[
                        SEARCH_PARAMETERS.ARRIVAL_DATE
                      ] as unknown as Date,
                      to: (searchParams[SEARCH_PARAMETERS.DEPARTURE_DATE] ||
                        SEARCH_PARAMETERS.ARRIVAL_DATE) as unknown as Date,
                    } as DateRange)
                  : undefined
              }
              onChange={value => {
                handleChangeRange({
                  minValue: value?.from ? format(value.from, 'yyyy-MM-dd') : '',
                  maxValue: value?.to ? format(value.to, 'yyyy-MM-dd') : '',
                  minKey: SEARCH_PARAMETERS.ARRIVAL_DATE,
                  maxKey: SEARCH_PARAMETERS.DEPARTURE_DATE,
                });
              }}
            />
            <hr className="border-1 border-b-tertiary-10 mt-4 pb-6" />
          </Accordion>
          <Accordion
            variant={AccordionVariants.Menu}
            title="Guests"
            extraInfo={activeFilterCounter(SEARCH_PARAMETERS.NUM_GUESTS)}
          >
            {GuestOptions.map(guest => (
              <CustomCheckbox
                extraClasses={customCheckboxExtraClasses}
                key={guest}
                label={`${guest} +`}
                checked={selectedFilterOptions.num_guests?.includes(guest)}
                onChange={() => {
                  handleSingleOption(guest, SEARCH_PARAMETERS.NUM_GUESTS);
                }}
              />
            ))}
          </Accordion>
          <Accordion
            variant={AccordionVariants.Menu}
            title="Accommodation type"
            extraInfo={activeFilterCounter(SEARCH_PARAMETERS.CATEGORY)}
          >
            {filterList.categories.value.map(category => (
              <CustomCheckbox
                extraClasses={customCheckboxExtraClasses}
                key={category.slug}
                label={`${category.name}`}
                checked={selectedFilterOptions.category?.includes(
                  category.slug
                )}
                onChange={() => {
                  handleSingleOption(category.slug, SEARCH_PARAMETERS.CATEGORY);
                }}
              />
            ))}
          </Accordion>
          <Accordion
            variant={AccordionVariants.Menu}
            title="Price Range"
            extraInfo={
              (activeFilterCounter(SEARCH_PARAMETERS.PRICE_MIN) ||
                activeFilterCounter(SEARCH_PARAMETERS.PRICE_MAX)) &&
              `(1)`
            }
          >
            <RangeSlider
              extraClasses="pb-10 px-4"
              min={0}
              max={filterList.price_range.value.website_sales_value__max}
              selectedMin={parseInt(
                selectedFilterOptions?.price_min?.length
                  ? selectedFilterOptions.price_min[0]
                  : ''
              )}
              selectedMax={parseInt(
                selectedFilterOptions?.price_max?.length
                  ? selectedFilterOptions.price_max[0]
                  : ''
              )}
              onChange={value =>
                handleChangeRange({
                  minValue: `${value.min}`,
                  maxValue: `${value.max}`,
                  minKey: 'price_min',
                  maxKey: 'price_max',
                })
              }
            />
          </Accordion>
          <Accordion
            variant={AccordionVariants.Menu}
            title="Bedrooms"
            extraInfo={activeFilterCounter(SEARCH_PARAMETERS.NUM_BEDROOMS)}
          >
            {BedRoomOptions.map(bedroom => (
              <CustomCheckbox
                extraClasses={customCheckboxExtraClasses}
                key={bedroom}
                label={`${bedroom} +`}
                checked={selectedFilterOptions.num_bedrooms?.includes(
                  bedroom.toString()
                )}
                onChange={() => {
                  handleSingleOption(
                    bedroom.toString(),
                    SEARCH_PARAMETERS.NUM_BEDROOMS
                  );
                }}
              />
            ))}
          </Accordion>
          <Accordion
            variant={AccordionVariants.Menu}
            title="Bathrooms"
            extraInfo={activeFilterCounter(SEARCH_PARAMETERS.NUM_BATHROOMS)}
          >
            {BathroomOptions.map(bathroom => (
              <CustomCheckbox
                key={bathroom}
                extraClasses={customCheckboxExtraClasses}
                label={`${bathroom} +`}
                checked={selectedFilterOptions.num_bathrooms?.includes(
                  bathroom.toString()
                )}
                onChange={() => {
                  handleSingleOption(
                    bathroom.toString(),
                    SEARCH_PARAMETERS.NUM_BATHROOMS
                  );
                }}
              />
            ))}
          </Accordion>
          <div className={'flex flex-row justify-between py-2'}>
            <span className="text-md md:text-xl md:font-bold">
              Instant Booking
            </span>
            <BooleanToggle
              onChange={() => {
                handleSingleOption('true', SEARCH_PARAMETERS.INSTANT_BOOKING);
              }}
              value={!!selectedFilterOptions.instant_booking?.includes('true')}
            />
          </div>
          <Accordion
            variant={AccordionVariants.Menu}
            title="Amenities"
            extraInfo={activeFilterCounter(SEARCH_PARAMETERS.AMENITIES)}
          >
            {filterList.amenities.value.map(amenity => (
              <CustomCheckbox
                extraClasses={customCheckboxExtraClasses}
                key={amenity.slug}
                label={`${amenity.name}`}
                checked={selectedFilterOptions.amenities?.includes(
                  amenity.slug
                )}
                onChange={() => {
                  handleMultipleChoice(
                    amenity.slug,
                    SEARCH_PARAMETERS.AMENITIES
                  );
                }}
              />
            ))}
          </Accordion>
          <Accordion
            variant={AccordionVariants.Menu}
            title="Lifestyle"
            extraInfo={activeFilterCounter(SEARCH_PARAMETERS.LIFESTYLE)}
          >
            {filterList.lifestyle.value.map(lifestyle => (
              <CustomCheckbox
                extraClasses={customCheckboxExtraClasses}
                key={lifestyle.slug}
                label={`${lifestyle.name}`}
                checked={selectedFilterOptions.lifestyle?.includes(
                  lifestyle.slug
                )}
                onChange={() => {
                  handleSingleOption(
                    lifestyle.slug,
                    SEARCH_PARAMETERS.LIFESTYLE
                  );
                }}
              />
            ))}
          </Accordion>
          <div className={'flex flex-row justify-between py-2'}>
            <span className="text-md md:text-xl font-bold">Special Offer</span>
            <BooleanToggle
              onChange={() => {
                handleSingleOption('true', SEARCH_PARAMETERS.SPECIAL_OFFER);
              }}
              value={!!selectedFilterOptions.special_offer?.includes('true')}
            />
          </div>
          <Accordion
            variant={AccordionVariants.Menu}
            title="Accessibilities"
            extraInfo={activeFilterCounter(SEARCH_PARAMETERS.ACESSIBILITY)}
          >
            {filterList.acessibilities.value.map(accessibility => (
              <CustomCheckbox
                extraClasses={customCheckboxExtraClasses}
                key={accessibility.slug}
                label={`${accessibility.name}`}
                checked={selectedFilterOptions.acessibility?.includes(
                  accessibility.slug
                )}
                onChange={() => {
                  handleSingleOption(
                    accessibility.slug,
                    SEARCH_PARAMETERS.ACESSIBILITY
                  );
                }}
              />
            ))}
          </Accordion>
        </div>
        <div className="md:hidden flex fixed bottom-0 left-0 gap-4 p-4 w-full z-10 border bg-white justify-center">
          <Button
            variant={ButtonVariants.Primary}
            onClick={() => {
              router.push('?', { scroll: false });
            }}
            extraClasses="group font-normal text-sm px-5 flex-auto text-center justify-center"
          >
            <Image
              src={'/assets/properties/reset_filters.svg'}
              width={20}
              height={20}
              alt="reset filters"
              className="filter-white"
            />
            Reset Search
          </Button>
          <Button
            variant={ButtonVariants.Success}
            onClick={() => setIsOpen(false)}
            extraClasses="group font-normal text-sm px-5 flex-auto text-center justify-center"
          >
            <span>View {propertyCount! && `${propertyCount} `} Results</span>
          </Button>
        </div>
      </div>
    </>
  );
};
