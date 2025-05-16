import Image from 'next/image';
import React from 'react';

import { SearchParams } from '~/(pages)/[lang]/(pagegroup)/luxury-home-rentals/Filters/types';
import { ContactForm } from '~/components/Contact';
import { Container, ContainerVariant } from '~/components/Container';
import { ExperienceList } from '~/components/Experiences';
import { PAGE_SLUGS } from '~/configs/pageSlugs';
import { Locale } from '~/i18n.config';
import { renderEditablePageBlocks } from '~/lib/renderEditablePageBlocks';
import { getPageData } from '~/lib/serverComponentRequests';
import { MarginTop, MarginVariants } from '~/types';

export default async function Experiences({
  params: { lang },
  searchParams,
}: Readonly<{
  params: { lang: Locale };
  searchParams: SearchParams;
}>) {
  const pageData = await getPageData({
    pageSlug: PAGE_SLUGS.EXPERIENCES,
    lang,
  });
  return (
    <>
      {renderEditablePageBlocks(pageData.components)}
      <ExperienceList lang={lang} searchParams={searchParams} />
      <>
        <div
          className={`flex flex-row items-center justify-center relative py-24 ${MarginTop[MarginVariants.MD]}`}
        >
          <Image
            className="w-full absolute left-0 z-10 top-0 object-cover"
            fill={true}
            src={'/assets/contact_form_bg.jpeg'}
            alt="contact form"
          />
          <Container
            extraClasses="relative z-20"
            variant={ContainerVariant.Fluid}
          >
            <div className="bg-white py-3 md:py-16 md:px-10 rounded-2xl m-auto max-w-[95%] md:max-w-[750px]">
              <ContactForm />
            </div>
          </Container>
        </div>
      </>
    </>
  );
}
