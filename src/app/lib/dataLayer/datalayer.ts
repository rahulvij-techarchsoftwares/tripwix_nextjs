import { destinationSlugs } from '~/lib/destinationSlugs';
import { hashEmail, slugify } from '~/lib/utils';

export const DATA_LAYER_EVENT_NAMES = {
  luxuryHomeRentals: 'Luxury Home Rentals',
  relatedProperties: 'Related Properties',
  propertyDetail: 'Property Detail',
};

export const dataLayerViewItemListEvent = ({
  properties,
  listName,
  userEmail = undefined,
}: {
  properties: {
    title: string;
    id: number;
    country_alpha2?: string;
    location?: string;
  }[];
  listName: string;
  userEmail?: string;
}) => {
  const ecommerce = {
    currency: 'USD',
    items: properties.map((property, index) => ({
      item_id: property.id,
      item_name: property.title,
      quantity: 1,
      item_category: destinationSlugs(property.country_alpha2),
      item_category2: property.location,
      item_list_name: listName,
      item_list_id: slugify(listName),
      index: index,
    })),
  };
  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).dataLayer.push({ ecommerce: null });
  (window as any).dataLayer.push({
    event: 'view_item_list',
    user_id: hashEmail(userEmail),
    user_email: userEmail,
    ecommerce: ecommerce,
  });
};

export const dataLayerSelectItemEvent = ({
  property,
  listName,
  userEmail = undefined,
}: {
  property: {
    title: string;
    id: number;
    country_alpha2: string;
    location: string;
  };
  listName: string;
  userEmail?: string;
}) => {
  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).dataLayer.push({ ecommerce: null });
  (window as any).dataLayer.push({
    event: 'select_item',
    user_id: hashEmail(userEmail),
    user_email: userEmail,
    ecommerce: {
      currency: 'USD',
      items: [
        {
          item_name: property.title,
          item_id: property.id,

          item_category: destinationSlugs(property.country_alpha2),
          item_category2: property.location,
          item_list_name: listName,
          item_list_id: slugify(listName),
          index: 1,
          quantity: 1,
        },
      ],
    },
  });
};

export const dataLayerGenerateLeadEvent = ({
  numNights,
  numGuests,
  email,
  phoneNumber,
  leadId,
}: {
  numNights: number;
  numGuests: number;
  email: string;
  phoneNumber: string;
  leadId: string;
}) => {
  (window as any).dataLayer = window.dataLayer || [];
  (window as any).dataLayer.push({
    event: 'generate_lead',
    numNights: numNights,
    numGuests: numGuests,
    email: email,
    phoneNumber: phoneNumber,
    leadId: leadId,
  });
};
