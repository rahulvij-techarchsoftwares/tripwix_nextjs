import { createAdvantagesBlock } from '~/components/Advantages/adapters';
import { createBanner } from '~/components/Banner/adapters';
import { createContactForm } from '~/components/Contact/adapters';
import { createDestinationCommunitiesBlock } from '~/components/DestinationCommunities/adapters';
import { createBannerQualities } from '~/components/DestinationQualities/adapters';
import { createExperiences } from '~/components/Experiences/adapters';
import { createExtraServicesBlock } from '~/components/ExtraServices/adapters';
import { createFAQsBlock } from '~/components/Faq/adapters';
import { createInlineTitleWithButton } from '~/components/InlineTitleWithButton/adapters';
import { createIntroBlock } from '~/components/IntroBlock/adapters';
import { createPicLeftBlock } from '~/components/PicLeft/adapters';
import { createPropertyMapComponent } from '~/components/PropertyMap/adapters';
import { createSectionSeparator } from '~/components/SectionSeparator/adapters';
import { createSellingPointsBlock } from '~/components/SellingPoints/adapters';
import {
  createSlideshowBlock,
  createSpecialOffersSlideshow,
  createTextBlockAndSlideshow,
} from '~/components/Sliders/adapters';
import { createJourneyBlock } from '~/components/Sliders/JourneySlider/adapters';
import { createTestimonialsSliderBlock } from '~/components/Sliders/TestimonialsSlider/adapters';
import { createTextWith3BlockImages } from '~/components/TextWith3BlockImages/adapters';
import { EditablePageComponentSlugs } from '~/lib/renderEditablePageBlocks/types';

export const AdaptersManager: Record<string, Function> = {
  [EditablePageComponentSlugs.INTRO_BLOCK]: createIntroBlock,
  [EditablePageComponentSlugs.BANNER]: createBanner,
  [EditablePageComponentSlugs.TEXT_BLOCK_AND_SLIDESHOW]:
    createTextBlockAndSlideshow,
  [EditablePageComponentSlugs.SLIDESHOW_BLOCK]: createSlideshowBlock,
  [EditablePageComponentSlugs.SPECIAL_OFFERS_SLIDESHOW]:
    createSpecialOffersSlideshow,
  [EditablePageComponentSlugs.PIC_LEFT]: createPicLeftBlock,
  [EditablePageComponentSlugs.BANNER_QUALITIES]: createBannerQualities,
  [EditablePageComponentSlugs.EXPERIENCES_LIST]: createExperiences,
  [EditablePageComponentSlugs.CONTACT_FORM]: createContactForm,
  [EditablePageComponentSlugs.SELLING_POINTS]: createSellingPointsBlock,
  [EditablePageComponentSlugs.ADVANTAGES]: createAdvantagesBlock,
  [EditablePageComponentSlugs.JOURNEY_SLIDER]: createJourneyBlock,
  [EditablePageComponentSlugs.EXTRA_SERVICES]: createExtraServicesBlock,
  [EditablePageComponentSlugs.TESTIMONIALS]: createTestimonialsSliderBlock,
  [EditablePageComponentSlugs.FAQS]: createFAQsBlock,
  [EditablePageComponentSlugs.TEXT_WITH_3_BLOCK_IMAGES]:
    createTextWith3BlockImages,
  [EditablePageComponentSlugs.INLINE_TITLE_WITH_BUTTON]:
    createInlineTitleWithButton,
  [EditablePageComponentSlugs.PROPERTY_MAP]: createPropertyMapComponent,
  [EditablePageComponentSlugs.DESTINATION_COMMUNITIES]:
    createDestinationCommunitiesBlock,
  [EditablePageComponentSlugs.SECTION_SEPARATOR]: createSectionSeparator,
};
