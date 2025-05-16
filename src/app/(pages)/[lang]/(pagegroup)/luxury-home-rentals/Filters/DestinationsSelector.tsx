'use client';

import React, { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import {
  CheckboxAccordion,
  CheckboxAccordionVariants,
  CustomCheckbox,
} from '~/components';
import { Accordion, AccordionVariants } from '~/components/Accordion';
import { SEARCH_PARAMETERS } from '~/lib/constants';
import { Country, Destination } from '~/types/globalTypes';

import { DestinationSelectorProps } from './types';

interface FormValues {
  country: string[];
  destinations: string[];
  communities: string[];
}

export const DestinationsSelector: React.FC<DestinationSelectorProps> = ({
  filterList,
  handleSubmitProp,
  searchParams,
  extraInfo,
}) => {
  const { handleSubmit, control, setValue, getValues } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = data => {
    handleSubmitProp([
      { name: 'country' as SEARCH_PARAMETERS, value: data.country[0] },
      {
        name: 'destination' as SEARCH_PARAMETERS,
        value: data.destinations?.join(',') || '',
      },
      {
        name: 'community' as SEARCH_PARAMETERS,
        value: data.communities?.join(',') || '',
      },
    ]);
  };

  useEffect(() => {
    if (!searchParams.country) {
      setValue('country', []);
      setValue('destinations', []);
      setValue('communities', []);
      return;
    }
    if (searchParams.community) {
      setValue('country', [searchParams.country]);
      setValue('destinations', searchParams.destination?.split(',') || []);
      setValue('communities', searchParams.community.split(',') || []);
      return;
    }
    if (searchParams.country) {
      setValue('country', [searchParams.country]);
    }
    if (searchParams.destination) {
      setValue('destinations', searchParams.destination?.split(',') || []);
    }
  }, [searchParams, setValue]);

  const handleCountryChange = ({ country }: { country: string }) => {
    const selectedCountry = getValues('country') || [];
    if (!selectedCountry.includes(country)) {
      setValue('country', country ? [country] : []);
      setValue('destinations', []);
      setValue('communities', []);
    } else {
      setValue('country', []);
      setValue('destinations', []);
      setValue('communities', []);
    }
  };

  const handleDestinationChange = ({
    country,
    destination,
  }: {
    country: Country;
    destination: Destination;
  }) => {
    const selectedCountry = getValues('country') || [];
    const selectedDestinations = getValues('destinations') || [];
    const selectedCommunities = getValues('communities') || [];
    const destinationCommunities = destination.communities.map(
      community => community.id
    );
    if (!selectedCountry?.includes(country.id)) {
      setValue('country', [country.id]);
      setValue('destinations', [destination.id]);
      setValue('communities', []);
      return;
    }
    if (selectedDestinations.includes(destination.id)) {
      setValue(
        'destinations',
        selectedDestinations.filter((dest: string) => dest !== destination.id)
      );
      setValue(
        'communities',
        selectedCommunities.filter(
          (comm: string) => !destinationCommunities.includes(comm)
        )
      );
    } else {
      setValue('destinations', [...selectedDestinations, destination.id]);
    }
  };

  const handleCommunityChange = ({
    communityId,
    destination,
    country,
  }: {
    country: Country;
    destination: Destination;
    communityId: string;
  }) => {
    const selectedCountry = getValues('country') || [];
    const selectedCommunities = getValues('communities') || [];
    const selectedDestinations = getValues('destinations') || [];

    if (!selectedCountry?.includes(country.id)) {
      setValue('country', [country.id]);
      setValue('destinations', [destination.id]);
      setValue('communities', [communityId]);
      return;
    }
    if (!selectedDestinations.includes(destination.id)) {
      setValue('destinations', [...selectedDestinations, destination.id]);
      setValue('communities', [...selectedCommunities, communityId]);
    }

    if (selectedCommunities.includes(communityId)) {
      setValue(
        'communities',
        selectedCommunities.filter(
          selectedCommunity => selectedCommunity !== communityId
        )
      );
    } else {
      setValue('communities', [...selectedCommunities, communityId]);
    }
  };

  return (
    <form onChange={() => handleSubmit(onSubmit)()}>
      <Accordion
        variant={AccordionVariants.Menu}
        title="Destinations"
        extraInfo={extraInfo}
      >
        <div>
          {filterList.countries.value.map(country => (
            <Controller
              key={country.id}
              name="country"
              control={control}
              render={({ field }) => {
                return (
                  <CheckboxAccordion
                    variant={CheckboxAccordionVariants.Submenu}
                    title={country.name}
                    checked={
                      (field.value as string[])?.includes(country.id) || false
                    }
                    onChange={() => {
                      handleCountryChange({ country: country.id });
                      handleSubmit(onSubmit)();
                    }}
                  >
                    <div className="pt-2 pl-8">
                      {country.destinations.map(destination => (
                        <Controller
                          key={destination.id}
                          name="destinations"
                          control={control}
                          render={({ field }) => {
                            const selectedDestinations = field.value || [];
                            return (
                              <CheckboxAccordion
                                variant={CheckboxAccordionVariants.FAQ}
                                title={destination.name}
                                checked={selectedDestinations.includes(
                                  destination.id
                                )}
                                onChange={() => {
                                  handleDestinationChange({
                                    country: country,
                                    destination: destination,
                                  });
                                  handleSubmit(onSubmit)();
                                }}
                              >
                                <div className="pt-6 pl-8">
                                  {destination.communities.map(community => (
                                    <Controller
                                      key={community.id}
                                      name="communities"
                                      control={control}
                                      render={({ field }) => {
                                        const selectedCommunities =
                                          field.value || [];
                                        return (
                                          <CustomCheckbox
                                            extraClasses={'mb-4'}
                                            label={community.name}
                                            onChange={() =>
                                              handleCommunityChange({
                                                country: country,
                                                destination: destination,
                                                communityId: community.id,
                                              })
                                            }
                                            checked={selectedCommunities.includes(
                                              community.id
                                            )}
                                          />
                                        );
                                      }}
                                    />
                                  ))}
                                </div>
                              </CheckboxAccordion>
                            );
                          }}
                        />
                      ))}
                    </div>
                  </CheckboxAccordion>
                );
              }}
            />
          ))}
        </div>
        <hr className="border-1 border-b-tertiary-10 mt-4 pb-6" />
      </Accordion>
    </form>
  );
};
