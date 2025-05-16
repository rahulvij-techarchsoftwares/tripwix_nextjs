import React from 'react';

import { ButtonVariants } from '~/components';
import { PicLeftVariants } from '~/components/PicLeft/constants';
import { TitleVariants } from '~/components/Title';
import { HtmlParserFn } from '~/lib/htmlParser';
import { MarginVariants } from '~/types';

import { PicLeft } from './PicLeft';
import { CreatePicLeftBlockProps, PicLeftProps } from './types';

export const createPicLeftBlock = ({
  image = { value: { image: '' } },
  title = { value: '' },
  subtitle = { value: '' },
  description = { value: '' },
  cta = { value: { url: '', label: '' } },
  title_variant = { value: { slug: TitleVariants.H2 } },
  pic_left_variant = { value: { slug: PicLeftVariants.DEFAULT } },
  disable_block = { value: false },
  cta_form_dialog = { value: false },
  margin_top = { value: { slug: MarginVariants.MD } },
}: CreatePicLeftBlockProps): React.ReactElement<PicLeftProps> => (
  <>
    {disable_block?.value ? null : (
      <PicLeft
        cta={cta.value}
        image={image.value?.image || ''}
        description={HtmlParserFn(description.value)}
        subtitle={subtitle.value}
        title={title.value}
        titleVariant={title_variant.value?.slug}
        variant={pic_left_variant.value?.slug}
        displayFormModalCTA={cta_form_dialog?.value}
        marginTop={margin_top?.value?.slug}
        customLinkVariant={
          cta_form_dialog?.value
            ? ButtonVariants.Primary
            : ButtonVariants.Default
        }
      />
    )}
  </>
);
