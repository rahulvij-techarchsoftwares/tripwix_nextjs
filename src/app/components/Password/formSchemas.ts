import { z } from 'zod';

// Request new password form schema:
export const ForgotPasswordFormSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
});

export type ForgotPasswordFormSchema = z.infer<typeof ForgotPasswordFormSchema>;
export type onSubmitForgotPasswordFunction = (
  data: ForgotPasswordFormSchema
) => Promise<void>;

// Reset password form schema:
export const resetPasswordFormSchema = z.object({
  token: z.string().min(1, { message: 'Token is required' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
  password_confirm: z.string().min(8, {
    message: 'Password confirmation must be at least 8 characters long',
  }),
});

export type ResetPasswordFormSchema = z.infer<typeof resetPasswordFormSchema>;
export type onSubmitFunction = (data: ResetPasswordFormSchema) => Promise<void>;
