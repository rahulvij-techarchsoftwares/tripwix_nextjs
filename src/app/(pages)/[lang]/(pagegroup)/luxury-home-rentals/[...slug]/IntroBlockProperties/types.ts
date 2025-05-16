export interface PropertyDataLayerProps {
  item_name: string;
  item_id: number;
  item_category: string;
  item_category2: string;
  value: number;
}

export interface locationRelatedProps {
  location_name?: string;
  location_slug?: string;
  sublocation_name?: string;
  sublocation_slug?: string;
}

export interface IntroBlockPropertiesProps {
  locationRelated: locationRelatedProps;
  title: string;
  description: string;
  num_guests?: number;
  num_bedrooms?: number;
  num_bathrooms?: number;
  propertyId?: number;
  countryCode?: string;
  propertyDataLayer: PropertyDataLayerProps;
}
