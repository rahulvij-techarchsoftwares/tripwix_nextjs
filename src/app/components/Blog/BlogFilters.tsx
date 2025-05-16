'use client';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { BlogFilterItems, BlogFiltersProps } from '~/components/Blog/types';
import { Drawer } from '~/components/Drawer';
import { DrawerVariant } from '~/components/Drawer/types';
import { BLOG_ARTICLES_PER_PAGE } from '~/lib/constants';

import { Button, ButtonVariants } from '../CTA';

export const BlogFilters: React.FC<BlogFiltersProps> = ({
  onFilterSelect,
  totalArticles,
  currentFilter,
  currentPage,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const searchParams = useSearchParams();
  const getFilterFromUrl =
    searchParams?.get('tag') ||
    BlogFilterItems.find(item => item.key === 'ALL')?.value ||
    currentFilter;

  const [currentActiveFilter, setCurrentActiveFilter] = useState<string>(
    `${getFilterFromUrl}`
  );

  const handleFilterClick = (filterValue: string) => {
    const params = new URLSearchParams();
    params.set('tag', filterValue);

    const tag = searchParams?.get('tag');
    if (tag) {
      params.set('tag', tag);
    }

    setCurrentActiveFilter(filterValue);
  };

  useEffect(() => {
    onFilterSelect(currentActiveFilter);
  }, [currentActiveFilter]);

  return (
    <div className="flex justify-between items-center md:items-start pt-5 md:pt-0 md:flex-col">
      <div>
        <p className="tracking-wider md:pt-20 pb-0">
          <span className="font-bold">
            Showing {(currentPage - 1) * BLOG_ARTICLES_PER_PAGE + 1}-
            {Math.min(currentPage * BLOG_ARTICLES_PER_PAGE, totalArticles)}
          </span>{' '}
          out of {totalArticles} Results
        </p>
      </div>
      <div className="flex flex-row items-center md:pb-5 gap-4 md:justify-between">
        <Button
          extraClasses="text-lg font-normal !p-2 !pr-4 mb-0 md:hidden rounded-full text-xs"
          variant={ButtonVariants.Success}
          onClick={() => setIsDrawerOpen(true)}
        >
          <Image
            src={'/assets/filter.svg'}
            width={15}
            height={15}
            alt="filter by"
            className="md:hidden filter-white"
          />
          Filter
        </Button>
        <span className="hidden text-lg pt-8 pb-0 md:inline">Filter By</span>
        {/* <button
          className="hover:cursor-pointer hidden md:flex flex-row items-center justify-between gap-2 text-sm"
          onClick={() => {
            handleFilterClick('');
          }}
        >
          <Image
            src={'/assets/properties/reset_filters.svg'}
            width={10}
            height={10}
            alt="reset filters"
          />
          Reset Search
        </button> */}
      </div>
      <Drawer
        variant={DrawerVariant.Right}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        {BlogFilterItems.map(blogFilterItem => (
          <button
            key={blogFilterItem.value}
            className={`font-bold text-md text-lg md:text-xl py-4 hover:cursor-pointer flex flex-row items-center gap-2 text-start ${
              currentActiveFilter === blogFilterItem.value ? 'text-success' : ''
            }`}
            onClick={() => handleFilterClick(blogFilterItem.value)}
          >
            {blogFilterItem.label}
          </button>
        ))}
      </Drawer>
    </div>
  );
};
