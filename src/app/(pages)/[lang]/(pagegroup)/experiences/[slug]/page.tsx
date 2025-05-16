import Image from 'next/image';

import { Banner } from '~/components/Banner';
import { BannerVariants } from '~/components/Banner/types';
import { Container, ContainerVariant } from '~/components/Container';
import { CustomIconVariant } from '~/components/CustomIcon';
import { DestinationQualities } from '~/components/DestinationQualities';
import { ExperienceDetailsDescription } from '~/components/ExperienceDetailsDescription';
import { IntroBlock } from '~/components/IntroBlock';
import ModalProvider from '~/components/providers/ModalProvider';
import { Locale } from '~/i18n.config';
import { ImageProps } from '~/types';

export default async function Page({
  params: { lang, slug },
}: Readonly<{
  params: { lang: Locale; slug: string };
}>) {
  //const pageData = await getPageData({ pageSlug: slug, lang });
  //return <>{renderEditablePageBlocks(pageData.components)}</>;

  const images: ImageProps[] = [
    { id: 1, src: '/assets/experiences/experience-details-1.png' },
    { id: 2, src: '/assets/experiences/experience-details-2.png' },
    { id: 3, src: '/assets/experiences/experience-details-3.png' },
  ];

  return (
    <>
      <ModalProvider>
        <Banner
          images={[{ id: 1, src: '/assets/articles/article_1.png' }]}
          variant={BannerVariants.ExperienceDetails}
          title="Unique experience, tailored precisely to your preferences."
        />
        <DestinationQualities
          qualities={[
            {
              icon: CustomIconVariant.QualitiesBadge,
              label: 'Handpicked homes in the most desirable neighbourhoods',
            },
            {
              icon: CustomIconVariant.QualitiesWifi,
              label: 'Unparalleled level of service and attention to detail',
            },
            {
              icon: CustomIconVariant.QualitiesFavorite,
              label: 'Tailor-made stays with our exclusive concierge service',
            },
          ]}
        />
        <IntroBlock
          title="Title"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
        />
        <Container variant={ContainerVariant.Fluid}>
          <div className="flex flex-wrap mt-32 mb-40">
            <div className="w-full md:w-5/12 lg:w-3/10 flex flex-col items-end pr-5">
              <div className="rounded-2xl overflow-hidden aspect-[530/712] w-[530]">
                <Image
                  src={images[1].src}
                  alt=""
                  layout="responsive"
                  width={530}
                  height={712}
                />
              </div>
              <div className="rounded-2xl overflow-hidden aspect-[422/360] w-[422] mt-5">
                <Image
                  src={images[2].src}
                  alt=""
                  layout="responsive"
                  width={422}
                  height={360}
                />
              </div>
            </div>
            <div className="w-full md:w-6/12 lg:w-7/10">
              <div className="rounded-2xl overflow-hidden aspect-[750/255] w-full mt-12">
                <Image
                  src={images[0].src}
                  alt=""
                  layout="responsive"
                  width={750}
                  height={255}
                />
              </div>
              <div className="pt-20 pl-12 mb-40">
                <ExperienceDetailsDescription />
              </div>
            </div>
          </div>
        </Container>
        <Container
          variant={ContainerVariant.Small}
          extraClasses="bg-quaternary py-20"
        >
          <h3 className="mb-6 text-quaternary-100">Overview</h3>
          <div className="px-5">
            <p>
              {
                "Please note that although there are 5 bedrooms, Baia L'Aura can host a maximum of 8 guests (including children)."
              }
            </p>
            <p>
              {
                'Due to the nature of this property, we cannot accept bookings with children under 8 years old. Please note that the retractable walls in the living area at Baia'
              }
            </p>
            <p>
              L&apos;Aura can only be operated by the villa staff, who will be
              available twice a day to open and close these accordingly The sea
              access in front of this property is via rocks and so may not be
              possible to use if the sea is rough.
            </p>
            <p>CIR no. 19088005C208086</p>
          </div>
          <hr className="mt-5 mb-10" />
          <h3 className="mb-6 text-quaternary-100">What&apos;s Included?</h3>
          <div className="px-5">
            <ul className="experience-list columns-2 gap-10">
              <li className="flex flex-row items-start mb-10">
                <Image
                  className={'mt-1 mr-3'}
                  src={'/assets/icon-check.svg'}
                  height={20}
                  width={20}
                  alt=""
                />
                The support of our Villa Specialists to help you select your
                perfect villa
              </li>
              <li className="flex flex-row items-start mb-10">
                <Image
                  className={'mt-1 mr-3'}
                  src={'/assets/icon-check.svg'}
                  height={20}
                  width={20}
                  alt=""
                />
                The expertise of a dedicated local team to help you fine-tune
                the logistics of your trip and to plan a range of experiences,
                many of which are exclusive to The Thinking Traveller
              </li>
              <li className="flex flex-row items-start mb-10">
                <Image
                  className={'mt-1 mr-3'}
                  src={'/assets/icon-check.svg'}
                  height={20}
                  width={20}
                  alt=""
                />
                A Local Specialist, based near your villa, to assist you during
                your stay (between 9am and 7pm daily, with 24/7 emergency
                support)
              </li>
              <li className="flex flex-row items-start mb-10">
                <Image
                  className={'mt-1 mr-3'}
                  src={'/assets/icon-check.svg'}
                  height={20}
                  width={20}
                  alt=""
                />
                A comprehensive guide to your villa and its surrounding area,
                including our restaurant recommendations, cultural highlights
                and other activities
              </li>
              <li className="flex flex-row items-start mb-10">
                <Image
                  className={'mt-1 mr-3'}
                  src={'/assets/icon-check.svg'}
                  height={20}
                  width={20}
                  alt=""
                />
                An easy-to-use online holiday planner to keep all your booked
                experiences and services in one place, ensuring that nothing
                gets missed during your stay
              </li>
              <li className="flex flex-row items-start mb-10">
                <Image
                  className={'mt-1 mr-3'}
                  src={'/assets/icon-check.svg'}
                  height={20}
                  width={20}
                  alt=""
                />
                The ability to coordinate and share the details of your trip
                with your group via Your Account <br />
                Sole use of the villa and the grounds
              </li>
              <li className="flex flex-row items-start mb-10">
                <Image
                  className={'mt-1 mr-3'}
                  src={'/assets/icon-check.svg'}
                  height={20}
                  width={20}
                  alt=""
                />
                All sales taxes, electricity, gas, Wi-Fi, linen, bath towels,
                pool and/or beach towels
              </li>
              <li className="flex flex-row items-start mb-10">
                <Image
                  className={'mt-1 mr-3'}
                  src={'/assets/icon-check.svg'}
                  height={20}
                  width={20}
                  alt=""
                />
                A daily cleaning service (up to 5 hours/day, excluding Sundays
                and Bank Holidays) and a mid-week linen change.
              </li>
            </ul>
          </div>
        </Container>
      </ModalProvider>
    </>
  );
}
