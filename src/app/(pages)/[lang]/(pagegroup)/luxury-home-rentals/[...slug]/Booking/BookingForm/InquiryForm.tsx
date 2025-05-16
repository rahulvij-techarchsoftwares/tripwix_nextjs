'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { compareAsc, differenceInDays, format } from 'date-fns';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';

import { postInquiryForm } from '~/actions/post-inquiry-form';
import { CustomCheckbox } from '~/components';
import { useBookingFrame } from '~/components/BookingFrameProvider';
import { CalendarField } from '~/components/CalendarField/CalendarField';
import { Container, ContainerVariant } from '~/components/Container';
import { Button, ButtonVariants } from '~/components/CTA';
import { CustomIconVariant } from '~/components/CustomIcon';
import { PropertyPrice } from '~/components/PropertyPrice';
import { EnumPropertyPricePropsVariant } from '~/components/PropertyPrice/types';
import { QuantitySelector } from '~/components/QuantitySelector';
import { TermsAndConditionsLabel } from '~/components/TermsAndConditionsLabel';
import { Locale } from '~/i18n.config';
import { PAGE_PATHS, SEARCH_PARAMETERS } from '~/lib/constants';
import { dataLayerGenerateLeadEvent } from '~/lib/dataLayer/datalayer';
import { getBrowserLanguageToPhoneCountry } from '~/lib/utils';
import { FetchedPropertyData, phoneMasksByLanguage } from '~/types/globalTypes';

import { inquiryFormSchema, onSubmitFunction, TInquirySchema } from './types';

export const InquiryForm = ({
  propertyData,
}: {
  propertyData?: FetchedPropertyData;
}) => {
  const lang: Locale = 'en';
  const [formState, setFormState] = useState({
    responseMessage: '',
    formSubmitted: false,
  });
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors, isValid },
  } = useForm<TInquirySchema>({
    resolver: zodResolver(inquiryFormSchema),
    mode: 'all',
  });

  const router = useRouter();
  const [checkinDate, setCheckinDate] = React.useState<Date>();
  const [checkoutDate, setCheckoutDate] = React.useState<Date>();
  const [isBookbarVisible, setIsBookbarVisible] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const checkoutInputRef = useRef<HTMLInputElement | null>(null);
  const { triggerExpand } = useBookingFrame();

  const searchParams = useSearchParams();
  const numGuests = searchParams?.get('num_guests') || '';
  const numBedrooms = searchParams?.get('num_bedrooms') || '';
  const arrivalDate = searchParams?.get(SEARCH_PARAMETERS.ARRIVAL_DATE) || '';
  const departureDate =
    searchParams?.get(SEARCH_PARAMETERS.DEPARTURE_DATE) || '';

  const handleScroll = () => {
    if (window.scrollY > 1200) {
      document.body.classList.add('footer-margin-bottom');
      setIsBookbarVisible(true);
    } else {
      document.body.classList.remove('footer-margin-bottom');
      setIsBookbarVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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

      triggerExpand(true);
    }
  };

  watch('first_name');
  watch('last_name');
  watch('number_of_guests');
  watch('number_of_bedrooms');
  watch('flexible_dates');

  const redirectToThankYouPage = () => {
    router.push(`/${lang}/inquiry-submitted`);
  };

  const onSubmit: onSubmitFunction = async data => {
    try {
      const responseData = await postInquiryForm({
        data: {
          ...data,
          source_url: `${process.env.NEXT_PUBLIC_URL}/${lang}/${PAGE_PATHS.PROPERTY_LIST}/${propertyData?.slug}`,
          property_id: propertyData?.id! ? `${propertyData.id}` : '',
        },
      });
      setFormState({
        responseMessage: responseData.message,
        formSubmitted: true,
      });
      dataLayerGenerateLeadEvent({
        numNights: Math.abs(
          differenceInDays(data.checkin_date, data.checkout_date)
        ),
        numGuests: data.number_of_guests,
        email: data.email,
        phoneNumber: data.phone_number,
        leadId: responseData.inquiry_id,
      });
      reset();
      redirectToThankYouPage();
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormState({
        responseMessage: 'Error submitting form',
        formSubmitted: false,
      });
    }
  };

  if (formState.responseMessage) {
    return (
      <div className="text-center">
        <h5 className="text-success mt-5">
          {formState.responseMessage != ''
            ? `${formState.responseMessage}`
            : `Thank you for reaching out! We'll contact you soon.`}
        </h5>
      </div>
    );
  }

  return (
    <>
      <form
        ref={formRef}
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4"
      >
        <div>
          <input
            type="text"
            id="firstName"
            {...register('first_name', { required: true })}
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
            {...register('last_name', { required: true })}
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
            {...register('email', { required: true })}
            placeholder="Email Address"
          />
          {errors.email && (
            <small className="text-error">This field is required</small>
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
                  if (checkoutInputRef.current) {
                    checkoutInputRef.current.click();
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
                  ref={checkoutInputRef}
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
        <div className="border rounded-md px-2 py-1 h-[48px]">
          <Controller
            name="number_of_bedrooms"
            control={control}
            render={({ field }) => (
              <QuantitySelector
                extraClasses="left-aligned-quantity-select"
                onChange={field.onChange}
                value={numBedrooms ? parseInt(numBedrooms) : 0}
                singularDescription="Bedroom"
                pluralDescription="Bedrooms"
                placeholder="Add Bedrooms"
                max={propertyData?.num_bedrooms}
                iconVariant={CustomIconVariant.Bedroom}
              />
            )}
          />
          {errors.number_of_bedrooms && (
            <small className="text-error">This field is required</small>
          )}
        </div>
        <div className="col-span-2">
          <div>
            <div>
              <input
                type="text"
                id="note"
                {...register('note')}
                placeholder="Add a note"
              />
            </div>
          </div>
          <div className="text-center mt-3">
            <small>Minimum night requirements may apply.</small>
          </div>
          <div className="mt-4">
            <Controller
              key={'id'}
              name="flexible_dates"
              control={control}
              defaultValue={false}
              render={({ field }) => {
                return (
                  <CustomCheckbox
                    label="My Travel Dates Are Flexible"
                    checked={field.value}
                    onChange={field.onChange}
                  />
                );
              }}
            />
          </div>
          <p className="w-full pb-0 text-sm mt-6 mb-4 font-light">
            Keep me updated with:
          </p>
          <div className="md:col-span-2 flex flex-row items-center">
            <Controller
              name="newsletter"
              control={control}
              defaultValue={false}
              render={({ field }) => {
                return (
                  <CustomCheckbox
                    label="Newsletters and offers"
                    capitalizeLabel={false}
                    checked={field.value}
                    onChange={field.onChange}
                  />
                );
              }}
            />
            <Controller
              name="smsMarketing"
              control={control}
              defaultValue={false}
              render={({ field }) => {
                return (
                  <CustomCheckbox
                    label="SMS updates"
                    capitalizeLabel={false}
                    checked={field.value}
                    onChange={field.onChange}
                  />
                );
              }}
            />
          </div>
          <div className="text-center mt-4">
            <div className="flex flex-col gap-2 my-2">
              <Button
                type="submit"
                variant={ButtonVariants.BookingFormSuccess}
                disabled={!isValid}
                extraClasses={!isValid ? 'opacity-50 cursor-not-allowed' : ''}
              >
                Inquiry Now
              </Button>
            </div>
          </div>
          <div className="mt-4">
            <TermsAndConditionsLabel lang={lang} />
          </div>
        </div>
        <div
          className={`fixed left-0 bottom-0 w-full z-20 bg-white transition-all transition-duration-100 ${!isBookbarVisible ? 'translate-y-full' : 'translate-y-0'}`}
        >
          <Container variant={ContainerVariant.Fluid}>
            <div className="flex flex-col md:flex-row justify-between items-center py-4 gap-3">
              <p className={'pb-0'}>
                <span className="text-2xl font-serif">
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
                <Button
                  variant={ButtonVariants.BookingFormSuccess}
                  onClick={() => {
                    scrollToForm();
                  }}
                  extraClasses="w-fit"
                  type="button"
                >
                  Inquiry Now
                </Button>
              </div>
            </div>
          </Container>
        </div>
      </form>
    </>
  );
};
