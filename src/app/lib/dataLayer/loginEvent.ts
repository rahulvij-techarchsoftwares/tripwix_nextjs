import { hashEmail } from '~/lib/utils';

export const handleLoginDataLayerEvent = async (email: string) => {
  const hashedEmail = hashEmail(email);
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'user_login',
    user_email: hashedEmail, // Send the hashed email
  });
};
