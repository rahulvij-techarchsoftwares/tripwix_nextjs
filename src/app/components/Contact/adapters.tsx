import Image from 'next/image';
import React from 'react';

import { ContactForm } from '~/components/Contact/ContactForm';
import {
  ContactFormProps,
  CreateContactFormProps,
} from '~/components/Contact/types';
import { Container, ContainerVariant } from '~/components/Container';
import { MarginTop, MarginVariants } from '~/types';

export const createContactForm = ({
  title = { value: '' },
  description = { value: '' },
  bg_image = { value: { image: '/assets/contact_form_bg.png' } },
  margin_top = { value: { slug: MarginVariants.MD } },
}: CreateContactFormProps): React.ReactElement<ContactFormProps> => (
  <>
    <div
      className={`flex flex-row items-center justify-center relative py-24 ${MarginTop[margin_top?.value?.slug]}`}
    >
      <Image
        className="block w-full absolute left-0 z-10 top-0 object-cover"
        fill={true}
        src={'/assets/contact_form_bg.png'}
        alt="contact form"
      />
      <Container extraClasses="relative z-20" variant={ContainerVariant.Fluid}>
        <div className="bg-white py-3 md:py-16 md:px-10 rounded-2xl m-auto max-w-[95%] md:max-w-[750px]">
          <ContactForm title={title.value} description={description.value} />
        </div>
      </Container>
    </div>
  </>
);
