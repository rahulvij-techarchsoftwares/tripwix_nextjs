import { TitleVariants } from '~/components/Title';
import { MarginVariants } from '~/types';

export interface DestinationCommunitiesProps {
  destinationId: string;
}

export interface CreateDestinationCommunitiesProps {
  id: { value: string };
  destination_id: { value: string };
  title: { value: string };
  title_variant: { value: { slug: TitleVariants } };
  disable_block: { value: boolean };
  margin_top?: { value: { slug: MarginVariants } };
}
