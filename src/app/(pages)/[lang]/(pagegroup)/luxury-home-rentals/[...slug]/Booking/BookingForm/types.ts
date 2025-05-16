import { z } from 'zod';

import { zodValidatorPhone } from '~/lib/commonZodValidators';

export enum BookingFormVariant {
  Inquiry = 'Inquiry',
  InstantBook = 'InstantBook',
}

export interface BookingFormProps {
  children?: React.ReactNode;
  variant: BookingFormVariant;
}

export const inquiryFormSchema = z.object({
  property_id: z.string().nullable().optional(),
  source_url: z.string().nullable().optional(),
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
  note: z.string(),
  first_name: z.string().min(1, { message: 'Required' }),
  last_name: z.string().min(1, { message: 'Required' }),
  email: z.string().min(1, { message: 'Required' }),
  phone_number: zodValidatorPhone,
  flexible_dates: z.boolean().default(false),
  newsletter: z.boolean().optional(),
  smsMarketing: z.boolean().optional(),
});

export type TInquirySchema = z.infer<typeof inquiryFormSchema>;
export type onSubmitFunction = (data: TInquirySchema) => Promise<void>;
