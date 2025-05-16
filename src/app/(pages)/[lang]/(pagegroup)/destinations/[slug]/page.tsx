import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { AnchorsNavigation } from '~/components/AnchorsNavigation';
import { Locale } from '~/i18n.config';
import apiEndpoints from '~/lib/@apiEndpoints';
import { renderEditablePageBlocks } from '~/lib/renderEditablePageBlocks';
import { EditablePageComponentSlugs } from '~/lib/renderEditablePageBlocks/types';
import { getPageData } from '~/lib/serverComponentRequests';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const response = await fetch(
    `${process.env.API_HOST}${apiEndpoints.PAGES.READ_SLUG(`destinations/${params.slug}`)}/`
  );
  const page = await response.json();
  return {
    title: page.seo?.title,
    description: page.seo?.description,
  };
}

export default async function Destinations({
  params: { lang, slug },
}: Readonly<{
  params: { lang: Locale; slug: string };
}>) {
  const pageData = await getPageData({
    lang,
    pageSlug: `destinations/${slug}`,
  });

  if ('notFound' in pageData) {
    return notFound();
  }

  const BannerComponent = pageData.components.filter(
    (component: any) => component.slug === EditablePageComponentSlugs.BANNER
  );

  return (
    <>
      {renderEditablePageBlocks(BannerComponent)}
      <AnchorsNavigation
        anchors={[
          { href: '#collections', label: 'Collections' },
          { href: '#guide', label: 'Guide' },
          { href: '#communities', label: 'Communities' },
          {
            href: '#experiences-itineraries',
            label: 'Experiences & Itineraries',
          },
          { href: '#inspiration', label: 'Inspiration' },
        ]}
      />
      {renderEditablePageBlocks(
        pageData.components.filter(
          (component: any) =>
            component.slug !== EditablePageComponentSlugs.BANNER
        )
      )}
    </>
  );
}
