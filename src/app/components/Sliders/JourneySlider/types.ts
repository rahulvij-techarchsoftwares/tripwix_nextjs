import { SlideApiProps } from '~/components/Sliders/types';

export interface JourneySliderItem {
  id: number;
  image: string;
  title: string;
  description: string;
}

export interface JourneySliderProps {
  slides: JourneySliderItem[];
}

export interface CreateJourneySliderProps {
  title: { value: string };
  description: { value: string };
  our_journey: { value: { slides: SlideApiProps[] } };
}
