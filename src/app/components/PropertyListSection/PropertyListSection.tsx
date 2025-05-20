'use client';

import React, { useEffect, useRef, useState } from 'react';

import { Filters } from '~/(pages)/[lang]/(pagegroup)/luxury-home-rentals/Filters';
import { fetchProperties } from '~/actions/fetch-properties';
import { CardVariant } from '~/components/Card';
import { Button, ButtonVariants } from '~/components/CTA';
import { FeatureItem, PropertyCard } from '~/components/PropertyCard';
import { PropertyListFilters } from '~/components/PropertyListFilters';
import { PropertyMap } from '~/components/PropertyMap';
import { PlaceProps } from '~/components/PropertyMap/types';
import { useUser } from '~/components/providers/UserProvider';
import { Spinner } from '~/components/Spinner';
import { TextAnimation } from '~/components/TextAnimation';
import { PAGE_PATHS, SEARCH_PARAMETERS } from '~/lib/constants';
import {
  DATA_LAYER_EVENT_NAMES,
  dataLayerSelectItemEvent,
  dataLayerViewItemListEvent,
} from '~/lib/dataLayer/datalayer';
import { handleLoginDataLayerEvent } from '~/lib/dataLayer/loginEvent';
import { useWishlist } from '~/lib/hooks/useWishlist';
import { PropertyPropsAPI } from '~/types';

import { PropertyListSectionProps, PropertyToMarker } from './types';

const INITIAL_PAGE = 1;
const ITEMS_PER_PAGE = 20;

export const PropertyListSection: React.FC<PropertyListSectionProps> = ({
  lang,
  initialProperties,
  searchParams,
  selectedFilters,
  parsedFiltersData,
  propertyCount,
}) => {
  const [isMapView, setIsMapView] = useState<boolean>(false);
  const [loginParameter] = useState(searchParams.login);

  const wishlistItems = useWishlist();

  const [properties, setProperties] =
    useState<PropertyPropsAPI[]>(initialProperties);
  const [pagesLoaded, setPagesLoaded] = useState(INITIAL_PAGE);
  const [isLoadingProperties, setIsLoadingProperties] = useState(false);

  const initialRender = useRef(true);

  const propertyParams = new URLSearchParams(searchParams).toString();

  const loadMoreProperties = async () => {
    const nextPage = pagesLoaded + 1;
    setIsLoadingProperties(true);
    try {
      const response: {
        propertyList: PropertyPropsAPI[];
        propertyCount: number;
      } =
        (await fetchProperties({
          searchParams,
          lang,
          pageIndex: nextPage,
          itemsPerPage: ITEMS_PER_PAGE,
        })) ?? [];
      setProperties((prevProperties: PropertyPropsAPI[]) => [
        ...prevProperties,
        ...response.propertyList,
      ]);
      setPagesLoaded(nextPage);
      setIsLoadingProperties(false);
    } catch (error) {
      console.error('Error loading more properties:', error);
      setIsLoadingProperties(false);
    }
  };

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    setProperties(initialProperties);
    setPagesLoaded(1);
  }, [initialProperties]);

  const handleMapToggle = () => {
    setIsMapView(!isMapView);
  };

  const getPlaces: PropertyToMarker = () => {
    const places: PlaceProps[] = properties.map(
      (item: PropertyPropsAPI): PlaceProps => ({
        community: item.community,
        coordinates: {
          lat: item.coordinates?.lat || 0,
          lng: item.coordinates?.lng || 0,
        },
        name: item.title || 'Unknown Location',
        tagline: item.tagline || item.title || '',
        description: `${item.title || 'Unknown Location'}, ${item.design_type || 'Unknown Design'}`,
        pin: item.title || 'Unknown Location',
        thumbnail: item.photos?.[0]?.image || '/assets/properties/default.jpg',
        slug: item.property_url || 'unknown-location',
        location_extra: item.location_extra || '',
      })
    );
    return places;
  };

  const { userData, loading, status } = useUser();

  useEffect(() => {
    if (loginParameter && userData) {
      handleLoginDataLayerEvent(userData.email);
    }
  }, [loginParameter, userData]);

  const selectedCountries = () => {
    let result: { country: string; destinations: string } = {
      country: '',
      destinations: '',
    };
    Object.keys(searchParams)?.map(key => {
      switch (key) {
        case SEARCH_PARAMETERS.DESTINATION:
          result.destinations = `${parsedFiltersData.countries.value
            .find(country => country.id === searchParams['country'])
            ?.destinations.filter(destination =>
              searchParams[key].split(',').includes(destination.id)
            )
            .map(destination => destination.name)
            .join(' | ')}`;
          break;
        case SEARCH_PARAMETERS.COUNTRY:
          result.country = `${parsedFiltersData.countries.value.find(country => country.id === searchParams[key])?.name}`;
          break;
        default:
          break;
      }
    });
    return result;
  };

  useEffect(() => {
    const viewedProperties = properties.slice(
      ITEMS_PER_PAGE * (pagesLoaded - 1),
      ITEMS_PER_PAGE * pagesLoaded
    );
    if (loading) {
      return;
    }
    const listName =
      selectedCountries()?.destinations ||
      selectedCountries()?.country ||
      DATA_LAYER_EVENT_NAMES.luxuryHomeRentals;
    if (status === 'unauthenticated') {
      dataLayerViewItemListEvent({
        properties: viewedProperties,
        listName: listName,
        userEmail: undefined,
      });
      return;
    }
    if (userData) {
      dataLayerViewItemListEvent({
        properties: viewedProperties,
        listName: listName,
        userEmail: userData.email,
      });
    }
  }, [properties, status, loading, userData]);

  return (
    <>
      <div>
        <p className="tracking-wider">
          <span className="font-bold">Showing 1-{properties.length}</span> out
          of {propertyCount} Results
        </p>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="hidden md:block md:w-[23%] md:pr-10">
          <Filters
            filterList={parsedFiltersData}
            searchParams={searchParams}
            propertyCount={propertyCount}
          />
        </div>
        <div className="w-full md:w-[77%]">
          <PropertyListFilters
            isMapView={isMapView}
            toggleMapView={handleMapToggle}
            searchParams={searchParams}
            selectedFilters={selectedFilters}
            propertyCount={propertyCount}
            parsedFiltersData={parsedFiltersData}
          />
          {isMapView ? (
            <div className="w-full aspect-[700/1200] md:aspect-[970/1060] pb-16">
              <PropertyMap places={getPlaces()} />
            </div>
          ) : (
            <>
              <div className="gap-4 grid grid-cols-1 lg:grid-cols-2 pb-16">
                {properties.map((property, index) => {
                  const alteredDesignType =
                    property.property_category_name === 'Choose...'
                      ? ''
                      : property.property_category_name;
                  const alteredFeatures: FeatureItem[] = property.features!
                    ? property.features.map(feature => feature)
                    : [];

                  // Add guests, bedrooms, and bathrooms to alteredFeatures
                  alteredFeatures.push(
                    {
                      id: 0,
                      slug: 'guest',
                      qty: property.num_guests,
                      label_singular: 'Guest',
                      label_plural: 'Guests',
                    },
                    {
                      id: 1,
                      slug: 'bedroom',
                      qty: property.num_bedrooms,
                      label_singular: 'Bedroom',
                      label_plural: 'Bedrooms',
                    },
                    {
                      id: 2,
                      slug: 'bathroom',
                      qty: property.num_bathrooms,
                      label_singular: 'Bathroom',
                      label_plural: 'Bathrooms',
                    }
                  );

                  return (
                    <TextAnimation key={index}>
                      <div
                        onClick={e => {
                          dataLayerSelectItemEvent({
                            listName: DATA_LAYER_EVENT_NAMES.luxuryHomeRentals,
                            property: {
                              id: property.id,
                              title: property.title,
                              country_alpha2: property.country_alpha2 || '',
                              location: property.location,
                            },
                            userEmail: userData?.email,
                          });
                        }}
                      >
                        <PropertyCard
                          id={property.id}
                          variant={CardVariant.PropertyListItem}
                          title={property.tagline || property.title}
                          subtitle={property.location}
                          location={property.location}
                          country_alpha2={property.country_alpha2}
                          content={alteredDesignType}
                          link={`/${lang}/${PAGE_PATHS.PROPERTY_LIST}/${property.property_url || property.id}?${propertyParams}`}
                          features={alteredFeatures}
                          images={property.photos}
                          price={property.price}
                          rating_average={property.rating_average}
                          rating_count={property.rating_count}
                          wishlistItem={wishlistItems.find(
                            item => item.propertyId === property.id
                          )}
                        />
                      </div>
                    </TextAnimation>
                  );
                })}
              </div>
              <div className="text-center pb-40">
                {properties.length < propertyCount ? (
                  <>
                    {isLoadingProperties ? (
                      <Spinner />
                    ) : (
                      <Button
                        disabled={isLoadingProperties}
                        type="button"
                        onClick={() => {
                          loadMoreProperties();
                        }}
                        variant={ButtonVariants.Primary}
                      >
                        Load More
                      </Button>
                    )}
                  </>
                ) : null}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
