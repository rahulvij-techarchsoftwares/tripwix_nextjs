'use client';

import './styles.css';

import { format } from 'date-fns';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { ArticleCardProps } from '~/components/Blog/types';
import { Title, TitleVariants } from '~/components/Title';

export const ArticleCard = ({
  title,
  image,
  description,
  category,
  date,
  slug,
}: ArticleCardProps) => {
  const pathname = usePathname();
  return (
    <a href={`${pathname}/${slug}`}>
      <div className={'relative rounded-2xl overflow-hidden'}>
        {category !== 'null' && (
          <span className="absolute top-2 left-4 bg-white rounded-2xl px-4 py-1 text-sm z-10 mt-2">
            {category}
          </span>
        )}
        <div className={'relative'}>
          <div className="aspect-[475/361] w-full overflow-hidden relative">
            <Image
              className={'hover:scale-125 transition ease-in-out duration-1000'}
              fill={true}
              src={image}
              alt={title}
            />
          </div>
          <div
            className={
              'absolute bottom-0 left-0 w-full pl-4 pb-2 text-white article-title'
            }
          >
            <Title
              extraClasses="text-white pb-0"
              titleVariant={TitleVariants.H5}
            >
              {title}
            </Title>
            <p className="text-sm tracking-widest uppercase" title={date}>
              {format(date, 'MMM. d, yyyy')}
            </p>
          </div>
        </div>
        <div
          className={
            'p-4 border-b border-x border-b-tertiary-20 border-x-tertiary-20 rounded-b-2xl'
          }
        >
          <p className="p-0 text-ellipsis line-clamp-3 h-20">{description}</p>
        </div>
      </div>
    </a>
  );
};
