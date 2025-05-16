import libphonenumber from 'google-libphonenumber';
import { z } from 'zod';

const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();

export const zodValidatorPhone = z
  .string()
  .nonempty({ message: 'Mobile number is required' })
  .refine(
    number => {
      try {
        const phoneNumber = phoneUtil.parse(number);
        const region = phoneUtil.getRegionCodeForNumber(phoneNumber);
        return phoneUtil.isValidNumberForRegion(phoneNumber, region);
      } catch (error) {
        return false;
      }
    },
    { message: 'Invalid mobile number' }
  );
