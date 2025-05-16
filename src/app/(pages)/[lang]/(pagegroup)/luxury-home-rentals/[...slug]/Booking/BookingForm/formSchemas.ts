import { z } from 'zod';

import { zodValidatorPhone } from '~/lib/commonZodValidators';

export const instantBookingFormSchema = z.object({
  property_id: z.string().nullable().optional(),
  checkin_date: z.preprocess(
    val => (val === '' ? undefined : val),
    z.string().min(1, { message: 'This field is required' })
  ),
  checkout_date: z.preprocess(
    val => (val === '' ? undefined : val),
    z.string().min(1, { message: 'This field is required' })
  ),
  number_of_guests: z
    .number()
    .int()
    .gt(0, { message: 'This field is required' }),
  number_of_bedrooms: z.number().default(1),
  addANote: z.string().nullable().optional(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  email: z.union([z.literal(''), z.string().email()]),
  phone_number: zodValidatorPhone,
});

export type TInstantBookingSchema = z.infer<typeof instantBookingFormSchema>;
export type onSubmitFunction = (data: TInstantBookingSchema) => Promise<void>;
