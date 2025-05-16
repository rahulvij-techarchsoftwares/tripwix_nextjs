'use client';

import './styles.css';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Spinner } from '~/components/Spinner';
import { ASSET_PATHS } from '~/configs/assetPaths';
import { PAGE_PATHS } from '~/lib/constants';

import {
  LoginFormSchema,
  loginFormSchema,
  onSubmitFunction,
} from './formSchemas';
import { LoginFormProps } from './types';

export const LoginForm: React.FC<LoginFormProps> = ({ lang, children }) => {
  const searchParams = useSearchParams();

  const { data: session } = useSession();

  const error = searchParams?.get('error');
  const success = searchParams?.get('success');
  const targetUrl = searchParams?.get('targetUrl');
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit: onSubmitFunction = async data => {
    setIsSubmitting(true);
    await signIn('credentials', {
      username: data.username,
      password: data.password,
      callbackUrl: `${targetUrl ? `${targetUrl}/?login=success` : '/en/account/?login=success'}`,
    }).finally(() => setIsSubmitting(false));
  };

  useEffect(() => {
    if (session) {
      router.push('/account');
    }
  }, [session]);

  return (
    <div className="p-6 lg:p-20 bg-quaternary">
      {success ? (
        <h3 className="text-center mb-10">
          Thank for joining us, <br /> Please login with your credentials!
        </h3>
      ) : null}
      <div className="flex flex-col items-center justify-center">
        <Image
          src={ASSET_PATHS.SMALL_LOGO}
          width={44}
          height={37}
          alt="tripwix logo"
        />
        <h3 className="mt-2 mb-4">Log In</h3>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 sm:p-4 max-w-[90%] md:max-w-[420px] mx-auto"
      >
        <div>
          <input
            className="w-full p-2 border border-gray-300 rounded-sm border-quinary-50"
            type="text"
            id="username"
            placeholder="Email"
            {...register('username', { required: true })}
          />
          {errors.username && (
            <small className="text-error">This field is required</small>
          )}
        </div>
        <div>
          <input
            className="w-full p-2 border border-gray-300 rounded-sm border-quinary-50"
            type="password"
            id="firstName"
            placeholder="Password"
            {...register('password', { required: true })}
          />
          {errors.password && (
            <small className="text-error">This field is required</small>
          )}
        </div>
        {error === 'CredentialsSignin' ? (
          <p className="text-error text-sm">Wrong Username or Password</p>
        ) : null}
        {!isSubmitting ? (
          <button
            type="submit"
            className="py-3 font-semibold bg-success text-white p-2 rounded-xl w-full block hover:opacity-90 transition-all"
          >
            Log In
          </button>
        ) : (
          <div className="flex flex-row justify-center my-4">
            <Spinner />
          </div>
        )}
        <Link
          href={`/${lang}/${PAGE_PATHS.REGISTER}`}
          passHref
          className="py-3 font-semibold bg-white text-success p-2 text-center rounded-xl w-full block border border-success hover:opacity-90 transition-all"
        >
          Sign Up
        </Link>
        <Link
          href={`/${lang}/${PAGE_PATHS.FORGOT_PASSWORD}`}
          passHref
          className=" text-success p-2 text-center w-full block transition-all"
        >
          Forgot password
        </Link>
      </form>
      <div className="flex flex-col items-center justify-center mt-2">
        <button
          className="login-with-google-btn mb-6"
          onClick={() =>
            signIn('google', {
              callbackUrl: `${targetUrl ? `${targetUrl}/?login=success` : '/en/account/?login=success'}`,
            })
          }
        >
          Sign in with Google
        </button>
        <button
          className="login-with-apple-btn bg-white"
          onClick={() =>
            signIn('apple', {
              callbackUrl: `${targetUrl ? `${targetUrl}/?login=success` : '/en/account/?login=success'}`,
            })
          }
        >
          <Image
            src="/assets/appleid_button.png"
            alt=""
            width="195"
            height="45"
          />
        </button>
      </div>
    </div>
  );
};
