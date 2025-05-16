export interface FullWidthSliderProps {
  extraClasses?: string;
  slidesWithContent?: {
    id: number;
    src: string;
    subtitle?: string;
    title?: string;
    description?: string;
    buttonLabel?: string;
    buttonUrl?: string;
  }[];
  slides?: {
    id: number;
    src: string;
  }[];
}
