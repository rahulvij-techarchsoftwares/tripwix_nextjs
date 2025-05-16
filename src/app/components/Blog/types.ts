export interface BlogProps {
  articles: ArticleCardProps[];
}

export interface ArticleCardProps {
  title: string;
  slug: string;
  description: string;
  date: string;
  image: string;
  category: string;
}

export interface BlogFiltersProps {
  onFilterSelect: (blogFilterValue: string) => void;
  totalArticles: number;
  currentFilter: string;
  currentPage: number;
}

export type BlogFilterOption = {
  key: string;
  value: string;
  label: string;
};

export const BlogFilterItems: BlogFilterOption[] = [
  { key: 'ALL', value: '', label: 'All Articles' },
  {
    key: 'BEAUTIFUL_DESTINATIONS',
    value: 'beautiful_destinations',
    label: 'Beautiful Destinations',
  },
  {
    key: 'HOLIDAY_INTEL',
    value: 'holiday_intel',
    label: 'Holiday Intel',
  },
  {
    key: 'EXPLORING_OUR_HOMES',
    value: 'exploring_our_homes',
    label: 'Exploring Our Homes',
  },
  {
    key: 'CITY_GUIDES',
    value: 'city_guides',
    label: 'City Guides',
  },
  {
    key: 'OUR_CATALOGS',
    value: 'our_catalogs',
    label: 'Our Catalogs',
  },
  {
    key: 'ABOUT_TRIPWIX',
    value: 'about_tripwix',
    label: 'About Tripwix',
  },
  {
    key: 'AMAZING_ART_AWARDS',
    value: 'amazing_art_awards',
    label: 'Amazing Art Awards',
  },
  {
    key: 'AWESOME_ADVENTURES',
    value: 'awesome_adventures',
    label: 'Awesome Adventures',
  },
  {
    key: 'BEACH_BREAKS',
    value: 'beach_breaks',
    label: 'Beach Breaks',
  },
  {
    key: 'CULTURAL_CUSTOMS',
    value: 'cultural_customs',
    label: 'Cultural Customs',
  },
  {
    key: 'EUROPEAN_ESCAPES',
    value: 'european_escapes',
    label: 'European Escapes',
  },
  {
    key: 'FABULOUS_FESTIVALS',
    value: 'fabulous_festivals',
    label: 'Fabulous Festivals',
  },
  {
    key: 'FAMILY_FUN',
    value: 'family_fun',
    label: 'Family Fun',
  },
  {
    key: 'FAMILY_TIME',
    value: 'family_time',
    label: 'Family Time',
  },
  {
    key: 'GOLF_GETAWAYS',
    value: 'golf_getaways',
    label: 'Golf Getaways',
  },
  {
    key: 'GUEST_REVIEWS',
    value: 'guest_reviews',
    label: 'Guest Reviews',
  },
  {
    key: 'INCREDIBLE_ITALY',
    value: 'incredible_italy',
    label: 'Incredible Italy',
  },
  {
    key: 'LOCAL_CRAFTS',
    value: 'local_crafts',
    label: 'Local Crafts',
  },
  {
    key: 'LOCAL_EXPERIENCES',
    value: 'local_experiences',
    label: 'Local Experiences',
  },
  {
    key: 'LUXURY_REAL_ESTATE',
    value: 'luxury_real_estate',
    label: 'Luxury Real Estate',
  },
  {
    key: 'LUXURY_WELLNESS_TRAVEL',
    value: 'luxury_wellness_travel',
    label: 'Luxury Wellness Travel',
  },
  {
    key: 'MARVELOUS_MEXICO',
    value: 'marvelous_mexico',
    label: 'Marvelous Mexico',
  },
  {
    key: 'MUSIC_AND_NIGHTLIFE',
    value: 'music_and_nightlife',
    label: 'Music and Nightlife',
  },
  {
    key: 'NATURAL_WONDERS',
    value: 'natural_wonders',
    label: 'Natural Wonders',
  },
  {
    key: 'PARTY_PLACES_AND_EVENTS',
    value: 'party_places_and_events',
    label: 'Party Places and Events',
  },
  {
    key: 'PRETTY_PORTUGAL',
    value: 'pretty_portugal',
    label: 'Pretty Portugal',
  },
  {
    key: 'PROPERTY_MANAGEMENT',
    value: 'property_management',
    label: 'Property Management',
  },
  {
    key: 'REGIONAL_RECIPES',
    value: 'regional_recipes',
    label: 'Regional Recipes',
  },
  {
    key: 'RELAXATION',
    value: 'relaxation',
    label: 'Relaxation',
  },
  {
    key: 'RELAXING_RETREATS',
    value: 'relaxing_retreats',
    label: 'Relaxing Retreats',
  },
  {
    key: 'REMARKABLE_RESTAURANTS',
    value: 'remarkable_restaurants',
    label: 'Remarkable Restaurants',
  },
  {
    key: 'RIVERBOAT_CRUISE',
    value: 'riverboat_cruise',
    label: 'Riverboat Cruise',
  },
  {
    key: 'ROMANTIC_RESPITES',
    value: 'romantic_respites',
    label: 'Romantic Respites',
  },
  {
    key: 'SUNNY_SPAIN',
    value: 'sunny_spain',
    label: 'Sunny Spain',
  },
  {
    key: 'SUPERB_SHOPPING',
    value: 'superb_shopping',
    label: 'Superb Shopping',
  },
  {
    key: 'TEMPTING_TURKEY',
    value: 'tempting_turkey',
    label: 'Tempting Turkey',
  },
  {
    key: 'TRAVEL_TIPS',
    value: 'travel_tips',
    label: 'Travel Tips',
  },
  {
    key: 'WHIMSICAL_WEDDINGS',
    value: 'whimsical_weddings',
    label: 'Whimsical Weddings',
  },
];
