import { SlimBanner } from '~/components/SlimBanner';
import { SlimBannerVariant } from '~/components/SlimBanner/types';
import { Locale } from '~/i18n.config';

import { BlogSection } from './blogSection';

export default async function BlogPage({
  params: { lang },
}: Readonly<{
  params: { lang: Locale };
}>) {
  return (
    <div className="mt-10">
      <SlimBanner
        lang={lang}
        title={'Blog'}
        image={'/assets/banner/blog-slim-banner.png'}
        variant={SlimBannerVariant.WithCover}
      />
      <div className="w-[90%] max-w-[1446px] mx-auto">
        <BlogSection lang={'en'} />
      </div>
    </div>
  );
}
