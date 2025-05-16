import { SlideApiProps } from '~/components/Sliders/types';

export const parseSlidesToOurJourneySlider = (slides: {
  value: { slides: SlideApiProps[] };
}) => {
  if (!slides) {
    return [];
  }
  return slides.value.slides.map((slide, index) => ({
    id: index,
    image: slide.image,
    title: slide.title,
    description: slide.description,
  }));
};
