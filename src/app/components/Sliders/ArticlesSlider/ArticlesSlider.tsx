'use client';

import './styles.css';

import useEmblaCarousel from 'embla-carousel-react';
import React, { useCallback, useEffect, useState } from 'react';

import { fetchArticles } from '~/actions/fetch-articles';
import { Card, CardVariant } from '~/components/Card';
import { Container, ContainerVariant } from '~/components/Container';
import { CustomIcon, CustomIconVariant } from '~/components/CustomIcon';
import { PAGE_PATHS } from '~/lib/constants';

import { ArticleCard, ArticleResponseData, ArticlesSliderProps } from './types';

export const ArticlesSlider: React.FC<ArticlesSliderProps> = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
  const [articles, setArticles] = useState<ArticleResponseData[]>([]);

  const loadArticles = async () => {
    const response: {
      articleList: ArticleResponseData[];
    } = (await fetchArticles({ lang: 'en' })) ?? [];
    setArticles(response?.articleList || []);
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const parseArticles = (articles: ArticleResponseData[]) => {
    return articles.map(({ id, title, tag, content, thumbnail, slug }) => {
      return {
        id,
        slug,
        title,
        tag,
        content: content,
        thumbnail,
      } as ArticleCard;
    });
  };

  const parseArticlesCallback = useCallback(() => {
    return parseArticles(articles);
  }, [articles]);

  return (
    <Container variant={ContainerVariant.Offset}>
      <div className="pb-24">
        <div className="relative">
          <button
            className="absolute left-10 md:left-16 rounded-lg w-6 h-6 top-[150px] -translate-y-1/2 z-10 bg-white flex items-center justify-center"
            onClick={() => scrollPrev()}
          >
            <CustomIcon icon={CustomIconVariant.PrevArrow} height={10} />
          </button>
          <button
            className="absolute left-auto right-10 md:right-[10%] rounded-lg w-6 h-6 top-[150px] -translate-y-1/2 z-10 bg-white flex items-center justify-center"
            onClick={() => scrollNext()}
          >
            <CustomIcon icon={CustomIconVariant.NextArrow} height={10} />
          </button>
          <div className="articles-embla" ref={emblaRef}>
            <div className="articles-embla__container relative">
              {parseArticlesCallback().map(
                ({ id, tag, title, thumbnail, slug }) => (
                  <div className="articles-embla__slide mr-4" key={id}>
                    <Card
                      title={tag}
                      content={title}
                      link={`/${PAGE_PATHS.BLOG}/${slug}`}
                      images={[
                        {
                          id: 0,
                          src: `${thumbnail || '/assets/articles/article_1.png'}`,
                        },
                      ]}
                      variant={CardVariant.Article}
                    />
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
