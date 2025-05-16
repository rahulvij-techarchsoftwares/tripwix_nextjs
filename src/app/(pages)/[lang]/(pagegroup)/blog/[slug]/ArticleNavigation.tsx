'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { buttonStyles } from '~/components/CTA/constants';

import { ArticleNavigationProps } from './types';

export const ArticleNavigation: React.FC<ArticleNavigationProps> = ({
  previousArticleId,
  nextArticleId,
}) => {
  return (
    <div className="flex justify-end mt-4">
      {nextArticleId ? (
        <Link
          className={buttonStyles.articlePrev}
          href={`/blog/${nextArticleId}`}
        >
          <Image
            width={8}
            height={16}
            src="/assets/arrows/left_arrow.svg"
            alt="previous-page"
          />
        </Link>
      ) : (
        <span
          className={`${buttonStyles.articlePrev} opacity-50 cursor-not-allowed`}
        >
          <Image
            width={8}
            height={16}
            src="/assets/arrows/left_arrow.svg"
            alt="previous-page"
          />
        </span>
      )}
      {previousArticleId ? (
        <Link
          className={`${buttonStyles.articlePrev}`}
          href={`/blog/${previousArticleId}`}
        >
          <Image
            width={8}
            height={16}
            src="/assets/arrows/right_arrow.svg"
            alt="next-page"
          />
        </Link>
      ) : (
        <span
          className={`${buttonStyles.articlePrev} opacity-50 cursor-not-allowed`}
        >
          <Image
            width={8}
            height={16}
            src="/assets/arrows/right_arrow.svg"
            alt="next-page"
          />
        </span>
      )}
    </div>
  );
};
