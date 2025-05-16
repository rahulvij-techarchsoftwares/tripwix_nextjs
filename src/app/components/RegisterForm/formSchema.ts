import { z } from 'zod';

import { PhoneRegex } from '~/lib/utils';

export const registerFormSchema = z
  .object({
    first_name: z.string().min(1, { message: 'Required' }),
    last_name: z.string().min(1, { message: 'Required' }),
    email: z.string().min(1, { message: 'This Field is Required' }).email(),
    phone_number: z.string().regex(PhoneRegex, 'Invalid Number!').optional(),
    password: z.string().min(1, { message: 'Required' }),
    confirm_password: z.string().min(1, { message: 'Required' }),
  })
  .refine(data => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ['confirm_password'],
  });

export type RegisterFormSchema = z.infer<typeof registerFormSchema>;
export type onSubmitFunction = (data: RegisterFormSchema) => Promise<void>;
