'use client';

import './styles.css';

import { format } from 'date-fns';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import ReactModal from 'react-modal';

import { Accordion, AccordionVariants } from '~/components/Accordion';
import { Button, ButtonVariants } from '~/components/CTA';
import {
  CheckboxAccordion,
  CheckboxAccordionVariants,
  CustomCheckbox,
  DatePickerButton,
} from '~/components/FormFields';
import { QuantitySelector } from '~/components/QuantitySelector';
import { ASSET_PATHS } from '~/configs/assetPaths';
import { PAGE_PATHS, SEARCH_PARAMETERS } from '~/lib/constants';

import { DestinationSelect } from './DestinationSelect';
import { RentalsFilterBarProps } from './types';

interface FormValues {
  destination: { country: string; region: string };
  dates: DateRange;
  guests: number;
}

export const RentalsFilterBar: React.FC<RentalsFilterBarProps> = ({
  countries,
}) => {
  const { handleSubmit, control, setValue } = useForm<FormValues>();
  const router = useRouter();
  const pathname = usePathname();

  const onSubmit: SubmitHandler<FormValues> = data => {
    const params = new URLSearchParams();

    if (data.destination) {
      params.append('country', data.destination.country);
      params.append('destination', data.destination.region || '');
    }

    if (data.dates?.from) {
      params.append(
        SEARCH_PARAMETERS.ARRIVAL_DATE,
        format(data.dates.from, 'yyyy-MM-dd')
      );
    }
    if (data.dates?.to) {
      params.append(
        SEARCH_PARAMETERS.DEPARTURE_DATE,
        format(data.dates.to, 'yyyy-MM-dd')
      );
    }

    if (data.guests) {
      params.append('num_guests', data.guests.toString());
    }

    router.push(
      `${pathname}/${PAGE_PATHS.PROPERTY_LIST}/?${params.toString()}`
    );
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isFixedPos, setFixedPos] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setFixedPos(true);
    } else {
      setFixedPos(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add('body-lock-scroll');
    } else {
      document.body.classList.remove('body-lock-scroll');
    }
  }, [isModalOpen]);

  return (
    <>
      <Button
        extraClasses="lg:hidden mt-20"
        onClick={() => {
          setIsModalOpen(true);
        }}
        variant={ButtonVariants.Success}
      >
        <Image
          width={30}
          height={30}
          src={ASSET_PATHS.MAGNIFYING_GLASS}
          alt=""
        />
        <span>Search Villas</span>
      </Button>
      <Button
        extraClasses={`rounded-none lg:hidden transition-[bottom] duration-300 fixed left-0 w-full z-50 ${isFixedPos ? '-bottom-1' : '-bottom-full'}`}
        onClick={() => {
          setIsModalOpen(true);
        }}
        variant={ButtonVariants.Success}
      >
        <Image
          width={30}
          height={30}
          src={ASSET_PATHS.MAGNIFYING_GLASS}
          alt=""
        />
        <span>Search Villas</span>
      </Button>
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={() => {
          setIsModalOpen(false);
        }}
        contentLabel="Rentals Filter Bar"
        className="w-full h-screen bg-white"
        ariaHideApp={false}
      >
        <div className="bg-quaternary h-[calc(100vh-30px)] overflow-scroll">
          <div className={'flex justify-between items-center px-10 pt-20'}>
            <p className="h5 font-bold !text-primary !pb-0">Find a Villa</p>
            <button
              className={'text-xl'}
              onClick={() => {
                setIsModalOpen(false);
              }}
            >
              X
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="">
            <div className="rentals-filter__destination flex flex-col gap-4 md:gap-0 items-stretch lg:items-center justify-between m-auto mt-10 px-6 py-4 rounded-2xl item-center md:max-w-screen-sm">
              <div className="bg-white px-3 py-2 rounded-2xl">
                <Accordion
                  variant={AccordionVariants.Submenu}
                  title="Destinations"
                >
                  <div>
                    {countries.map(country => (
                      <Controller
                        key={country.id}
                        name="destination"
                        control={control}
                        render={({ field }) => {
                          return (
                            <CheckboxAccordion
                              variant={CheckboxAccordionVariants.Submenu}
                              title={country.name}
                              checked={field.value?.country === country.id}
                              onChange={() => {
                                setValue('destination', {
                                  country: country.id,
                                  region: '',
                                });
                              }}
                            >
                              <div className="pt-2 pl-8">
                                {country.destinations.map(destination => (
                                  <Controller
                                    key={destination.id}
                                    name="destination"
                                    control={control}
                                    render={({ field }) => {
                                      return (
                                        <CustomCheckbox
                                          label={destination.name}
                                          extraClasses="mb-2"
                                          checked={
                                            field.value?.region ===
                                            destination.id
                                          }
                                          onChange={() => {
                                            setValue('destination', {
                                              country: country.id,
                                              region: destination.id,
                                            });
                                          }}
                                        />
                                      );
                                    }}
                                  />
                                ))}
                              </div>
                            </CheckboxAccordion>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <hr className="border-1 border-b-tertiary-10 mt-4 pb-6" />
                </Accordion>
              </div>
              <Controller
                name="dates"
                control={control}
                render={({ field }) => {
                  return (
                    <DatePickerButton
                      onChange={field.onChange}
                      value={field.value}
                    />
                  );
                }}
              />
              <div className="bg-white md:mt-4 rounded-2xl">
                <Controller
                  name="guests"
                  control={control}
                  render={({ field }) => {
                    return (
                      <QuantitySelector
                        placeholder={'Guests'}
                        value={field.value}
                        onChange={field.onChange}
                        extraClasses={
                          'px-1 py-2 text-lg text-secondary rentals-filter__quantity-selector'
                        }
                      />
                    );
                  }}
                />
              </div>
            </div>
            <Button
              variant={ButtonVariants.Success}
              extraClasses={
                'w-full rounded-sm absolute bottom-0 text-center flex justify-center'
              }
            >
              <Image
                width={30}
                height={30}
                src={ASSET_PATHS.MAGNIFYING_GLASS}
                alt=""
              />
              <span>Search Villas</span>
            </Button>
          </form>
        </div>
      </ReactModal>

      {/* Desktop */}
      <form onSubmit={handleSubmit(onSubmit)} className="hidden lg:block">
        <div className="m-auto mt-10 px-6 py-4 md:py-[14px] rounded-2xl bg-white flex flex-row item-center justify-between md:max-w-screen-sm ">
          <Controller
            name="destination"
            control={control}
            render={({ field }) => {
              return (
                <>
                  <DestinationSelect
                    placeholder={'Destinations'}
                    extraClasses={'border-none pb-0'}
                    label="Destinations"
                    onChange={field.onChange}
                    options={countries.map(({ name, id, destinations }) => ({
                      label: name,
                      value: id,
                      destinations: destinations,
                    }))}
                    countryValue={field.value?.country || undefined}
                    regionValue={field.value?.region || undefined}
                  />
                </>
              );
            }}
          />
          <Controller
            name="dates"
            control={control}
            render={({ field }) => {
              return (
                <DatePickerButton
                  onChange={field.onChange}
                  value={field.value}
                />
              );
            }}
          />
          <Controller
            name="guests"
            control={control}
            render={({ field }) => {
              return (
                <QuantitySelector
                  placeholder={'Guests'}
                  value={field.value}
                  onChange={field.onChange}
                />
              );
            }}
          />
          <Button variant={ButtonVariants.FormFieldSuccess}>
            <span>Search</span>
          </Button>
        </div>
      </form>
    </>
  );
};
