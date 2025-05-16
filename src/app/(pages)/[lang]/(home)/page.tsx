import { Banner } from '~/components/Banner';
import { BannerVariants } from '~/components/Banner/types';
import { RentalsFilterBar } from '~/components/RentalsFilterBar';
import { PAGE_SLUGS } from '~/configs/pageSlugs';
import { Locale } from '~/i18n.config';
import { renderEditablePageBlocks } from '~/lib/renderEditablePageBlocks';
import { getFiltersData, getPageData } from '~/lib/serverComponentRequests';
import { ComponentAPIProps, ImageAPIProps } from '~/lib/types';

export default async function Home({
  params: { lang },
}: Readonly<{
  params: { lang: Locale };
}>) {
  const pageData = await getPageData({ pageSlug: PAGE_SLUGS.HOMEPAGE, lang });
  const filtersData = await getFiltersData({ lang });
  const bannerComponent = pageData?.components?.find(
    (component: ComponentAPIProps) => component.slug === 'banner'
  );
  if (!bannerComponent) {
    console.error('Banner component not found in page data.');
    return <main>Error: Banner component is missing.</main>;
  }
  return (
    <main>
      <Banner
        images={bannerComponent.data.images.value.map(
          (image: ImageAPIProps, index: number) => {
            return { id: index, src: image.image };
          }
        )}
        title={bannerComponent.data.title.value}
        subtitle={bannerComponent.data.subtitle.value}
        description={bannerComponent.data.description.value}
        variant={BannerVariants.HomePage}
        videoSrc={bannerComponent.data.video_url?.value}
      >
        <RentalsFilterBar countries={filtersData.countries.value} />
      </Banner>
      {renderEditablePageBlocks(
        pageData.components.filter(
          (component: ComponentAPIProps) => component.slug !== 'banner'
        )
      )}
    </main>
  );
}
