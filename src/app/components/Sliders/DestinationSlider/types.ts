interface SlideProps {
  title: string;
  subtitle: string;
  content: string;
  link: string;
  images: { id: number; src: string }[];
}

export interface DestinationSliderProps {
  slides: SlideProps[];
}
