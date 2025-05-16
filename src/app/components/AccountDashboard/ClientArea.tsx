'use client';

import 'react-phone-input-2/lib/style.css';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import { toast } from 'react-toastify';
import * as z from 'zod';

import { pushUpdateUserData } from '~/actions/mutations';
import { getUserData } from '~/actions/queries';
import { Button, ButtonVariants } from '~/components/CTA';
import { getBrowserLanguageToPhoneCountry } from '~/lib/utils';
import { phoneMasksByLanguage } from '~/types/globalTypes';

import { Spinner } from '../Spinner';
import { baseSchema, passwordSchema, TClientAreaSchema } from './types';

export const ClientArea = () => {
  const [passwordEditMode, setPasswordEditMode] = useState<boolean>(false);

  const { data: userData } = useQuery({
    queryKey: ['getUserData'],
    queryFn: getUserData,
  });

  const schema = passwordEditMode
    ? z.intersection(baseSchema, passwordSchema)
    : baseSchema;

  const { mutate, isPending } = useMutation({
    mutationFn: pushUpdateUserData,
    onSuccess: () => {
      toast.success('User Data Updated!');
      setPasswordEditMode(false);
    },
    onError: error => {
      console.error('Failed to update user:', error);
    },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    setValue,
  } = useForm<TClientAreaSchema>({
    resolver: zodResolver(schema),
    mode: 'all',
    defaultValues: {
      first_name: userData?.first_name || '',
      last_name: userData?.last_name || '',
      email: userData?.email || '',
      phone_number: userData?.phone_number || '',
    },
  });

  const onSubmit = async (data: TClientAreaSchema) => {
    if (!passwordEditMode) {
      delete data.password;
      delete data.confirm_password;
    }

    mutate(data as TClientAreaSchema);
  };

  useEffect(() => {
    setValue('first_name', userData?.first_name || '');
    setValue('last_name', userData?.last_name || '');
    setValue('email', userData?.email || '');
    setValue('phone_number', userData?.phone_number || '');
  }, [userData]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid md:grid-cols-2 gap-8 p-1 lg:p-10"
    >
      <div>
        <label className="font-bold pb-2 block" htmlFor="first_name">
          First Name
        </label>
        <input type="text" {...register('first_name', { required: true })} />
        {errors.first_name && (
          <small className="text-error">This field is required</small>
        )}
      </div>
      <div>
        <label className="font-bold pb-2 block" htmlFor="last_name">
          Last Name
        </label>
        <input type="text" {...register('last_name', { required: true })} />
        {errors.last_name && (
          <small className="text-error">This field is required</small>
        )}
      </div>
      <div>
        <label className="font-bold pb-2 block" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          {...register('email', { required: true })}
          disabled={true}
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
          defaultValue={userData?.phone_number || ''}
          render={({ field }) => {
            return (
              <>
                <label className="font-bold pb-2 block" htmlFor="phone_number">
                  Phone Number
                </label>
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
              </>
            );
          }}
        />
        {errors.phone_number && (
          <small className="text-error">This field is required</small>
        )}
      </div>
      {passwordEditMode ? (
        <>
          <div>
            <label className="font-bold pb-2 block" htmlFor="password">
              Password
            </label>
            <input type="password" {...register('password')} />
            {errors.password && (
              <small className="text-error">{errors.password.message}</small>
            )}
          </div>
          <div>
            <label className="font-bold pb-2 block" htmlFor="confirm_password">
              Confirm Password
            </label>
            <input type="password" {...register('confirm_password')} />
            {errors.confirm_password && (
              <small className="text-error">
                {errors.confirm_password.message}
              </small>
            )}
          </div>
        </>
      ) : (
        <>
          <div>
            <label className="font-bold pb-2 block">Password</label>
            <div className="flex items-center disabled-input px-4 rounded-md w-full">
              <input
                type="password"
                value="password"
                disabled
                className="border-none focus:outline-none bg-transparent !pl-0"
              />
              <a
                onClick={() => setPasswordEditMode(true)}
                className="ml-auto font-semibold underline underline-offset-2 cursor-pointer"
              >
                Change
              </a>
            </div>
          </div>
          <div></div>
        </>
      )}
      {passwordEditMode && !isValid ? (
        <Button
          type="submit"
          variant={ButtonVariants.Danger}
          onClick={() => setPasswordEditMode(false)}
        >
          Cancel
        </Button>
      ) : (
        <Button
          type="submit"
          variant={ButtonVariants.FormFieldSuccess}
          disabled={!isValid || isPending}
          extraClasses={!isValid ? 'opacity-50 cursor-not-allowed' : ''}
        >
          {passwordEditMode && !isValid ? (
            <>Cancel</>
          ) : (
            <>
              {isPending ? (
                <Spinner extraClasses="!h-4 !w-4 border-2" />
              ) : (
                'Save'
              )}
            </>
          )}
        </Button>
      )}
    </form>
  );
};
