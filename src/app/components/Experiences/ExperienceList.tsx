import { Card, CardVariant } from '~/components/Card';
import { Container } from '~/components/Container';
import { ExperienceFilter } from '~/components/Experiences/ExperienceFilter';
import { Title, TitleVariants } from '~/components/Title';
import { Locale } from '~/i18n.config';
import {
  getExperiencesData,
  getFiltersData,
} from '~/lib/serverComponentRequests';
import { SearchParams } from '~/lib/types';

import { ExperiencesAPIProps, ExperiencesAPIResultProps } from './types';

export async function ExperienceList({
  lang,
  searchParams,
}: Readonly<{
  lang: Locale;
  searchParams: SearchParams;
}>) {
  const experienceData: ExperiencesAPIProps = await getExperiencesData({
    lang,
    searchParams,
  });

  const filtersData = await getFiltersData({ lang });

  return (
    <Container extraClasses={'overflow-visible'}>
      <div className="flex flex-col md:flex-row items-center justify-between mb-10 mt-10">
        <Title
          extraClasses={'mb-8 md:mb-0 pb-0'}
          titleVariant={TitleVariants.H1}
        >
          Experiences
        </Title>
        <ExperienceFilter options={filtersData.countries.value} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-4">
        {experienceData.results?.map(
          ({
            id,
            title,
            slug,
            description,
            image,
          }: ExperiencesAPIResultProps) => (
            <Card
              key={slug}
              images={[{ id, src: image }]}
              title={title}
              content={description}
              link={`/en/experiences/${slug}`}
              variant={CardVariant.Guide}
            />
          )
        )}
      </div>
    </Container>
  );
}
