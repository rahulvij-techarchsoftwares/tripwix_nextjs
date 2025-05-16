'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

import { buttonStyles } from '~/components/CTA/constants';
import { BLOG_ARTICLES_PER_PAGE } from '~/lib/constants';

import { PaginationProps } from './types';

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalArticles,
  onPaginationChange,
}) => {
  const router = useRouter();

  const pageNumbers = [] as number[];

  for (let i = 0; i < Math.ceil(totalArticles / BLOG_ARTICLES_PER_PAGE); i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (page: number) => {
    onPaginationChange
      ? onPaginationChange(page)
      : router.push(`?page=${page}`);
  };

  return (
    <div className="flex flex-row items-center justify-between">
      <div>
        {pageNumbers.map(pageNumber => (
          <>
            <button
              key={pageNumber}
              className={
                currentPage === pageNumber + 1
                  ? buttonStyles.articlePaginationActive
                  : buttonStyles.articlePagination
              }
              onClick={() => handlePageChange(pageNumber + 1)}
            >
              {pageNumber + 1}
            </button>
          </>
        ))}
      </div>
      <div>
        <button
          className={`${buttonStyles.articlePrev} ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <Image
            width={8}
            height={16}
            src="/assets/arrows/left_arrow.svg"
            alt="previous-page"
          />
        </button>
        <button
          className={`${buttonStyles.articlePrev} ${currentPage >= Math.ceil(totalArticles / BLOG_ARTICLES_PER_PAGE) ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={
            currentPage >= Math.ceil(totalArticles / BLOG_ARTICLES_PER_PAGE)
          }
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <Image
            width={8}
            height={16}
            src="/assets/arrows/right_arrow.svg"
            alt="next-page"
          />
        </button>
      </div>
    </div>
  );
};
