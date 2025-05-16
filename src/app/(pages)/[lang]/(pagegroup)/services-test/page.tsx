import { PAGE_SLUGS } from '~/configs/pageSlugs';
import { Locale } from '~/i18n.config';
import { renderEditablePageBlocks } from '~/lib/renderEditablePageBlocks';
import { getPageData } from '~/lib/serverComponentRequests';

export default async function Services({
  params: { lang },
}: Readonly<{
  params: { lang: Locale };
}>) {
  const pageData = await getPageData({ pageSlug: PAGE_SLUGS.SERVICES, lang });

  return <main>{renderEditablePageBlocks(pageData.components)}</main>;
}
