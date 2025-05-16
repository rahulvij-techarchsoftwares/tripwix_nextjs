import {
  ForgotPasswordFormSchema,
  ResetPasswordFormSchema,
} from '~/components/Password/formSchemas';
import { RegisterFormSchema } from '~/components/RegisterForm/formSchema';
import apiEndpoints from '~/lib/@apiEndpoints';

export async function signupForm({ data }: { data: RegisterFormSchema }) {
  const endpoint = `${process.env.API_HOST}${apiEndpoints.AUTH.SIGNUP}`;

  const fetchOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    method: 'POST',
  };

  const res = await fetch(endpoint, fetchOptions);

  return res.json();
}

export async function forgotPasswordForm({
  data,
}: {
  data: ForgotPasswordFormSchema;
}) {
  const endpoint = `${process.env.API_HOST}${apiEndpoints.AUTH.FORGOT_PASSWORD}`;

  const fetchOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    method: 'POST',
  };

  const res = await fetch(endpoint, fetchOptions);

  return res.json();
}

export async function resetPasswordForm({
  data,
}: {
  data: ResetPasswordFormSchema;
}) {
  const endpoint = `${process.env.API_HOST}${apiEndpoints.AUTH.RESET_PASSWORD}`;

  const fetchOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    method: 'POST',
  };

  const res = await fetch(endpoint, fetchOptions);

  return res.json();
}
