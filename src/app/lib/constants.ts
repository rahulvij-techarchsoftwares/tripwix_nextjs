export const ONE_HOUR = 3600;
export const FOUR_HOURS = 4 * ONE_HOUR;

export const GOOGLE_TAG_MANAGER_ID = 'GTM-ML5XJJ44';

export enum SEARCH_PARAMETERS {
  COUNTRY = 'country',
  DESTINATION = 'destination',
  COMMUNITY = 'community',

  PRICE_RANGE_FROM = 'price_range_from',
  PRICE_RANGE_TO = 'price_range_to',
  PRICE_MIN = 'price_min',
  PRICE_MAX = 'price_max',
  DEPARTURE_DATE = 'available_at_before',
  ARRIVAL_DATE = 'available_at_after',
  NUM_GUESTS = 'num_guests',
  DATE_FROM = 'date_from',
  DATE_TO = 'date_to',
  CATEGORIES = 'categories',
  CATEGORY = 'category',
  PRICE_RANGE = 'price_range',
  AMENITIES = 'amenities',
  ACCESSIBILITY = 'accessibility',
  ACESSIBILITY = 'acessibility',
  ACCESSIBILITIES = 'accessibilities',
  NUM_BEDROOMS = 'num_bedrooms',
  NUM_BATHROOMS = 'num_bathrooms',
  LIFESTYLE = 'lifestyle',
  ORDER_BY = 'order_by',
  SPECIAL_OFFER = 'special_offer',
  INSTANT_BOOKING = 'instant_booking',

  LIMIT = 'limit',
  OFFSET = 'offset',

  ACTIVITY = 'activity',
  LOCATION = 'location',
}

export const VALID_PROPERTY_SEARCH_PARAMETERS = Object.values(
  SEARCH_PARAMETERS
) as string[];

export const PAGE_PATHS = {
  HOME: '/',
  HOMEOWNERS: 'homeowners',
  PROPERTY_LIST: 'luxury-home-rentals',
  EXPERIENCES: 'experiences',
  SERVICES: 'luxury-travel-services',
  ABOUT: 'about-us',
  CONTACT: 'contact',
  DESTINATION: 'destination',
  BLOG: 'blog',
  TERMS_AND_CONDITIONS: 'privacy-and-terms',
  ACCOUNT: 'account',
  WISHLIST: 'wishlist',
  REGISTER: 'signup',
  LOGIN: 'auth/login',
  RESET_PASSWORD: 'auth/reset-password',
  FORGOT_PASSWORD: 'auth/forgot-password',
  FAQS: 'faqs',
};

export const BLOG_ARTICLES_PER_PAGE = 8;

export const CURRENCY_OPTIONS = [
  { label: '£', value: 'GBP' },
  { label: '$', value: 'USD' },
  { label: '€', value: 'EUR' },
  { label: 'MX$', value: 'MXN' },
];

export const DEFAULT_META_TITLE =
  'Tripwix®| Luxury Vacation Rentals - You dream it, we create it.';
export const DEFAULT_META_DESCRIPTION =
  'TRIPWIX luxury vacation rentals cater to the discerning traveler, offering luxury rentals and experiences in Europe and the Americas.';
