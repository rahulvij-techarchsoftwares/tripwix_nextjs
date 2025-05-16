'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';

import { forgotPasswordForm } from '~/actions/auth';
import { ASSET_PATHS } from '~/configs/assetPaths';
import { PAGE_PATHS } from '~/lib/constants';

import {
  ForgotPasswordFormSchema,
  onSubmitForgotPasswordFunction,
} from './formSchemas';
import { ForgotPasswordFormProps } from './types';

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = () => {
  const [formState, setFormState] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormSchema>({
    resolver: zodResolver(ForgotPasswordFormSchema),
  });

  const onSubmit: onSubmitForgotPasswordFunction = async data => {
    try {
      await forgotPasswordForm({
        data: {
          ...data,
        },
      });
      setFormState(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
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
        <h3 className="mt-2 mb-4">Forgot Password</h3>
      </div>
      {formState ? (
        <div className="p-2 text-center w-full block transition-all">
          We&apos;ve sent you an email, check your inbox.
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 sm:p-4 max-w-[90%] md:max-w-[420px] mx-auto"
        >
          <div>
            <input
              className="w-full p-2 border border-gray-300 rounded-sm border-quinary-50"
              type="email"
              id="email"
              placeholder="Email"
              {...register('email', { required: true })}
            />
            {errors.email && (
              <small className="text-error">This field is required</small>
            )}
          </div>
          <button
            type="submit"
            className="py-3 font-semibold bg-success text-white p-2 rounded-xl w-full block hover:opacity-90 transition-all"
          >
            Submit
          </button>
          <Link
            href={`/en/${PAGE_PATHS.LOGIN}`}
            className="text-success p-2 text-center w-full block transition-all"
          >
            Login
          </Link>
        </form>
      )}
    </div>
  );
};
