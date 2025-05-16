import apiEndpoints from '~/lib/@apiEndpoints';

type NewsletterFormData = {
  email: string;
};

export const subscribeNewsletter = async ({ email }: NewsletterFormData) => {
  const response = await fetch(
    `${process.env.API_HOST}${apiEndpoints.SUBSCRIBE_NEWSLETTER}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    }
  );
  return response;
};
