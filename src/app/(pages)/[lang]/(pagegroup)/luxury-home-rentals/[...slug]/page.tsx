import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Accordion, AccordionVariants } from '~/components/Accordion';
import { Banner } from '~/components/Banner';
import { BannerVariants } from '~/components/Banner/types';
import { BookingFrameProvider } from '~/components/BookingFrameProvider';
import { CardVariant } from '~/components/Card';
import { Container, ContainerVariant } from '~/components/Container';
import { HtmlParser } from '~/components/HtmlParser';
import { PicLeft } from '~/components/PicLeft';
import { PropertyCardProps } from '~/components/PropertyCard';
import { PropertyMapManager } from '~/components/PropertyMap/PropertyMapManager';
import { PlaceProps } from '~/components/PropertyMap/types';
import { PropertySuggestionSlider } from '~/components/Sliders/PropertySuggestionSlider';
import { Testimonials } from '~/components/Testimonials';
import { Title, TitleVariants } from '~/components/Title';
import { VideoPlayer } from '~/components/VideoPlayer';
import { Locale } from '~/i18n.config';
import apiEndpoints from '~/lib/@apiEndpoints';
import {
  DEFAULT_META_DESCRIPTION,
  DEFAULT_META_TITLE,
  PAGE_PATHS,
} from '~/lib/constants';
import { parsePropertyItemToDataLayer } from '~/lib/parsePropertyItemToDataLayer';
import { getPropertyDetailsData } from '~/lib/serverComponentRequests';
import { ImageProps, MarginTop, MarginVariants } from '~/types';
import {
  FetchedPropertyData,
  FetchedPropertyDataPhotoItem,
  SimilarPropertyApi,
} from '~/types/globalTypes';

import { Amenities } from './Amenities';
import { InquiryForm, InstantBookForm } from './Booking/BookingForm';
import { BookingFrame } from './Booking/BookingFrame';
import { DialogGallery } from './DialogGallery';
import { IntroBlockProperties } from './IntroBlockProperties';
import {
  parseApiAmbassadorsToPicLeft,
  parseApiReviewsToTestimonials,
} from './parseApiReviewsToTestimonials';
import { StayWithUs } from './StayWithUs';

const convertToImageProps = (
  photos: FetchedPropertyDataPhotoItem[]
): ImageProps[] => {
  return photos.map(({ image, caption }, index) => ({
    id: index,
    src: image,
  }));
};

const parseSimilarProperties = (
  fetchedPropertyData: FetchedPropertyData,
  lang: Locale = 'en'
): PropertyCardProps[] => {
  const similarProperties: SimilarPropertyApi[] =
    fetchedPropertyData.similar_properties;

  if (!similarProperties) {
    return [];
  }

  return similarProperties.map(property => {
    return {
      id: property.id,
      tagline: property.tagline || property.title,
      location: property.location || '',
      country_alpha2: fetchedPropertyData.country_alpha2,
      title: property.tagline || property.title,
      subtitle: property.location || '',
      content: '',
      link: `/${lang}/${PAGE_PATHS.PROPERTY_LIST}/${property.property_url || property.id}`,
      images: [{ caption: property.title, image: property.photo }],
      variant: CardVariant.PropertyListItem,
      features: [
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
        },
      ],
      price: property.price,
      rating_average: property.rating_average || 0,
      rating_count: property.rating_count || 0,
    };
  });
};

export async function generateMetadata({
  params: { slug, lang },
}: {
  params: { slug: string[]; lang: Locale };
}): Promise<Metadata> {
  const response = await fetch(
    `${process.env.API_HOST}${apiEndpoints.PROPERTIES.READ_SLUG(slug.join('/'))}`
  );
  const property = await response.json();
  return {
    title: property.seo_title || DEFAULT_META_TITLE,
    description: property.seo_description || DEFAULT_META_DESCRIPTION,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_URL}/${lang}/${PAGE_PATHS.PROPERTY_LIST}/${slug.join('/')}`,
    },
  };
}

export default async function PropertyDetailPage({
  params: { lang, slug },
}: Readonly<{
  params: { lang: Locale; slug: string[] };
}>) {
  const fetchedPropertyData: FetchedPropertyData = await getPropertyDetailsData(
    {
      lang,
      slug: slug.join('/'),
    }
  );
  if ('notFound' in fetchedPropertyData) {
    return notFound();
  }

  const photos = convertToImageProps(fetchedPropertyData.photos);
  const propertyDetailPlace: PlaceProps[] = [
    {
      community: fetchedPropertyData.communities,
      coordinates: {
        lat: fetchedPropertyData.coordinates.lat || 0,
        lng: fetchedPropertyData.coordinates.lng || 0,
      },
      name: fetchedPropertyData.title || 'Unknown Location',
      tagline: fetchedPropertyData.location_extra || '',
      location_extra: fetchedPropertyData.location_extra || 'extra not coming',
      description: `${fetchedPropertyData.title || 'Unknown Location'}, ${fetchedPropertyData.design_type || 'Unknown Design'}`,
      pin: fetchedPropertyData.title || 'Unknown Location',
      thumbnail:
        fetchedPropertyData.photos?.length > 0
          ? fetchedPropertyData.photos[0].image
          : '/assets/properties/default.jpg',
      slug: fetchedPropertyData.property_url || 'unknown-location',
    },
  ];

  const reviews = parseApiReviewsToTestimonials(fetchedPropertyData.rating);
  const ambassadorForPicLeft = parseApiAmbassadorsToPicLeft(
    fetchedPropertyData.ambassador
  );

  const curator = fetchedPropertyData.curator;
  console.log('these are fecthed property data', fetchedPropertyData);
  return (
    <>
      {fetchedPropertyData ? (
        <>
          {photos && photos.length > 0 && (
            <>
              <Banner
                images={photos}
                variant={BannerVariants.PropertyDetails}
              />
              <DialogGallery images={photos} />
            </>
          )}
          <div className="mt-12">
            <Container
              extraClasses={'overflow-visible'}
              variant={ContainerVariant.Fluid}
            >
              <div className="flex lg:flex-row flex-col">
                <div className="lg:w-7/12 xl:w-8/12 order-2 lg:order-1">
                  <IntroBlockProperties
                    propertyId={fetchedPropertyData.id}
                    title={
                      fetchedPropertyData.tagline || fetchedPropertyData.title
                    }
                    locationRelated={{
                      location_name: fetchedPropertyData.location,
                      location_slug: fetchedPropertyData.location_slug,
                      sublocation_name:
                        fetchedPropertyData.sublocation?.name || '',
                      sublocation_slug: fetchedPropertyData.sublocation?.slug,
                    }}
                    countryCode={fetchedPropertyData.country_alpha2}
                    description={fetchedPropertyData.description}
                    num_guests={fetchedPropertyData.num_guests}
                    num_bedrooms={fetchedPropertyData.num_bedrooms}
                    num_bathrooms={fetchedPropertyData.num_bathrooms}
                    propertyDataLayer={parsePropertyItemToDataLayer({
                      property: fetchedPropertyData,
                    })}
                  />
                  <hr className="md:hidden my-8" />
                  <StayWithUs
                    title={'Why stay with us?'}
                    items={[
                      {
                        text: '24/7 on-the-ground support from our Local Ambassador',
                        id: 1,
                      },
                      {
                        text: `Curated and inspected properties by a specialist ${curator ? `- ${curator}` : ''}`,
                        id: 2,
                      },
                      {
                        text: 'Complimentary Concierge & reservation services',
                        id: 3,
                      },
                      { text: 'Itinerary planning', id: 4 },
                    ]}
                  />
                  {fetchedPropertyData.yt_video_url ? (
                    <>
                      <hr className="-mb-4 md:hidden" />
                      <VideoPlayer
                        src={fetchedPropertyData.yt_video_url}
                        title={'Video Tour'}
                      />
                    </>
                  ) : null}
                  {/* {fetchedPropertyData.bedbath ? (
                    <Accordion
                      title={'Rooms'}
                      variant={AccordionVariants.Featured}
                    >
                      <div className="mt-6 pb-6">
                        <HtmlParser htmlContent={fetchedPropertyData.bedbath} />
                      </div>
                      <hr />
                    </Accordion>
                  ) : null} */}
                  {fetchedPropertyData.Special_Features && (
                    <div className={'mt-10'}>
                      <Accordion
                        title={'Special Features'}
                        variant={AccordionVariants.Featured}
                      >
                        <div className="my-6 web-content">
                          <HtmlParser
                            htmlContent={fetchedPropertyData.Special_Features}
                          />
                        </div>
                      </Accordion>
                    </div>
                  )}
                  {fetchedPropertyData.Living_Areas && (
                    <div className={'mt-10'}>
                      <Accordion
                        title={'Living Area'}
                        variant={AccordionVariants.Featured}
                      >
                        <div className="my-6 web-content">
                          <HtmlParser
                            htmlContent={fetchedPropertyData.Living_Areas}
                          />
                        </div>
                      </Accordion>
                    </div>
                  )}
                  {fetchedPropertyData.bedbath && (
                    <div className={'mt-10'}>
                      <Accordion
                        title={'Rooms'}
                        variant={AccordionVariants.Featured}
                      >
                        <div className="my-6 web-content">
                          <HtmlParser
                            htmlContent={fetchedPropertyData.bedbath}
                          />
                        </div>
                      </Accordion>
                    </div>
                  )}
                  {fetchedPropertyData.location_extra && (
                    <div className={'mt-10'}>
                      <Accordion
                        title={'Location'}
                        variant={AccordionVariants.Featured}
                      >
                        <div className="my-6 web-content">
                          <HtmlParser
                            htmlContent={fetchedPropertyData.location_extra}
                          />
                        </div>
                      </Accordion>
                    </div>
                  )}
                  {fetchedPropertyData.amenities.length > 0 && (
                    <div className={'mt-10'}>
                      <Accordion
                        title={'Amenities'}
                        variant={AccordionVariants.Featured}
                      >
                        <Amenities amenities={fetchedPropertyData.amenities} />
                      </Accordion>
                    </div>
                  )}
                  {/* {fetchedPropertyData.location_Description && (
                    <div className={'mt-10'}>
                      <Accordion
                        title={'Location Description'}
                        variant={AccordionVariants.Featured}
                      >
                        <div className="my-6 web-content">
                          <HtmlParser
                            htmlContent={fetchedPropertyData.location_Description}
                          />
                        </div>
                      </Accordion>
                    </div>
                  )} */}
                  {fetchedPropertyData.rental_price_included && (
                    <div className={'mt-10 mb-10'}>
                      <Accordion
                        title={'Rental Price Includes'}
                        variant={AccordionVariants.Featured}
                      >
                        <div className="my-6 web-content">
                          <HtmlParser
                            htmlContent={
                              fetchedPropertyData.rental_price_included
                            }
                          />
                        </div>
                      </Accordion>
                    </div>
                  )}
                  {fetchedPropertyData.know_before_you_go && (
                    <div className={'mt-10'}>
                      <Accordion
                        title={'Know Before You Go'}
                        variant={AccordionVariants.Featured}
                      >
                        <div className="my-6 web-content">
                          <HtmlParser
                            htmlContent={fetchedPropertyData.know_before_you_go}
                          />
                        </div>
                      </Accordion>
                    </div>
                  )}
                  {/* <hr /> */}
                  {fetchedPropertyData.tax_id ? (
                    <p className={'mt-6 mb-10'}>{fetchedPropertyData.tax_id}</p>
                  ) : null}
                  {/* {fetchedPropertyData.special_offer_description ? (
                    <Accordion
                      title={'Special Offers'}
                      variant={AccordionVariants.Featured}
                    >
                      <div className="mt-6 mb-6">
                        <HtmlParser
                          htmlContent={
                            fetchedPropertyData.special_offer_description
                          }
                        />
                      </div>
                      <hr />
                    </Accordion>
                  ) : null} */}
                </div>
                <div className="w-full left-0 right-0 lg:w-5/12 xl:w-4/12 p-2 lg:p-0 lg:pl-12 flex flex-col order-1 lg:order-2 absolute top-[90px] lg:top-0 lg:static z-10">
                  <BookingFrameProvider
                    instantBookFormComponent={
                      fetchedPropertyData.instant_booking ? (
                        <BookingFrame price={fetchedPropertyData.price}>
                          <InstantBookForm propertyData={fetchedPropertyData} />
                        </BookingFrame>
                      ) : null
                    }
                    inquiryFormComponent={
                      <BookingFrame price={fetchedPropertyData.price}>
                        <InquiryForm propertyData={fetchedPropertyData} />
                      </BookingFrame>
                    }
                  />
                </div>
              </div>
            </Container>
            <div className="mt-8 lg:mb-28 mb-16 w-full aspect-[700/1200] md:aspect-[1440/507]">
              <PropertyMapManager
                lang={lang}
                mapCenter={fetchedPropertyData.coordinates}
                places={[...propertyDetailPlace]}
                propertySlug={fetchedPropertyData.slug}
              />
            </div>
          </div>
          {ambassadorForPicLeft && (
            <PicLeft
              {...ambassadorForPicLeft}
              title="Meet the Ambassador of this Property"
              titleVariant={TitleVariants.H3}
            />
          )}
          {reviews && reviews.length > 0 && (
            <Container variant={ContainerVariant.Fluid}>
              <Testimonials
                title={'Testimonials & Reviews'}
                ctaLabel={'See All Reviews'}
                titleVariant={TitleVariants.H3}
                testimonials={reviews}
              />
            </Container>
          )}
          {parseSimilarProperties(fetchedPropertyData).length > 0 ? (
            <Container
              variant={ContainerVariant.Offset}
              extraClasses={MarginTop[MarginVariants.MD]}
            >
              <Title titleVariant={TitleVariants.H3} extraClasses="mb-8">
                Other Homes You May Like
              </Title>
              <div className="md:-ml-1">
                <PropertySuggestionSlider
                  slides={parseSimilarProperties(fetchedPropertyData, lang)}
                />
              </div>
            </Container>
          ) : null}
        </>
      ) : (
        <p>No Data To Display</p>
      )}
    </>
  );
}
