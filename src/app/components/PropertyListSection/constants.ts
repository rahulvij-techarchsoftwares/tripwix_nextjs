import { CardVariant } from '~/components/Card';
import { FeatureItem, PropertyCardProps } from '~/components/PropertyCard';

export const features: FeatureItem[] = [
  {
    id: 0,
    slug: 'guest',
    qty: 9,
    label_singular: 'Guest',
    label_plural: 'Guests',
  },
  {
    id: 1,
    slug: 'bedroom',
    qty: 2,
    label_singular: 'Bedroom',
    label_plural: 'Bedrooms',
  },
  {
    id: 2,
    slug: 'bathroom',
    qty: 3,
    label_singular: 'Bathroom',
    label_plural: 'Bathrooms',
  },
  {
    id: 3,
    slug: 'tick',
    qty: 4,
    label_singular: 'Item',
    label_plural: 'Items',
  },
];

const price = { EUR: '10,000', GBP: '10,000', MXN: '10,000', USD: '10,000' };

export const propertyDetailCards: PropertyCardProps[] = [
  {
    id: 1,
    title: 'Exquisite Villa in Tuscany',
    subtitle: 'Tuscany, umbria',
    content: 'Ultra Deluxe',
    link: '#',
    images: [
      { caption: '1', image: '/punta-mita-low-res.png' },
      { caption: '2', image: '/punta-mita-low-res.png' },
    ],
    variant: CardVariant.PropertyListItem,
    features: features,
    price: price,
    rating_average: 4.5,
    rating_count: 10,
  },
  {
    id: 2,
    title: 'Exquisite Villa in Tuscany',
    subtitle: 'Tuscany, umbria',
    content: 'Ultra Deluxe',
    link: '#',
    images: [
      { caption: '1', image: '/punta-mita-low-res.png' },
      { caption: '2', image: '/punta-mita-low-res.png' },
    ],
    variant: CardVariant.PropertyListItem,
    features: features,
    price: price,
    rating_average: 4.5,
    rating_count: 10,
  },
  {
    id: 3,
    title: 'Exquisite Villa in Tuscany',
    subtitle: 'Tuscany, umbria',
    content: 'Ultra Deluxe',
    link: '#',
    images: [
      { caption: '1', image: '/punta-mita-low-res.png' },
      { caption: '2', image: '/punta-mita-low-res.png' },
    ],
    variant: CardVariant.PropertyListItem,
    features: features,
    price: price,
    rating_average: 4.5,
    rating_count: 10,
  },
  {
    id: 4,
    title: 'Exquisite Villa in Tuscany',
    subtitle: 'Tuscany, umbria',
    content: 'Ultra Deluxe',
    link: '#',
    images: [
      { caption: '1', image: '/punta-mita-low-res.png' },
      { caption: '2', image: '/punta-mita-low-res.png' },
    ],
    variant: CardVariant.PropertyListItem,
    features: features,
    price: price,
    rating_average: 4.5,
    rating_count: 10,
  },
  {
    id: 5,
    title: 'Exquisite Villa in Tuscany',
    subtitle: 'Tuscany, umbria',
    content: 'Ultra Deluxe',
    link: '#',
    images: [
      { caption: '1', image: '/punta-mita-low-res.png' },
      { caption: '2', image: '/punta-mita-low-res.png' },
    ],
    variant: CardVariant.PropertyListItem,
    features: features,
    price: undefined,
    rating_average: 4.5,
    rating_count: 10,
  },
];
