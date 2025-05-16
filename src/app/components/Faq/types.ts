import { TitleVariants } from '~/components/Title';
import { MarginVariants } from '~/types';

interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqsProps {
  faqs: FaqItem[];
}

export interface CreateFaqsProps {
  title: { value: string };
  title_variant: { value: { slug: TitleVariants.H2 } };
  title_style?: { value: { slug?: TitleVariants.H2 } };
  faqs: { value: { faqs: FaqItem[] } };
  margin_top?: { value: { slug: MarginVariants } };
}
