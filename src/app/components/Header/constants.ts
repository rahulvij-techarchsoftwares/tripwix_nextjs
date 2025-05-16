import { DropdownOption } from '~/types/dropdown';

export const menuAboutItems: DropdownOption[] = [
  { id: 1, label: 'About Us', href: '/about-us' },
  { id: 5, label: 'Homeowners', href: '/homeowners' },
  // { id: 2, label: 'Contact Us', href: '/contact' },
  { id: 3, label: 'FAQ', href: '/faqs' },
  { id: 4, label: 'Blog', href: '/blog' },
  // { id: 5, label: 'Careers', href: '/careers' },
];

export const menuDestinationItems = [
  { label: 'Destinations', href: '/destinations', id: 1 },
  { label: 'Europe', href: '/destinations/europe', id: 2 },
  { label: 'Asia', href: '/destinations/asia', id: 3 },
  { label: 'America', href: '/destinations/america', id: 4 },
  { label: 'Africa', href: '/destinations/africa', id: 5 },
  { label: 'Oceania', href: '/destinations/oceania', id: 6 },
];

export enum HeaderVariants {
  Default = 'default',
  Transparent = 'transparent',
}
