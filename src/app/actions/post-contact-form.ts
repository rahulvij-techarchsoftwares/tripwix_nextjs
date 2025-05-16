import { TGetInTouchSchema } from '~/components/Contact/types';
import apiEndpoints from '~/lib/@apiEndpoints';

export async function postContactForm({ data }: { data: TGetInTouchSchema }) {
  const endpoint = `${process.env.API_HOST}${apiEndpoints.POST_CONTACT_FORM.POST}`;

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
