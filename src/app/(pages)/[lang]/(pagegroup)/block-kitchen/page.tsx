'use client';

import { Card, CardVariant } from '~/components/Card';
import { Contact } from '~/components/Contact';
import { Container, ContainerVariant } from '~/components/Container';
import { IntroBlock, IntroBlockVariants } from '~/components/IntroBlock';
import { PropertyCard } from '~/components/PropertyCard';
import { TestimonialsSlider } from '~/components/Sliders';
import { JourneySlider } from '~/components/Sliders/JourneySlider';
import { journeyItem } from '~/components/Sliders/JourneySlider/constants';
import { ServicesSlider } from '~/components/Sliders/ServicesSlider';
import { Title } from '~/components/Title';

import {
  articleCards,
  communityCards,
  destinationCards,
  experienceCards,
  experiencesCards,
  guideCards,
  holidayCards,
  propertyCards,
  propertyDetailCards,
  revealDescriptionCards,
  servicesCards,
  specialistCards,
  teamCards,
} from './constants';

export default function BlocKitchen() {
  return (
    <main>
      <Container variant={ContainerVariant.Fluid}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
          {revealDescriptionCards.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              link={card.link}
              images={card.images}
              content={card.content}
              variant={card.variant}
            />
          ))}
        </div>
      </Container>
      <Container variant={ContainerVariant.Fluid}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
          {destinationCards.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              subtitle={card.subtitle}
              content={card.content}
              link={card.link}
              images={card.images}
            />
          ))}
        </div>
      </Container>
      <Container variant={ContainerVariant.Fluid}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
          {experienceCards.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              link={card.link}
              images={card.images}
              variant={card.variant}
            />
          ))}
        </div>
      </Container>
      <Container variant={ContainerVariant.Fluid}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
          {holidayCards.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              link={card.link}
              images={card.images}
              variant={card.variant}
            />
          ))}
        </div>
      </Container>
      <Container variant={ContainerVariant.Fluid}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
          {propertyCards.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              subtitle={card.subtitle}
              content={card.content}
              link={card.link}
              images={card.images}
              variant={card.variant}
            />
          ))}
        </div>
      </Container>
      <Container variant={ContainerVariant.Fluid}>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4">
          {articleCards.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              content={card.content}
              link={card.link}
              images={card.images}
              variant={card.variant}
            />
          ))}
        </div>
      </Container>
      <Container variant={ContainerVariant.Fluid}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          {propertyDetailCards.map(
            (
              {
                id,
                title,
                subtitle,
                content,
                features,
                images,
                price,
                link,
                rating_average,
                rating_count,
              },
              index
            ) => (
              <PropertyCard
                key={index}
                id={id}
                variant={CardVariant.PropertyListItem}
                title={title}
                subtitle={subtitle}
                content={content}
                link={link}
                features={features}
                images={images}
                price={price}
                rating_average={rating_average}
                rating_count={rating_count}
              />
            )
          )}
        </div>
      </Container>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-4">
          {guideCards.map((card, index) => (
            <Card
              key={index}
              images={card.images}
              title={card.title}
              content={card.content}
              link={card.link}
              variant={card.variant}
            />
          ))}
        </div>
      </Container>
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4">
          {communityCards.map((card, index) => (
            <Card
              key={index}
              images={card.images}
              title={card.title}
              link={card.link}
              variant={card.variant}
            />
          ))}
        </div>
      </Container>

      <Title>Specialist Cards</Title>
      <Container>
        <div className="grid grid-cols-3 gap-4">
          {specialistCards.map((card, index) => (
            <Card
              key={index}
              images={card.images}
              title={card.title}
              content={card.content}
              link={card.link}
              variant={card.variant}
            />
          ))}
        </div>
      </Container>

      <Title>Experiences Cards</Title>
      <Container>
        <div className="grid grid-cols-4 gap-4 py-4">
          {experiencesCards.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              content={card.content}
              images={card.images}
              variant={card.variant}
            />
          ))}
        </div>
      </Container>
      <Container>
        <div className="grid grid-cols-4 gap-4 py-4">
          {teamCards.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              content={card.content}
              images={card.images}
              variant={card.variant}
            />
          ))}
        </div>
      </Container>
      <IntroBlock
        subtitle="Subtitle"
        variant={IntroBlockVariants.TEXT_CENTER}
        cta={{ label: 'Label', url: '#' }}
        description="Description"
      ></IntroBlock>
      <IntroBlock
        subtitle="Subtitle"
        variant={IntroBlockVariants.TEXT_LEFT}
      ></IntroBlock>
      <IntroBlock
        subtitle="Subtitle"
        variant={IntroBlockVariants.TEXT_CENTER_GRAY_BG}
      ></IntroBlock>
      <IntroBlock
        title="Premium Services to elevate your Travel Experience"
        description="Our carefully selected villas in the world's most renowned destinations offer more than just a stay; they promise a unique experience, tailored precisely to your preferences."
        variant={IntroBlockVariants.FLEXCONTENT}
      ></IntroBlock>

      <Title>ServicesSlider</Title>
      <ServicesSlider />

      <Title>Services Cards</Title>
      <Container variant={ContainerVariant.Fluid}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
          {servicesCards.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              content={card.content}
              images={card.images}
              variant={CardVariant.Services}
              linkText={card.label}
            />
          ))}
        </div>
        <Container
          variant={ContainerVariant.Fluid}
          extraClasses="pb-20 bg-quaternary"
        >
          <IntroBlock title="Guest Testimonials" />
          <TestimonialsSlider />
        </Container>
      </Container>

      <Title>Contact</Title>
      <Contact />

      <Title>JourneySlider</Title>
      <JourneySlider slides={journeyItem} />
    </main>
  );
}
