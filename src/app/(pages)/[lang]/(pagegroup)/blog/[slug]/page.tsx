import './styles.css';

import { format } from 'date-fns';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import { Banner } from '~/components/Banner';
import { ContactForm } from '~/components/Contact';
import { Container, ContainerVariant } from '~/components/Container';
import { CustomImage } from '~/components/CustomImage';
import { HtmlParser } from '~/components/HtmlParser';
import { ASSET_PATHS } from '~/configs/assetPaths';
import { Locale } from '~/i18n.config';
import { getArticleBySlugData } from '~/lib/serverComponentRequests';
import { TopicProps } from '~/types/globalTypes';

import { ArticleNavigation } from './ArticleNavigation';

export default async function ArticlePage({
  params: { lang, slug },
}: {
  params: { lang: Locale; slug: string };
  searchParams: URLSearchParams;
}) {
  const articleData = await getArticleBySlugData({ slug, lang });

  if ('notFound' in articleData) {
    return notFound();
  }

  return (
    <div>
      <Banner
        images={[
          {
            id: 1,
            src: articleData?.banner || ASSET_PATHS.BANNER_PLACEHOLDER,
          },
        ]}
        title={articleData.title || ''}
        topSubtitle={
          articleData.publication_date || articleData.created_at
            ? format(
                articleData?.publication_date || articleData?.created_at,
                'MMMM d, yyyy'
              )
            : ''
        }
      />
      <Container variant={ContainerVariant.Default} extraClasses={'mt-8'}>
        {articleData.author ? (
          <p className="uppercase text-quaternary-100">
            By: {articleData.author.name}
          </p>
        ) : null}
        {articleData.topics.map((topic: TopicProps) => (
          <div key={topic.id}>
            <div className="article-page">
              <HtmlParser htmlContent={topic.content} />
            </div>
          </div>
        ))}
        {articleData.author ? (
          <div className="author flex flex-col md:flex-row justify-between gap-6 bg-[#F9F9F9] p-8 mb-16 mt-4 md:mt-16">
            {articleData.author.avatar ? (
              <>
                <div className="flex flex-row items-center md:items-start gap-6">
                  <CustomImage
                    extraClassNames={
                      'rounded-full aspect-square overflow-hidden flex-shrink-0'
                    }
                    imageSrc={articleData.author.avatar}
                  />
                  <p className="font-bold text-quaternary-100 md:hidden p-0">
                    {articleData.author?.name}
                  </p>
                </div>
              </>
            ) : null}
            <div className="mt-4">
              <p className="font-bold text-quaternary-100 hidden md:block pt-2">
                {articleData.author?.name}
              </p>
              <div className="author-description">
                <HtmlParser
                  breakLines={true}
                  htmlContent={articleData.author?.description}
                />
              </div>
            </div>
          </div>
        ) : null}
        <ArticleNavigation
          previousArticleId={articleData?.previous_article}
          nextArticleId={articleData?.next_article}
        />
      </Container>
      <div className="flex flex-row items-center justify-center relative py-24 mt-16">
        <Image
          className="w-full absolute left-0 z-10 top-0 object-cover"
          fill={true}
          src="/assets/contact_form_bg.jpeg"
          alt="contact form"
        />
        <Container
          extraClasses="relative z-20"
          variant={ContainerVariant.Fluid}
        >
          <div className="bg-white py-3 md:py-16 md:px-10 rounded-2xl m-auto max-w-[95%] md:max-w-[750px]">
            <ContactForm />
          </div>
        </Container>
      </div>
    </div>
  );
}
