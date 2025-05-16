import React from 'react';

import { ArticleCard } from '~/components/Blog/ArticleCard';

import { BlogProps } from './types';

export const Blog: React.FC<BlogProps> = ({ articles }) => {
  return (
    <div className="flex flex-row pt-8 md:pt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full mb-16">
        {articles.length > 0 ? (
          articles.map(
            ({ slug, title, description, date, image, category }) => (
              <ArticleCard
                key={slug}
                title={title}
                slug={slug}
                description={description}
                date={date}
                image={image}
                category={category}
              />
            )
          )
        ) : (
          <p>No articles were found</p>
        )}
      </div>
    </div>
  );
};
