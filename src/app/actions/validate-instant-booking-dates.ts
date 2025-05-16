import { TInstantBookingSchema } from '~/(pages)/[lang]/(pagegroup)/luxury-home-rentals/[...slug]/Booking/BookingForm/formSchemas';
import apiEndpoints from '~/lib/@apiEndpoints';

export async function validateInstantBookingDates({
  data,
}: {
  data: TInstantBookingSchema & { property_slug: string };
}) {
  const endpoint = `${process.env.API_HOST}${apiEndpoints.INSTANT_BOOKING.READ_SLUG(data.property_slug)}?start_date=${data.checkin_date}&end_date=${data.checkout_date}`;

  const fetchOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  };

  const res = await fetch(endpoint, fetchOptions);

  return res.json();
}
