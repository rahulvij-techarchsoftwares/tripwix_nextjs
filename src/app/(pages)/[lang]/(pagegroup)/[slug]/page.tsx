import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Locale } from '~/i18n.config';
import apiEndpoints from '~/lib/@apiEndpoints';
import { renderEditablePageBlocks } from '~/lib/renderEditablePageBlocks';
import { getPageData } from '~/lib/serverComponentRequests';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const response = await fetch(
    `${process.env.API_HOST}${apiEndpoints.PAGES.READ_SLUG(params.slug)}/`
  );
  const page = await response.json();
  return {
    title: page.seo?.title,
    description: page.seo?.description,
  };
}

export default async function Page({
  params: { lang, slug },
}: Readonly<{
  params: { lang: Locale; slug: string };
}>) {
  const pageData = await getPageData({ pageSlug: slug, lang });
  if ('notFound' in pageData) {
    return notFound();
  }
  return <>{renderEditablePageBlocks(pageData.components)}</>;
}
