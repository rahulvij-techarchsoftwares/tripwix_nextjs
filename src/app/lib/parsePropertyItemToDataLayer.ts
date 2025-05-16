import { destinationSlugs } from '~/lib/destinationSlugs';

interface PropertyProps {
  id: number;
  title: string;
  tagline?: string;
  location?: string;
  country_alpha2?: string;
  price?: {
    USD: string;
  };
}

export const convertPriceToString = (priceString?: string) => {
  if (!priceString) return 0;
  let price = priceString?.split(' - ')[0];
  return parseInt(price.slice(1, price?.length));
};

const getPropertyLocation = ({ property }: { property: PropertyProps }) => {
  return {
    destination: property.location || '',
    country: destinationSlugs(property.country_alpha2) || '',
  };
};

export const parsePropertyItemToDataLayer = ({
  property,
}: {
  property: PropertyProps;
}) => {
  const propertyLocation = getPropertyLocation({ property: property });
  return {
    item_name: property.tagline || property.title,
    item_id: property.id,
    item_category: propertyLocation.country,
    item_category2: propertyLocation.destination,
    value: convertPriceToString(property?.price?.USD),
  };
};
