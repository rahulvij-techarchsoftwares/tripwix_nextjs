import { z } from 'zod';

import { zodValidatorPhone } from '~/lib/commonZodValidators';
import { MarginVariants } from '~/types';

export interface ContactFormProps {
  title?: string;
  description?: string;
}

export interface CreateContactFormProps {
  title: {
    value: string;
  };
  description: {
    value: string;
  };
  bg_image: {
    value: {
      image: string;
    };
  };
  margin_top: {
    value: {
      slug: MarginVariants;
    };
  };
}

export const contactFormSchema = z.object({
  src_id: z.number().nullable().optional(),
  form_id: z.number().nullable().optional(),
  first_name: z.string().min(1, { message: 'Required' }),
  last_name: z.string().min(1, { message: 'Required' }),
  email: z.string().min(1, { message: 'Required' }).email(),
  phone_number: zodValidatorPhone,
  desired_destination: z.string().min(1, { message: 'Required' }),
  how_can_we_help: z.string().min(1, { message: 'Required' }),
  where_heard_about_us: z.string(),
  questions_or_comments: z.string(),
  how_can_we_help_extra_field: z.string().optional(),
  where_heard_about_us_extra_field: z.string().optional(),
  newsletter: z.boolean().optional(),
  smsMarketing: z.boolean().optional(),
});

export type TGetInTouchSchema = z.infer<typeof contactFormSchema>;
export type onSubmitFunction = (data: TGetInTouchSchema) => Promise<void>;
