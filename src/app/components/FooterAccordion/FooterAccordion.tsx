import Link from 'next/link';
import React from 'react';

import { Accordion, AccordionVariants } from '../Accordion';
import { FooterAccordionProps } from './types';

export const FooterAccordion: React.FC<FooterAccordionProps> = ({
  title,
  menuItems,
  lang,
}) => {
  return (
    <Accordion title={title} variant={AccordionVariants.Footer}>
      {menuItems.map((item, contentIndex) => (
        <div key={contentIndex}>
          <Link
            href={item.href! ? `/${lang}/${item.href}` : '#'}
            className="text-white"
          >
            {item.text}
          </Link>
        </div>
      ))}
    </Accordion>
  );
};
