import { SlideApiProps } from '~/components/Sliders/types';
import { TitleVariants } from '~/components/Title';
import { MarginVariants } from '~/types';

export interface ExtraServicesProps {
  title: string;
  titleVariant?: TitleVariants;
  services: ServiceCardProps[];
  marginTop?: MarginVariants;
}

export interface CreateExtraServicesProps {
  title: { value: string };
  title_variant?: { value: TitleVariants };
  services: {
    image: string;
    title: string;
    description: string;
    cta: { label: string; url: string };
  };
  extra_services: {
    value: {
      slides: SlideApiProps[];
    };
  };
  margin_top?: { value: { slug: MarginVariants } };
}

export interface ServiceCardProps {
  image: string;
  title: string;
  description: string;
  cta: { label: string; url: string };
}
