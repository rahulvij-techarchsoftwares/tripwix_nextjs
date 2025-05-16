'use client';
import React, { useEffect, useState } from 'react';

import { Button, ButtonVariants } from '~/components/CTA';
import { Title, TitleVariants } from '~/components/Title';
import { MarginTop, MarginVariants } from '~/types';

import { ServiceCard } from './ServiceCard';
import { ExtraServicesProps } from './types';

export const ExtraServices: React.FC<ExtraServicesProps> = ({
  title = 'Extra Services',
  titleVariant = TitleVariants.H2,
  services,
  marginTop = MarginVariants.MD,
}) => {
  const [visibleServices, setVisibleServices] = useState(4);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleLoadMore = () => {
    setVisibleServices(prev => prev + 4);
  };

  return (
    <div className={`${MarginTop[marginTop]}`}>
      <div className="flex flex-row items-center justify-center">
        <Title extraClasses="pb-6" titleVariant={titleVariant}>
          {title}
        </Title>
      </div>
      <div className="flex flex-row flex-wrap">
        {services
          .slice(0, isMobile ? visibleServices : services.length)
          .map(service => (
            <ServiceCard
              key={service.image}
              image={service.image}
              title={service.title}
              description={service.description}
              cta={service.cta}
            />
          ))}
      </div>
      <div className="flex justify-center mt-8 mb-10 md:hidden">
        <Button
          type="button"
          onClick={() => {
            handleLoadMore();
          }}
          variant={ButtonVariants.Default}
        >
          Load More
        </Button>
      </div>
    </div>
  );
};
