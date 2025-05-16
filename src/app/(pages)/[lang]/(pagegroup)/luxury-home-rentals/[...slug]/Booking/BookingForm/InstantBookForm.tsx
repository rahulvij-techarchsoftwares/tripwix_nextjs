'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { compareAsc, differenceInDays, format } from 'date-fns';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';

import { validateInstantBookingDates } from '~/actions/validate-instant-booking-dates';
import { useBookingFrame } from '~/components/BookingFrameProvider';
import { CalendarField } from '~/components/CalendarField';
import { Container, ContainerVariant } from '~/components/Container';
import { Button, ButtonVariants } from '~/components/CTA';
import { CustomIconVariant } from '~/components/CustomIcon';
import { PropertyPrice } from '~/components/PropertyPrice';
import { EnumPropertyPricePropsVariant } from '~/components/PropertyPrice/types';
import { QuantitySelector } from '~/components/QuantitySelector';
import { Spinner } from '~/components/Spinner';
import { SEARCH_PARAMETERS } from '~/lib/constants';
import { getBrowserLanguageToPhoneCountry } from '~/lib/utils';
import {
  FetchedPropertyData,
  phoneMasksByLanguage,
  PropertyPrice as PropertyPriceType,
} from '~/types/globalTypes';

import {
  instantBookingFormSchema,
  onSubmitFunction,
  TInstantBookingSchema,
} from './formSchemas';

interface PropertyData {
  propertyData?: FetchedPropertyData;
}

export const InstantBookForm: React.FC<PropertyData> = ({ propertyData }) => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    getValues,
    formState: { errors },
  } = useForm<TInstantBookingSchema>({
    resolver: zodResolver(instantBookingFormSchema),
    mode: 'all',
  });

  const [checkinDate, setCheckinDate] = React.useState<Date>();
  const [checkoutDate, setCheckoutDate] = React.useState<Date | undefined>();

  interface IResponse {
    calculated_fees: PropertyPriceType;
  }

  const [formState, setFormState] = useState<{
    responseMessage: IResponse;
    responseError: string;
    formSubmitted: boolean;
    formErrors: boolean;
  }>({
    responseMessage: {
      calculated_fees: { EUR: '', USD: '', GBP: '', MXN: '' },
    },
    responseError: '',
    formSubmitted: false,
    formErrors: false,
  });
  const [loading, setLoading] = useState(false);
  const [isBookbarVisible, setIsBookbarVisible] = useState(false);
  const [selectedDatesAreValid, setSelectedDatesAreValid] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const checkoutInputInstantBookRef = useRef<HTMLInputElement | null>(null);
  const [invalidDates, setInvalidDates] = useState([]);
  const { triggerExpand } = useBookingFrame();

  const searchParams = useSearchParams();
  const numGuests = searchParams?.get('num_guests');
  const arrivalDate = searchParams?.get(SEARCH_PARAMETERS.ARRIVAL_DATE);
  const departureDate = searchParams?.get(SEARCH_PARAMETERS.DEPARTURE_DATE);

  watch('first_name');
  watch('last_name');
  watch('number_of_guests');
  watch('number_of_bedrooms');
  watch('checkin_date');
  watch('checkout_date');

  const handleScroll = () => {
    if (window.scrollY > 1200) {
      setIsBookbarVisible(true);
      document.body.classList.add('footer-margin-bottom');
    } else {
      setIsBookbarVisible(false);
      document.body.classList.remove('footer-margin-bottom');
    }
  };

  const scrollToForm = () => {
    if (formRef.current) {
      const elementPosition =
        formRef.current.getBoundingClientRect().top + window.pageYOffset;
      const offset = 200;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }

    triggerExpand(true);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      setSelectedDatesAreValid(false);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit: onSubmitFunction = async data => {
    const url = `${process.env.NEXT_PUBLIC_HOSTIFY_URL}/`;
    const params = `?start_date=${data.checkin_date}&end_date=${data.checkout_date}&adults=${data.number_of_guests}&guests=${data.number_of_guests}&pname=${data.first_name}+${data.last_name}&pemail=${data.email}&pphone=${data.phone_number}&discount_code=&id=${propertyData?.hostify_id}&listing_id=${propertyData?.hostify_id}`;
    const targetUrl = `${url}${params}`;
    if (selectedDatesAreValid) {
      window.open(targetUrl, '_blank');
      return;
    }
    setLoading(true);
    setInvalidDates([]);
    try {
      const responseData = await validateInstantBookingDates({
        data: {
          ...data,
          property_slug: propertyData?.slug ? `${propertyData.slug}` : '',
        },
      });
      const invalidSelectedDates =
        responseData?.availability
          ?.filter((date: { status: string }) => {
            return date.status !== 'available';
          })
          ?.map((date: { date: { date: Date } }) => {
            return date.date;
          }) || [];
      setInvalidDates(invalidSelectedDates);
      setFormState({
        responseMessage: responseData,
        responseError: '',
        formSubmitted: true,
        formErrors: false,
      });
      setSelectedDatesAreValid(invalidSelectedDates.length === 0);
      setLoading(false);
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormState({
        responseError: 'Error submitting form',
        responseMessage: {
          calculated_fees: { EUR: '', USD: '', GBP: '', MXN: '' },
        },
        formSubmitted: true,
        formErrors: true,
      });
      setLoading(false);
    }
  };

  console.log('calulated fees: ');
  console.log(JSON.stringify(formState.responseMessage?.calculated_fees));

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit(onSubmit)}
      className="grid md:grid-cols-2 gap-4"
    >
      <div>
        <input
          type="text"
          id="firstName"
          {...register('first_name', { required: false })}
          placeholder="First Name"
        />
        {errors.first_name && (
          <small className="text-error">This field is required</small>
        )}
      </div>
      <div>
        <input
          type="text"
          id="lastName"
          {...register('last_name', { required: false })}
          placeholder="Last Name"
        />
        {errors.last_name && (
          <small className="text-error">This field is required</small>
        )}
      </div>
      <div>
        <input
          type="email"
          id="email"
          {...register('email', { required: false })}
          placeholder="Email Address"
        />
        {errors.email && (
          <small className="text-error">{errors.email.message}</small>
        )}
      </div>
      <div>
        <Controller
          key="phone_number"
          name="phone_number"
          control={control}
          render={({ field }) => {
            return (
              <PhoneInput
                enableSearch
                country={getBrowserLanguageToPhoneCountry()}
                masks={phoneMasksByLanguage}
                value={field.value}
                onChange={value => field.onChange(`+${value}`)}
                inputProps={{
                  name: field.name,
                  required: true,
                }}
                containerClass="w-full border border-gray-300 rounded"
                inputStyle={{
                  border: 'none',
                  width: '100%',
                  paddingTop: '10px',
                  paddingBottom: '10px',
                  height: '46px',
                  fontSize: '16px',
                }}
                dropdownStyle={{
                  textAlign: 'left',
                }}
                buttonStyle={{
                  background: 'none',
                  border: 'none',
                  paddingLeft: '10px',
                  paddingRight: '10px',
                }}
              />
            );
          }}
        />
        {errors.phone_number && (
          <small className="text-error">This field is required</small>
        )}
      </div>
      <div>
        <Controller
          name="checkin_date"
          control={control}
          render={({ field }) => (
            <CalendarField
              {...field}
              placeholder="Check In"
              iconVariant={CustomIconVariant.CheckIn}
              defaultValue={
                checkinDate
                  ? checkinDate || undefined
                  : arrivalDate
                    ? new Date(arrivalDate)
                    : undefined
              }
              onChange={(date: Date) => {
                setCheckinDate(date);
                // Programmatically click on the checkout input to open the calendar
                if (checkoutInputInstantBookRef.current) {
                  checkoutInputInstantBookRef.current.click();
                }
                if (checkoutDate && compareAsc(date, checkoutDate) > 0) {
                  setCheckoutDate(date);
                }
                field.onChange(
                  format(date ? date.toISOString() : '', 'yyyy-MM-dd')
                );
              }}
            />
          )}
        />
        {errors.checkin_date && (
          <small className="text-error">This field is required</small>
        )}
      </div>
      <div>
        <Controller
          name="checkout_date"
          control={control}
          render={({ field }) => {
            return (
              <CalendarField
                {...field}
                placeholder="Check Out"
                minDate={
                  checkinDate
                    ? checkinDate
                    : arrivalDate
                      ? new Date(arrivalDate)
                      : undefined
                }
                defaultValue={
                  checkoutDate
                    ? checkoutDate
                    : departureDate
                      ? new Date(departureDate)
                      : undefined
                }
                iconVariant={CustomIconVariant.CheckOut}
                onChange={(date: Date | undefined) => {
                  setCheckoutDate(date);
                  field.onChange(
                    format(date ? date.toISOString() : '', 'yyyy-MM-dd')
                  );
                }}
                ref={checkoutInputInstantBookRef}
              />
            );
          }}
        />
        {errors.checkout_date && (
          <small className="text-error">This field is required</small>
        )}
      </div>
      <div>
        <div className="border rounded-md px-2 py-1 h-[48px]">
          <Controller
            name="number_of_guests"
            control={control}
            render={({ field }) => (
              <QuantitySelector
                value={numGuests ? parseInt(numGuests) : 0}
                onChange={field.onChange}
                singularDescription="Guest"
                pluralDescription="Guests"
                placeholder="Add Guests"
                max={propertyData?.num_guests}
                iconVariant={CustomIconVariant.Guest}
              />
            )}
          />
        </div>
        {errors.number_of_guests && (
          <small className="text-error">This field is required</small>
        )}
      </div>
      <div className="col-span-2">
        <hr />
        <p className="text-error pb-0 mt-4 text-center">
          {formState.formErrors ? <p>{formState.responseError}</p> : null}
        </p>
        <div className="text-center">
          <div className="flex flex-col gap-2 my-2">
            {invalidDates.length > 0 ? (
              <span className="text-sm text-error">
                The following dates are already booked:
              </span>
            ) : null}
            <div>
              <span className="text-sm">{invalidDates.join(', ')}</span>
            </div>
            <div className="text-center mt-3">
              <small>Minimum night requirements may apply.</small>
            </div>
            {loading ? (
              <div className="flex flex-row items-center justify-center mt-2">
                <Spinner />
              </div>
            ) : null}
            {!selectedDatesAreValid ? (
              <>
                {!loading ? (
                  <div className="mt-2">
                    {' '}
                    <Button
                      disabled={loading}
                      type="submit"
                      variant={ButtonVariants.Danger}
                    >
                      Check Availability
                    </Button>
                    <p className="uppercase text-xs mt-4">
                      You won&apos;t be charged yet
                    </p>
                  </div>
                ) : null}
              </>
            ) : (
              <div className="mt-6">
                {/*TODO: Remove the dummy fees after testing is done*/}
                {/*{fees.map(fee => (*/}
                {/*  <div key={fee.name} className="flex justify-between">*/}
                {/*    <p>{fee.name}</p>*/}
                {/*    <p>{fee.amount}</p>*/}
                {/*  </div>*/}
                {/*))}*/}
                {/*<div className="flex justify-between">*/}
                {/*  <p className="font-bold">Total</p>*/}
                {/*  <p className="font-bold">€ 279</p>*/}
                {/*</div>*/}
                <div className="flex justify-between">
                  <p>Number of Nights: </p>
                  <p>
                    {Math.abs(
                      differenceInDays(
                        getValues('checkin_date'),
                        getValues('checkout_date')
                      )
                    )}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="font-bold">Total (taxes included)</p>
                  <p className="font-bold">
                    {formState.formSubmitted && !formState.formErrors ? (
                      <span className="font-bold pb-2 inline-block">
                        <PropertyPrice
                          price={formState.responseMessage?.calculated_fees}
                        />
                      </span>
                    ) : null}
                  </p>
                </div>
                <Button
                  extraClasses="w-full"
                  type="submit"
                  variant={ButtonVariants.BookingFormSuccess}
                >
                  Instant Book
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className={`fixed left-0 bottom-0 w-full z-20 bg-white transition-all transition-duration-100 ${!isBookbarVisible ? 'translate-y-full' : 'translate-y-0'}`}
      >
        <Container variant={ContainerVariant.Fluid}>
          <div className="flex flex-col md:flex-row justify-between items-center py-4">
            <p className="pb-0 mb-3">
              <span className="text-lg lg:text-2xl font-serif">
                <PropertyPrice
                  price={propertyData?.price}
                  variant={EnumPropertyPricePropsVariant.SINGLE_OR_RANGE}
                />
              </span>
              <span className="text-sm">
                {propertyData?.price?.EUR ? '/per night' : null}
              </span>
            </p>
            <div>
              {!selectedDatesAreValid ? (
                <Button
                  onClick={() => {
                    scrollToForm();
                  }}
                  extraClasses="w-fit"
                  disabled={loading}
                  type="submit"
                  variant={ButtonVariants.Danger}
                >
                  Check Availability
                </Button>
              ) : (
                <Button
                  extraClasses="w-full"
                  type="submit"
                  variant={ButtonVariants.BookingFormSuccess}
                >
                  Instant Book
                </Button>
              )}
            </div>
          </div>
        </Container>
      </div>
    </form>
  );
};
