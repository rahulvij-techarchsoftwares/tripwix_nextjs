import React from 'react';
import { z } from 'zod';

import { Locale } from '~/i18n.config';
import { User } from '~/types/globalTypes';

// AccountDashboard Related types:
export interface AccountDashboardProps {
  children?: React.ReactNode;
}

export interface PropertyShareProps {
  propertyUrl: string;
  lang: Locale;
}

export interface WishlistProps {
  lang: Locale;
}

// ClientArea Related types:
export interface ClientAreaProps {
  userData: User | undefined;
}

export const baseSchema = z
  .object({
    first_name: z.string().min(1, { message: 'Required' }),
    last_name: z.string().min(1, { message: 'Required' }),
    email: z.string().min(1, { message: 'Required' }).email(),
    phone_number: z.string().min(1, { message: 'Required' }),
  })
  .refine(data => data.phone_number.startsWith('+'));

export const passwordSchema = z
  .object({
    password: z.string().min(1, { message: 'Required' }),
    confirm_password: z.string().min(1, { message: 'Required' }),
  })
  .refine(data => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ['confirm_password'],
  });

export type BaseSchemaType = z.infer<typeof baseSchema>;
export type PasswordSchemaType = z.infer<typeof passwordSchema>;
export type TClientAreaSchema = BaseSchemaType & Partial<PasswordSchemaType>;
