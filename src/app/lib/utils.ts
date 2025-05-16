import { SHA256 } from 'crypto-js';

// https://dev.to/bybydev/how-to-slugify-a-string-in-javascript-4o9n
export function slugify(str: string) {
  str = str.replace(/^\s+|\s+$/g, ''); // trim leading/trailing white space
  str = str.toLowerCase(); // convert string to lowercase
  str = str
    .replace(/[^a-z0-9 -]/g, '') // remove any non-alphanumeric characters
    .replace(/\s+/g, '-') // replace spaces with hyphens
    .replace(/-+/g, '-'); // remove consecutive hyphens
  return str;
}

export function capitalizeText(str: string): string {
  if (!str) return '';
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export const PhoneRegex = new RegExp(
  /^(\+?\d{1,4}[\s-]?)?((\(\d{1,4}\))|\d{1,4})[\s-]?\d{1,4}[\s-]?\d{1,4}[\s-]?\d{1,9}$/
);

export const getBrowserLanguageToPhoneCountry = () => {
  if (navigator.language == 'en') {
    return 'us';
  }
  const lang = navigator.language.split('-');
  const defaultCountry = lang.length > 1 ? lang[1] : lang[0];

  return defaultCountry.toLowerCase();
};

export const hashEmailAsync = async (email: string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(email.trim().toLowerCase()); // Normalize email
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};

export const hashEmail = (email?: string) => {
  if (!email) return undefined;
  return SHA256(email.trim().toLowerCase()).toString();
};
