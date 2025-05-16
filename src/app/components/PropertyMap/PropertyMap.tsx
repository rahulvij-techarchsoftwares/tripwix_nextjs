'use client';

import './styles.css';

import {
  GoogleMap,
  InfoWindowF,
  Marker,
  useJsApiLoader,
} from '@react-google-maps/api';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import { PAGE_PATHS } from '~/lib/constants';
import { Coordinates } from '~/types/coordinates';

import { MapStyles } from './contants';
import { pointProps, PropertyMapProps } from './types';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const defaultMapCenter: Coordinates = { lat: 38.70132, lng: -9.421435 };

export const PropertyMap: React.FC<PropertyMapProps> = ({
  places,
  mapCenter,
  showMapLegend = false,
  defaultZoom = 15,
}) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
  });
  const [hoveredMarkers, setHoveredMarkers] = useState<{
    [key: string]: boolean;
  }>({});

  const [selectedPlace, setSelectedPlace] = useState<pointProps | undefined>(
    undefined
  );

  const handleMouseOver = (slug: string) => {
    setHoveredMarkers(prev => ({ ...prev, [slug]: true }));
  };

  const handleMouseOut = (slug: string) => {
    setHoveredMarkers(prev => ({ ...prev, [slug]: false }));
  };

  const [isMobile, setIsMobile] = useState(false);
  const [map, setMap] = useState<google.maps.Map | undefined>(undefined);

  useEffect(() => {
    if (mapCenter) {
      map?.panTo(mapCenter);
    } else if (places && places.length > 0) {
      const firstPlace = places.find(place => place.coordinates !== null);
      if (firstPlace) {
        map?.panTo({
          lat: firstPlace.coordinates.lat,
          lng: firstPlace.coordinates.lng,
        });
      }
    }
  }, [map, mapCenter, places]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Map styles can be generated with: https://snazzymaps.com/
  return (
    <>
      {isLoaded && (
        <GoogleMap
          onLoad={mapRef => setMap(mapRef)}
          mapContainerStyle={containerStyle}
          center={mapCenter || defaultMapCenter}
          zoom={defaultZoom}
          options={{ styles: MapStyles }}
        >
          {places
            ? places
                .filter(place => place.coordinates !== null)
                .map(
                  ({
                    slug,
                    name,
                    community,
                    coordinates,
                    tagline,
                    location_extra,
                    description,
                    pin,
                    thumbnail,
                  }) => {
                    const isHovered = hoveredMarkers[slug] && !selectedPlace;
                    const isSelected = selectedPlace?.slug === slug;
                    return (
                      <Marker
                        onMouseOver={() => handleMouseOver(slug)}
                        onMouseOut={() => handleMouseOut(slug)}
                        key={`${slug}_${pin}`}
                        position={{
                          lat: coordinates.lat,
                          lng: coordinates.lng,
                        }}
                        icon={{
                          url:
                            isSelected || isHovered
                              ? '/assets/markerIcons/map-pin-active.svg'
                              : '/assets/markerIcons/map-pin.svg',
                          scale: 5,
                        }}
                        zIndex={pin?.includes('gray') ? 50 : 60}
                        onClick={() => {
                          coordinates === selectedPlace?.coordinates
                            ? setSelectedPlace(undefined)
                            : setSelectedPlace({
                                community: community,
                                coordinates: {
                                  lat: coordinates.lat,
                                  lng: coordinates.lng,
                                },
                                name: tagline !== '' ? tagline : name,
                                description: description,
                                thumbnail: thumbnail,
                                slug: slug,
                              });
                        }}
                      />
                    );
                  }
                )
            : null}
          {selectedPlace && (
            <InfoWindowF
              position={{
                lat: selectedPlace.coordinates.lat,
                lng: selectedPlace.coordinates.lng,
              }}
              zIndex={1}
              options={{
                pixelOffset: new window.google.maps.Size(
                  isMobile ? 0 : 200,
                  isMobile ? 150 : 155
                ),
              }}
              onCloseClick={() => setSelectedPlace(undefined)}
            >
              <div
                className={`flex flex-row items-center justify-between min-w-[340px] lg:py-0`}
              >
                <div className="aspect-[130/130] relative w-[130px] rounded-xl overflow-hidden">
                  <Image
                    fill
                    objectFit={'cover'}
                    src={`${
                      selectedPlace.thumbnail ||
                      'https://placehold.co/128x112/png'
                    }`}
                    alt=""
                  />
                </div>
                <div className="flex flex-row w-[320px] px-4">
                  <div className="flex-1 flex flex-col">
                    <div className="flex-1 overflow-auto">
                      <div className="uppercase">
                        {selectedPlace.community?.name}
                      </div>
                      <div
                        className="font-medium text-base mt-2 mb-2"
                        dangerouslySetInnerHTML={{ __html: selectedPlace.name }}
                      />
                    </div>
                    <div className="grow-0 basis-4">
                      {/* <a
                        href={`/${PAGE_PATHS.PROPERTY_LIST}/${selectedPlace.slug}`}
                        target="_blank"
                        className="underline"
                      >
                        See More
                      </a> */}
                    </div>
                  </div>
                </div>
              </div>
            </InfoWindowF>
          )}
        </GoogleMap>
      )}
    </>
  );
};
