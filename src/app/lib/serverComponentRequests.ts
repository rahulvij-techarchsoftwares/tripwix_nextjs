import { SearchParams } from '~/(pages)/[lang]/(pagegroup)/luxury-home-rentals/Filters/types';
import {
  propertySearchURL,
  urlParametersHandler,
} from '~/lib/urlParametersHandler';

import apiEndpoints from './@apiEndpoints';
import { BLOG_ARTICLES_PER_PAGE, FOUR_HOURS } from './constants';

export async function getPageData({
  pageSlug,
  lang,
}: {
  pageSlug: string;
  lang?: string;
}) {
  const endpoint = `${process.env.API_HOST}${apiEndpoints.PAGES.READ_SLUG(
    pageSlug
  )}`;

  const fetchOptions: RequestInit & {
    next: { revalidate: number; tags: string[] };
  } = {
    next: { tags: ['all', 'pages'], revalidate: FOUR_HOURS },
    headers: {
      'Accept-Language': lang || 'en',
      Accept: 'application/json',
    },
  };

  const res = await fetch(endpoint, fetchOptions);

  if (!res.ok) {
    return { notFound: 'notFound' };
  }

  return res.json();
}

export async function getFiltersData({ lang }: { lang?: string }) {
  const endpoint = `${process.env.API_HOST}${apiEndpoints.FILTERS.LIST}`;
  const fetchOptions: RequestInit & {
    next: { revalidate: number; tags: string[] };
  } = {
    next: { tags: ['all', 'filters'], revalidate: FOUR_HOURS }, // Next.js specific options
    headers: {
      'Accept-Language': lang || 'en',
      Accept: 'application/json',
    },
  };

  const res = await fetch(endpoint, fetchOptions);

  if (!res.ok) {
    throw new Error(`Failed to fetch filters data`);
  }

  return res.json();
}

export async function getPropertiesData({
  lang,
  searchParams,
}: {
  lang?: string;
  searchParams?: SearchParams;
}) {
  const paramsResult = propertySearchURL({
    ...searchParams,
    limit: '20',
    offset: '0',
  });

  const endpoint = `${process.env.API_HOST}${apiEndpoints.PROPERTIES.LIST}${paramsResult}`;

  const fetchOptions: RequestInit & {
    next: { revalidate: number; tags: string[] };
  } = {
    next: { tags: ['all', 'propertyList'], revalidate: FOUR_HOURS }, // Next.js specific options
    headers: {
      'Accept-Language': lang || 'en',
      Accept: 'application/json',
    },
  };

  const res = await fetch(endpoint, fetchOptions);

  console.log('this is getPropertiesData res', res);

  if (!res.ok) {
    return {
      total: 0,
      count: 0,
      next: null,
      previous: null,
      results: [],
    };
  }

  return res.json();
}

export async function getPropertyDetailsData({
  lang,
  slug,
}: {
  lang?: string;
  slug: string;
}) {
  const endpoint = `${process.env.API_HOST}${apiEndpoints.PROPERTIES.READ_SLUG(slug)}`;
  console.log(endpoint);
  const fetchOptions: RequestInit & {
    next: { revalidate: number; tags: string[] };
  } = {
    next: { tags: ['all', 'propertyList'], revalidate: FOUR_HOURS }, // Next.js specific options
    // cache: 'no-store',
    headers: {
      'Accept-Language': lang || 'en',
      Accept: 'application/json',
    },
  };

  const res = await fetch(endpoint, fetchOptions);
  console.log('this is getPropertyDetailsData res', res);
  if (!res.ok) {
    return { notFound: 'notFound' };
  }
  return res.json();
}

export async function getPropertyDetailsById({
  lang,
  id,
}: {
  lang?: string;
  id: string;
}) {
  const endpoint = `${process.env.API_HOST}${apiEndpoints.PROPERTIES.READ_ID(id)}`;

  const fetchOptions: RequestInit & {
    next: { revalidate: number; tags: string[] };
  } = {
    next: { tags: ['all', 'propertyList'], revalidate: FOUR_HOURS }, // Next.js specific options
    headers: {
      'Accept-Language': lang || 'en',
      Accept: 'application/json',
    },
  };

  const res = await fetch(endpoint, fetchOptions);

  if (!res.ok) {
    return { notFound: 'notFound' };
  }
  console.log('by proper id', res.json());
  return res.json();
}

export async function getExperiencesData({
  lang,
  searchParams,
}: {
  lang?: string;
  searchParams?: SearchParams;
}) {
  const params = new URLSearchParams(searchParams);
  const paramsResult = urlParametersHandler(params);

  const endpoint = `${process.env.API_HOST}${apiEndpoints.EXPERIENCES.LIST}?${paramsResult}`;

  const fetchOptions: RequestInit & {
    next: { revalidate: number; tags: string[] };
  } = {
    next: { tags: ['all', 'experiencesList'], revalidate: FOUR_HOURS },
    headers: {
      'Accept-Language': lang || 'en',
      Accept: 'application/json',
    },
  };

  const res = await fetch(endpoint, fetchOptions);

  if (!res.ok) {
    return [];
  }

  return res.json();
}

export async function getPagesData({ lang }: { lang?: string }) {
  const endpoint = `${process.env.API_HOST}${apiEndpoints.PAGES.LIST}?limit=40`;

  const fetchOptions: RequestInit & {
    next: { revalidate: number; tags: string[] };
  } = {
    next: { tags: ['all', 'pageList'], revalidate: FOUR_HOURS },
    headers: {
      'Accept-Language': lang || 'en',
      Accept: 'application/json',
    },
  };

  const res = await fetch(endpoint, fetchOptions);

  if (!res.ok) {
    throw new Error(`Failed to fetch pages data`);
  }

  return res.json();
}

export async function getArticlesData({
  lang,
  currentPage = '1',
  blogFilterValue,
}: {
  lang?: string;
  currentPage?: string | undefined;
  blogFilterValue?: string;
}) {
  const endpoint = `${process.env.API_HOST}${apiEndpoints.ARTICLES.LIST}?limit=30${blogFilterValue && `&tag=${blogFilterValue}`}&offset=${(parseInt(currentPage) - 1) * BLOG_ARTICLES_PER_PAGE}&limit=${BLOG_ARTICLES_PER_PAGE}`;

  const fetchOptions: RequestInit & {
    next: { revalidate: number; tags: string[] };
  } = {
    next: { tags: ['all', 'articleList'], revalidate: FOUR_HOURS },
    headers: {
      'Accept-Language': lang || 'en',
      Accept: 'application/json',
    },
  };

  const res = await fetch(endpoint, fetchOptions);

  if (!res.ok) {
    return {
      total: 0,
      count: 0,
      next: null,
      previous: null,
      results: [],
    };
  }

  return res.json();
}

export async function getArticleData({
  articleId,
  lang,
}: {
  articleId: string;
  lang?: string;
}) {
  const endpoint = `${process.env.API_HOST}${apiEndpoints.ARTICLES.ID(articleId)}`;

  const fetchOptions: RequestInit = {
    cache: 'no-store',
    headers: {
      'Accept-Language': lang || 'en',
      Accept: 'application/json',
    },
  };

  const res = await fetch(endpoint, fetchOptions);

  if (!res.ok) {
    return { notFound: 'notFound' };
  }

  return res.json();
}

export async function getArticleBySlugData({
  slug,
  lang,
}: {
  slug: string;
  lang?: string;
}) {
  const endpoint = `${process.env.API_HOST}${apiEndpoints.ARTICLES.SLUG(slug)}`;

  const fetchOptions: RequestInit = {
    cache: 'no-store',
    headers: {
      'Accept-Language': lang || 'en',
      Accept: 'application/json',
    },
  };

  const res = await fetch(endpoint, fetchOptions);

  if (!res.ok) {
    return { notFound: 'notFound' };
  }

  return res.json();
}
