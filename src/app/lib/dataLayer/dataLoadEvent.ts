import { hashEmail } from '~/lib/utils';

export const dataLoadDataLayerEvent = (userData: any) => {
  if (!userData) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'dataLoad',
    user_id: hashEmail(userData.email),
    user_email: userData.email,
    name: userData.first_name,
    phone_number: userData.phone_number,
  });
};
