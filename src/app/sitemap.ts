import { MetadataRoute } from 'next';

import apiEndpoints from '~/lib/@apiEndpoints';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const countries = ['BB', 'IT', 'MX', 'PT'];
  const propertyResponses = await Promise.all(
    countries.map(country =>
      fetch(
        `${process.env.API_HOST}${apiEndpoints.PROPERTIES.LIST}?country=${country}&limit=200`
      )
    )
  );
  const properties = await Promise.all(
    propertyResponses.map(response => response.json())
  );
  const propertyEntries: MetadataRoute.Sitemap = properties.flatMap(property =>
    property.results?.map(({ slug }: { slug: string }) => ({
      url: `${process.env.NEXTAUTH_URL}/en/luxury-home-rentals/${slug}/`,
    }))
  );

  const pageResponse = await fetch(
    `${process.env.API_HOST}${apiEndpoints.PAGES.LIST}?limit=30`
  );
  const pages = await pageResponse.json();
  const pageEntries: MetadataRoute.Sitemap = pages.results?.map(
    ({ slug }: { slug: string }) => ({
      url: `${process.env.NEXTAUTH_URL}/en/${slug}/`,
    })
  );

  const articlesResponse = await fetch(
    `${process.env.API_HOST}${apiEndpoints.ARTICLES.LIST}?limit=100`
  );
  const articles = await articlesResponse.json();
  const articleEntries: MetadataRoute.Sitemap = articles.results?.map(
    ({ slug }: { slug: string }) => ({
      url: `${process.env.NEXTAUTH_URL}/en/blog/${slug}`,
    })
  );

  return [
    {
      url: `${process.env.NEXTAUTH_URL}/`,
    },
    ...pageEntries,
    ...articleEntries,
    ...propertyEntries,
  ];
}
