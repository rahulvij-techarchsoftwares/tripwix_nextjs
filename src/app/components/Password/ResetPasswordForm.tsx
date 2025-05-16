'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { resetPasswordForm } from '~/actions/auth';
import { Spinner } from '~/components/Spinner';
import { ASSET_PATHS } from '~/configs/assetPaths';
import { PAGE_PATHS } from '~/lib/constants';

import {
  onSubmitFunction,
  ResetPasswordFormSchema,
  resetPasswordFormSchema,
} from './formSchemas';
import { ResetPasswordFormProps } from './types';

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  token,
}) => {
  const { data: session } = useSession();
  const [tokenError, setTokenError] = React.useState('');
  const [responseError, setResponseError] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [successState, setSuccessState] = React.useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ResetPasswordFormSchema>({
    resolver: zodResolver(resetPasswordFormSchema),
  });

  const onSubmit: onSubmitFunction = async data => {
    if (data.password !== data.password_confirm) {
      setError('password_confirm', {
        type: 'manual',
        message: 'Passwords do not match',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const responseData = await resetPasswordForm({
        data: {
          ...data,
        },
      });

      // If there is a password error, set the response error to the password error
      if (responseData?.password) {
        setResponseError(responseData.password.join(' '));
      } else {
        setResponseError('');
      }

      // If there is a token error, set the token error to the token error
      if (responseData?.token) {
        setTokenError('Invalid token');
      } else {
        setTokenError('');
      }

      // If there is a success message, setSuccessState
      if (responseData?.success) {
        setSuccessState(true);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setTokenError('Error submitting form');
    }
    setIsSubmitting(false);
  };

  useEffect(() => {
    if (session) {
      router.push('/account');
    }
  }, [session]);

  return (
    <div className="p-6 lg:p-20 bg-quaternary">
      <div className="flex flex-col items-center justify-center">
        <Image
          src={ASSET_PATHS.SMALL_LOGO}
          width={44}
          height={37}
          alt="tripwix logo"
        />
        <h3 className="mt-2 mb-4">Reset Password</h3>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onChange={() => {
          setTokenError('');
          setIsSubmitting(false);
        }}
        className="flex flex-col gap-4 sm:p-4 max-w-[90%] md:max-w-[420px] mx-auto"
      >
        <input id="token" type="hidden" value={token} {...register('token')} />
        {errors.token && (
          <small className="text-error">{errors.token?.message}</small>
        )}
        {successState ? (
          <small className="text-center w-full block text-success">
            Password reset successful. Please sign in.
          </small>
        ) : (
          <>
            <div>
              <input
                className="w-full p-2 border border-gray-300 rounded-sm border-quinary-50"
                type="password"
                id="password"
                placeholder="New Password"
                {...register('password', { required: true })}
              />
              {errors.password && (
                <small className="text-error">
                  {errors.password?.message || 'This field is required'}
                </small>
              )}
            </div>
            <div>
              <input
                className="w-full p-2 border border-gray-300 rounded-sm border-quinary-50"
                type="password"
                id="password_confirm"
                placeholder="Repeat Password"
                {...register('password_confirm', { required: true })}
              />
              {errors.password_confirm && (
                <small className="text-error">
                  {errors.password_confirm?.message || 'This field is required'}
                </small>
              )}
            </div>
            {!isSubmitting ? (
              <button
                type="submit"
                className="py-3 font-semibold bg-success text-white p-2 rounded-xl w-full block hover:opacity-90 transition-all"
              >
                Reset Password
              </button>
            ) : (
              <div className="flex flex-row justify-center my-4">
                <Spinner />
              </div>
            )}
            {responseError != '' && (
              <small className="text-error">{responseError}</small>
            )}
            {tokenError && <small className="text-error">{tokenError}</small>}
          </>
        )}
        <Link
          href={`/en/${PAGE_PATHS.LOGIN}`}
          passHref
          className="text-success p-2 text-center w-full block transition-all"
        >
          Sign In
        </Link>
      </form>
    </div>
  );
};
