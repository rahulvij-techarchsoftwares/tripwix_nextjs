'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';

import { signupUser } from '~/actions/mutations';
import { Spinner } from '~/components/Spinner';
import { ASSET_PATHS } from '~/configs/assetPaths';
import { PAGE_PATHS } from '~/lib/constants';
import { getBrowserLanguageToPhoneCountry } from '~/lib/utils';
import { phoneMasksByLanguage } from '~/types/globalTypes';

import {
  onSubmitFunction,
  RegisterFormSchema,
  registerFormSchema,
} from './formSchema';
import { RegisterFormProps } from './types';

export const RegisterForm: React.FC<RegisterFormProps> = ({ lang }) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
    mode: 'all',
  });

  const [errorData, setErrorData] = React.useState<any>(null);

  const router = useRouter();

  const redirectToLoginPage = () => {
    router.push(`/${lang}/${PAGE_PATHS.LOGIN}/?success=true`);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: signupUser,
    onSuccess: () => {
      setErrorData(null);
      redirectToLoginPage();
    },
    onError: (error: { response: { data: Record<string, string[]> } }) => {
      setErrorData(error.response.data);
    },
  });

  const onSubmit: onSubmitFunction = async data => {
    mutate(data as RegisterFormSchema);
  };

  return (
    <div className="p-6 lg:p-20 bg-quaternary">
      <div className="flex flex-col items-center justify-center">
        <Image
          src={ASSET_PATHS.SMALL_LOGO}
          width={44}
          height={37}
          alt="tripwix logo"
        />
        <h3 className="mt-2 mb-4">Sign Up</h3>
      </div>
      <form
        className="flex flex-col gap-4 sm:p-4 max-w-[90%] md:max-w-[420px] mx-auto"
        onSubmit={handleSubmit(onSubmit)}
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
          <input
            type="password"
            id="password"
            {...register('password', { required: true })}
            placeholder="Password"
          />
          {errors.password && (
            <small className="text-error">This field is required</small>
          )}
        </div>
        <div>
          <input
            type="password"
            id="confirmPassword"
            {...register('confirm_password', { required: true })}
            placeholder="Confirm Password"
          />
          {errors.confirm_password && (
            <small className="text-error">
              {errors.confirm_password.message}
            </small>
          )}
        </div>
        <div className="col-span-2">
          <div className="text-center mt-4">
            <div className="flex flex-col gap-2 my-2">
              {!isPending ? (
                <>
                  {errorData ? (
                    <>
                      {Object.keys(errorData).map(key => (
                        <p className="text-error text-sm" key={key}>
                          {key === 'email' ? null : (
                            <span className="capitalize">
                              {key.replace('_', ' ')}:{' '}
                            </span>
                          )}
                          {...errorData[key]}
                        </p>
                      ))}
                    </>
                  ) : null}
                  <button
                    type="submit"
                    className="py-3 font-semibold bg-success text-white p-2 rounded-xl w-full block hover:opacity-90 transition-all"
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <div className="flex flex-row justify-center my-4">
                  <Spinner />
                </div>
              )}
              <Link
                href={`/${lang}/${PAGE_PATHS.LOGIN}`}
                passHref
                className="py-3 font-semibold bg-white text-success p-2 text-center rounded-xl w-full block border border-success hover:opacity-90 transition-all"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
