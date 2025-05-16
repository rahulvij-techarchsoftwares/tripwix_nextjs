import React from 'react';

import { TextWith3BlockImages } from '~/components/TextWith3BlockImages/TextWith3BlockImages';
import {
  CreateTextWith3BlockImages,
  TextWith3BlockImagesProps,
} from '~/components/TextWith3BlockImages/types';
import { HtmlParserFn } from '~/lib/htmlParser';
import { MarginVariants } from '~/types';

export const createTextWith3BlockImages = ({
  id = { value: '' },
  title = { value: '' },
  description = { value: '' },
  images = { value: { slides: [] } },
  margin_top = { value: { slug: MarginVariants.MD } },
}: CreateTextWith3BlockImages): React.ReactElement<TextWith3BlockImagesProps> => (
  <TextWith3BlockImages
    id={id?.value}
    imageItems={images.value?.slides || []}
    title={title?.value || ''}
    subtitle={HtmlParserFn(description?.value)}
    marginTop={margin_top?.value?.slug}
  />
);
