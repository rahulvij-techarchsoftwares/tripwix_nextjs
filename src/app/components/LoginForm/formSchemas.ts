import { z } from 'zod';

export const loginFormSchema = z.object({
  // username: z.string().min(1, { message: 'Required' }).email(),
  password: z.string().min(1, { message: 'Required' }),
  username: z.string().min(1, { message: 'Required' }),
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;
export type onSubmitFunction = (data: LoginFormSchema) => Promise<void>;
