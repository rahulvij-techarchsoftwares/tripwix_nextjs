'use client';
import { format } from 'date-fns';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { Blog } from '~/components/Blog';
import { BlogFilters } from '~/components/Blog/BlogFilters';
import { ArticleCardProps } from '~/components/Blog/types';
import { Pagination } from '~/components/Pagination';
import { getArticlesData } from '~/lib/serverComponentRequests';

import { BlogListSectionProps } from './types';

interface Article {
  title: string;
  id: string;
  content: string;
  slug: string;
  description: string;
  publication_date: string;
  banner?: string;
  image: string;
  category: string;
  thumbnail?: string;
  tag?: string;
}

export const BlogSection: React.FC<BlogListSectionProps> = ({ lang }) => {
  const urlParams = useSearchParams();
  const defaultPage = parseInt(urlParams.get('page') || '1', 10);
  const [articles, setArticles] = useState<ArticleCardProps[]>([]);
  const [blogFilterValue, setBlogFilterValue] = useState<string>('');
  const [page, setPage] = useState(defaultPage);
  const [totalArticles, setTotalArticles] = useState<number>(0);
  const loadArticles = async (blogFilterValue?: string, page?: string) => {
    try {
      const pag: string | undefined = page || urlParams.get('page') || '';
      const articlesData = (await getArticlesData({
        lang,
        currentPage: pag,
        blogFilterValue: blogFilterValue,
      })) as {
        total: number;
        count: number;
        results?: Article[];
      };
      setTotalArticles(articlesData?.total || 0);
      const parsedPagesData = articlesData?.results?.map(
        ({
          title,
          slug,
          content,
          thumbnail,
          publication_date,
          tag,
        }: Article) => ({
          title: title,
          slug: `${slug}`,
          description: content,
          date: publication_date
            ? format(publication_date, 'MMMM d, yyyy')
            : '',
          image: `${thumbnail || '/assets/articles/article_1.png'}`,
          category: `${tag}`,
        })
      ) as ArticleCardProps[];

      setArticles(parsedPagesData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOnPaginationChange = (page: number) => {
    setPage(page);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    loadArticles(blogFilterValue, page.toString());
  }, [blogFilterValue, page]);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-4/12 lg:w-3/12 md:pr-10">
        <BlogFilters
          onFilterSelect={(blogFilterValue?: string) => {
            setBlogFilterValue(blogFilterValue || '');
            setPage(1);
          }}
          totalArticles={totalArticles}
          currentFilter={blogFilterValue}
          currentPage={page}
        />
      </div>
      <div className="md:w-8/12 lg:w-9/12 w-full mb-16">
        <Blog articles={articles} />
        <div className="mb-16 mt-6">
          <Pagination
            currentPage={page}
            totalArticles={totalArticles}
            onPaginationChange={page => handleOnPaginationChange(page)}
          />
        </div>
      </div>
    </div>
  );
};
