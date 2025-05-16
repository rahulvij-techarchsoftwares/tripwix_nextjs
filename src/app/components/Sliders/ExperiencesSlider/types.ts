import { CardVariant } from '~/components/Card';

export interface ExperiencesSliderProps {
  slides: {
    title: string;
    link: string;
    images: { id: number; src: string }[];
    variant: CardVariant;
    id: number;
  }[];
}
