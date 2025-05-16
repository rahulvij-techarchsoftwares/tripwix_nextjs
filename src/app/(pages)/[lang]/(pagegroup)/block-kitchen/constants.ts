import { CardVariant } from '~/components/Card';
import { PropertyCardProps } from '~/components/PropertyCard';

export const revealDescriptionCards = [
  {
    title: 'Reveal Description',
    link: '#',
    images: [{ id: 1, src: '/image1.png' }],
    content:
      'Lorem ipsum dolor sit amet. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
    variant: CardVariant.RevealDescription,
  },
];

export const destinationCards = [
  {
    title: 'Punt de Mita Aera',
    subtitle: 'Mexico',
    content: '',
    link: '#',
    images: [
      { id: 1, src: '/punta-mita-low-res.png' },
      { id: 2, src: '/los_cabos.png' },
      { id: 3, src: '/barbados.png' },
    ],
  },
  {
    title: 'Los Cabos',
    subtitle: 'Mexico',
    content: '',
    link: '#',
    images: [{ id: 1, src: '/los_cabos.png' }],
  },
  {
    title: 'Barbados',
    subtitle: 'Barbados',
    content: '',
    link: '#',
    images: [{ id: 1, src: '/barbados.png' }],
  },
];

export const experienceCards = [
  {
    title: 'Personalized Experiences',
    link: '#',
    images: [{ id: 1, src: '/image1.png' }],
    variant: CardVariant.RevealLink,
  },
  {
    title: 'Villas Specialists',
    link: '#',
    images: [{ id: 1, src: '/image2.png' }],
    variant: CardVariant.RevealLink,
  },
  {
    title: 'Curated Properties',
    link: '#',
    images: [{ id: 1, src: '/image3.png' }],
    variant: CardVariant.RevealLink,
  },
  {
    title: 'Local Ambassadors',
    link: '#',
    images: [{ id: 1, src: '/image4.png' }],
    variant: CardVariant.RevealLink,
  },
];

export const holidayCards = [
  {
    title: 'Golf',
    link: '#',
    images: [{ id: 1, src: '/image5.png' }],
    variant: CardVariant.KnowMore,
  },
  {
    title: 'Beach Clubs',
    link: '#',
    images: [{ id: 1, src: '/image6.png' }],
    variant: CardVariant.KnowMore,
  },
  {
    title: 'Spa',
    link: '#',
    images: [{ id: 1, src: '/image7.png' }],
    variant: CardVariant.KnowMore,
  },
  {
    title: 'Tenis',
    link: '#',
    images: [{ id: 1, src: '/image8.png' }],
    variant: CardVariant.KnowMore,
  },
];

export const propertyCards = [
  {
    title: 'Four Seasons Villa: Best View, Georgeous Location',
    subtitle: 'Algarve',
    content: '25% in May & June',
    link: '#',
    images: [
      { id: 1, src: '/image9.png' },
      { id: 2, src: '/image9.png' },
    ],
    variant: CardVariant.Property,
  },
  {
    title: 'Four Seasons Villa: Best View, Georgeous Location',
    subtitle: 'Algarve',
    content: '25% in May & June',
    link: '#',
    images: [{ id: 1, src: '/image10.png' }],
    variant: CardVariant.Property,
  },
  {
    title: 'Four Seasons Villa: Best View, Georgeous Location',
    subtitle: 'Algarve',
    content: '25% in May & June',
    link: '#',
    images: [{ id: 1, src: '/image11.png' }],
    variant: CardVariant.Property,
  },
];

export const articleCards = [
  {
    title: 'Tripwix News',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    link: '#',
    images: [{ id: 1, src: '/punta-mita-low-res.png' }],
    variant: CardVariant.Article,
  },
  {
    title: 'Culture',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    link: '#',
    images: [{ id: 1, src: '/los_cabos.png' }],
    variant: CardVariant.Article,
  },
  {
    title: 'Tripwix Homes',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    link: '#',
    images: [{ id: 1, src: '/barbados.png' }],
    variant: CardVariant.Article,
  },
  {
    title: 'Adventure',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
    link: '#',
    images: [{ id: 1, src: '/image12.png' }],
    variant: CardVariant.Article,
  },
  {
    title: 'Inspiration',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    link: '#',
    images: [{ id: 1, src: '/image13.png' }],
    variant: CardVariant.Article,
  },
];

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
    features: [],
    rating_average: 4.5,
    rating_count: 10,
    price: undefined,
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
    features: [],
    price: undefined,
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
    features: [],
    price: undefined,
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
    features: [],
    price: undefined,
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
    features: [],
    price: undefined,
    rating_average: 4.5,
    rating_count: 10,
  },
];

export const guideCards = [
  {
    title: 'When to leave',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
    link: '#',
    images: [{ id: 1, src: '/image14.png' }],
    variant: CardVariant.Guide,
  },
  {
    title: 'How to get there',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
    link: '#',
    images: [{ id: 1, src: '/image15.png' }],
    variant: CardVariant.Guide,
  },
  {
    title: 'Good to Know',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
    link: '#',
    images: [{ id: 1, src: '/image16.png' }],
    variant: CardVariant.Guide,
  },
];

export const communityCards = [
  {
    title: 'Calvi',
    link: '#',
    linkText: '12 villas to rent',
    images: [{ id: 1, src: '/image17.png' }],
    variant: CardVariant.Community,
  },
  {
    title: 'Ile Rousse',
    link: '#',
    linkText: '12 villas to rent',
    images: [{ id: 1, src: '/image18.png' }],
    variant: CardVariant.Community,
  },
  {
    title: 'North Corsica',
    link: '#',
    linkText: '12 villas to rent',
    images: [{ id: 1, src: '/image19.png' }],
    variant: CardVariant.Community,
  },
  {
    title: 'Bonifacio',
    link: '#',
    linkText: '12 villas to rent',
    images: [{ id: 1, src: '/image20.png' }],
    variant: CardVariant.Community,
  },
  {
    title: 'Region of Porto - Vecchio',
    link: '#',
    linkText: '12 villas to rent',
    images: [{ id: 1, src: '/image21.png' }],
    variant: CardVariant.Community,
  },
  {
    title: 'South Corsica',
    link: '#',
    linkText: '12 villas to rent',
    images: [{ id: 1, src: '/image22.png' }],
    variant: CardVariant.Community,
  },
];

export const specialistCards = [
  {
    title: 'Experts Curators',
    link: '#',
    images: [{ id: 1, src: '/image2.png' }],
    variant: CardVariant.ShowLink,
  },
  {
    title: 'Villa Specialists',
    content:
      'Our villa specialists are dedicated to finding the perfect villa for your vacation. ',
    link: '#',
    images: [{ id: 1, src: '/image3.png' }],
    variant: CardVariant.ShowLink,
  },
  {
    title: 'Local Ambassadors',
    link: '#',
    images: [{ id: 1, src: '/image4.png' }],
    variant: CardVariant.ShowLink,
  },
];

export const experiencesCards = [
  {
    title: 'Local Experiences',
    content:
      'Discover the soul of your destination with exclusive local experiences, meticulously designed to bring you closer to the essence of the places you visit. ',
    images: [{ id: 1, src: '/image23.png' }],
    variant: CardVariant.Services,
  },
];

export const servicesCards = [
  {
    title: 'Local Experiences',
    label: 'Download PDF',
    content:
      'Discover the soul of your destination with exclusive local experiences, meticulously designed to bring you closer to the essence of the places you visit. ',
    images: [{ id: 1, src: '/image23.png' }],
    variant: CardVariant.Services,
  },
];

export const teamCards = [
  {
    title: 'Reservations',
    content: 'Lucia Semanas ',
    images: [{ id: 1, src: '/image23.png' }],
    variant: CardVariant.Team,
  },
  {
    title: 'Douro Valley Ambassador',
    content: 'Pedro Queirós',
    images: [{ id: 1, src: '/image23.png' }],
    variant: CardVariant.Team,
  },
];
