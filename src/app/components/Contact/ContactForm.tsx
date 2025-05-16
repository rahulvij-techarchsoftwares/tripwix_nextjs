'use client';

import 'react-phone-input-2/lib/style.css';

import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';

import { postContactForm } from '~/actions/post-contact-form';
import { Button, ButtonVariants } from '~/components/CTA';
import { CustomCheckbox } from '~/components/FormFields';
import { TermsAndConditionsLabel } from '~/components/TermsAndConditionsLabel';
import { Title, TitleVariants } from '~/components/Title';
import { Locale } from '~/i18n.config';
import { getBrowserLanguageToPhoneCountry } from '~/lib/utils';
import { phoneMasksByLanguage } from '~/types/globalTypes';

import {
  ContactFormProps,
  contactFormSchema,
  onSubmitFunction,
  TGetInTouchSchema,
} from './types';

export const ContactForm: React.FC<ContactFormProps> = ({
  title,
  description,
}) => {
  const lang: Locale = 'en';
  const [showOtherField1, setShowOtherField1] = useState(false);
  const [showOtherField2, setShowOtherField2] = useState(false);
  const [formState, setFormState] = useState({
    responseMessage: '',
    formSubmitted: false,
  });
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<TGetInTouchSchema>({
    resolver: zodResolver(contactFormSchema),
  });

  const handleHowCanWeHelpChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = event.target;
    setShowOtherField1(value === 'other');
  };

  const handleWhereHeardAboutUsChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = event.target;
    setShowOtherField2(value === 'other');
  };

  const onSubmit: onSubmitFunction = async data => {
    try {
      const responseData = await postContactForm({ data });
      setFormState({
        responseMessage: responseData.message,
        formSubmitted: true,
      });
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormState({
        responseMessage: 'Error submitting form',
        formSubmitted: false,
      });
    }
  };

  const howCanWeHelpYouOptions = [
    { value: '', label: 'How can we help you?' },
    { value: 'villa_rental', label: `I'm interested in a Villa Rental` },
    {
      value: 'property_management',
      label: 'I would like to know more about property management',
    },
    {
      value: 'homeowner_partner',
      label: 'I am a homeowner and would like to partner with you',
    },
    {
      value: 'travel_agent_inquiry',
      label: 'I am a travel agent with an inquiry',
    },
    {
      value: 'book_services',
      label: 'Would like to book extra services and/or activities',
    },
    {
      value: 'press_member_info',
      label: 'I am a Press Member and desire information on the company',
    },
    { value: 'other', label: 'Other (specify the service)' },
  ];

  const hearAboutUsOptions = [
    { value: '', label: 'Where did you hear about us?' },
    { value: 'traveled_before', label: 'I have traveled with you before' },
    { value: 'word_of_mouth', label: 'Word of mouth' },
    { value: 'referral', label: 'Referral' },
    { value: 'search_engine', label: 'Search (Google, Bing, etc)' },
    { value: 'online_advertising', label: 'Online Advertising' },
    { value: 'influencer', label: 'Influencer' },
    { value: 'magazine_advert', label: 'Advert on Magazine' },
    { value: 'event', label: 'Event' },
    { value: 'social_media', label: 'Social Media' },
    { value: 'travel_agency', label: 'Travel Agency' },
    { value: 'other', label: 'Other (please specify)' },
  ];

  if (formState.responseMessage) {
    return (
      <div className="text-center">
        <FormIntro title={title} description={description} />
        <h5 className="text-success mt-5">
          {formState.responseMessage != ''
            ? `${formState.responseMessage}`
            : `Thank you for reaching out! We'll contact you soon.`}
        </h5>
      </div>
    );
  }

  return (
    <div className="text-center">
      <FormIntro title={title} description={description} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid md:grid-cols-2 gap-4 p-4"
      >
        <div>
          <input
            type="text"
            id="firstName"
            placeholder="First Name"
            {...register('first_name', { required: true })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.first_name && (
            <small className="text-error">This field is required</small>
          )}
        </div>
        <div>
          <input
            type="text"
            id="lastName"
            placeholder="Last Name"
            {...register('last_name', { required: true })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.last_name && (
            <small className="text-error">This field is required</small>
          )}
        </div>
        <div>
          <input
            type="email"
            id="email"
            placeholder="Email Address"
            {...register('email', { required: true })}
            className="w-full p-2 border border-gray-300 rounded"
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
        <div className="md:col-span-2">
          <input
            type="text"
            id="desiredDestination"
            placeholder="Desired Destination"
            {...register('desired_destination', { required: true })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.desired_destination && (
            <small className="text-error">This field is required</small>
          )}
        </div>
        <div className="md:col-span-2">
          <select
            id="howCanWeHelp"
            {...register('how_can_we_help', {
              required: true,
              validate: value => value !== '',
            })}
            className="w-full p-2 border border-gray-300 rounded"
            onChange={handleHowCanWeHelpChange}
          >
            {howCanWeHelpYouOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.how_can_we_help && (
            <small className="text-error">This field is required</small>
          )}
          {showOtherField1 && (
            <div className="md:col-span-2 mt-5">
              <textarea
                id="howCanWeHelpExtraField"
                {...register('how_can_we_help_extra_field')}
                placeholder="Specify the service"
                className="w-full p-2 border border-gray-300 rounded"
                rows={4}
              ></textarea>
            </div>
          )}
        </div>
        <div className="md:col-span-2">
          <select
            id="whereHeardAboutUs"
            {...register('where_heard_about_us', { required: true })}
            className="w-full p-2 border border-gray-300 rounded"
            onChange={handleWhereHeardAboutUsChange}
          >
            {hearAboutUsOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.where_heard_about_us && (
            <small className="text-error">This field is required</small>
          )}
          {showOtherField2 && (
            <div className="md:col-span-2 mt-5">
              <textarea
                id="whereHeardAboutUsExtraField"
                {...register('where_heard_about_us_extra_field')}
                placeholder="Please specify"
                className="w-full p-2 border border-gray-300 rounded"
                rows={4}
              ></textarea>
            </div>
          )}
        </div>
        <div className="md:col-span-2">
          <textarea
            id="questionsOrComments"
            placeholder="Questions and Comments"
            {...register('questions_or_comments', { required: true })}
            className="w-full p-2 border border-gray-300 rounded"
            rows={4}
          ></textarea>
          {errors.questions_or_comments && (
            <small className="text-error">This field is required</small>
          )}
        </div>
        <div className="md:col-span-2 flex flex-row items-center">
          <p className="w-full pb-0 text-sm">Keep me updated with:</p>
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
        <div className="md:col-span-2">
          <TermsAndConditionsLabel lang={lang} />
        </div>
        <div className="md:col-span-2">
          <Button
            type="submit"
            variant={ButtonVariants.FormFieldSuccess}
            extraClasses="w-full"
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};

const FormIntro = ({
  title = "Let's get in touch",
  description = 'Contact us today to learn more about how we can help maximize your property’s rental potential.',
}) => {
  return (
    <>
      <Title
        titleVariant={TitleVariants.H2}
        extraClasses="text-primary pb-3 pt-12 md:pt-0 h2 mb-3"
      >
        {title}
      </Title>
      <p className="text-sm">{description}</p>
    </>
  );
};
