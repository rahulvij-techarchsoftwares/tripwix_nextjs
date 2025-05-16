'use server';

import { ArticleResponseData } from '~/components/Sliders/ArticlesSlider/types';
import { Locale } from '~/i18n.config';
import apiEndpoints from '~/lib/@apiEndpoints';

export async function fetchArticles({ lang }: { lang?: Locale }) {
  const endpoint = `${process.env.API_HOST}${apiEndpoints.ARTICLES.LIST}`;
  const apiUrl = `${endpoint}?limit=8`;

  try {
    const fetchOptions: RequestInit = {
      cache: 'no-store',
      headers: {
        'Accept-Language': lang || 'en',
      },
    };
    const res = await fetch(apiUrl, fetchOptions);
    const data = await res.json();
    return {
      articleList: data?.results || [],
    } as { articleList: ArticleResponseData[] };
  } catch (error) {
    console.log('Error fetching data: ', error);
    return { articleList: [] as ArticleResponseData[] };
  }
}
