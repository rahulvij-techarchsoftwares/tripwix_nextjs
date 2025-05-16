import { TInquirySchema } from '~/(pages)/[lang]/(pagegroup)/luxury-home-rentals/[...slug]/Booking/BookingForm/types';
import apiEndpoints from '~/lib/@apiEndpoints';

export async function postInquiryForm({ data }: { data: TInquirySchema }) {
  const endpoint = `${process.env.API_HOST}${apiEndpoints.POST_INQUIRY_FORM.POST}`;

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
