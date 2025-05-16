'use client';

import './styles.css';

import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

import { ASSET_PATHS } from '~/configs/assetPaths';

import { AccordionProps, AccordionVariants } from './types';

export const Accordion: React.FC<AccordionProps> = ({
  title,
  isChecked,
  children,
  variant = AccordionVariants.FAQ,
  extraInfo,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const childrenRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const updateHeight = () => {
      setHeight(
        (contentRef.current?.scrollHeight || 0) +
          (childrenRef.current?.scrollHeight || 0)
      );
    };

    const resizeObserver = new ResizeObserver(() => {
      updateHeight();
    });

    const currentChildrenRef = childrenRef.current;

    if (currentChildrenRef) {
      resizeObserver.observe(currentChildrenRef);
    }

    return () => {
      if (currentChildrenRef) {
        resizeObserver.unobserve(currentChildrenRef);
      }
    };
  }, [isOpen]);

  const wrapperClass = (variant: AccordionVariants) => {
    switch (variant) {
      case AccordionVariants.FAQ:
        return 'accordion-faq';
      case AccordionVariants.Footer:
        return 'accordion-footer';
      default:
        return '';
    }
  };

  const renderButtonContent = () => {
    switch (variant) {
      case AccordionVariants.Menu:
        return (
          <>
            <span className="font-semibold md:font-bold text-md md:text-xl">
              {title}{' '}
              {extraInfo && (
                <span className="text-success md:hidden">{extraInfo}</span>
              )}
            </span>
            <Image
              className={`${isOpen ? 'hidden' : ''}`}
              height={10}
              width={10}
              src={ASSET_PATHS.PLUS}
              alt=""
            />
            <Image
              className={`${!isOpen ? 'hidden' : ''}`}
              height={10}
              width={10}
              src={ASSET_PATHS.MINUS}
              alt=""
            />
          </>
        );
      case AccordionVariants.Submenu:
        return (
          <>
            <span>{title}</span>
            <Image
              className={`transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
              height={16}
              width={16}
              src={ASSET_PATHS.CHEVRON_DOWN_DARK}
              alt=""
            />
          </>
        );
      case AccordionVariants.Featured:
        return (
          <>
            <h3 className="text-quaternary-100">{title}</h3>
            <Image
              className={`transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
              height={16}
              width={16}
              src={ASSET_PATHS.CHEVRON_DOWN_GOLD}
              alt=""
            />
          </>
        );
      case AccordionVariants.Footer:
        return (
          <>
            <div className="text-white text-sm py-2">{title}</div>
            <Image
              className={`transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
              height={16}
              width={16}
              src={ASSET_PATHS.CHEVRON_DOWN_WHITE}
              alt=""
            />
          </>
        );
      case AccordionVariants.FAQ:
      default:
        return (
          <>
            <h3 className="h5 !text-quaternary-100 !pb-0 !text-md">{title}</h3>
            <Image
              className={`transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
              height={16}
              width={16}
              src={ASSET_PATHS.CHEVRON_DOWN_GOLD}
              alt=""
            />
          </>
        );
    }
  };

  return (
    <div className={wrapperClass(variant)}>
      <button
        type="button"
        onClick={toggleAccordion}
        className="accordion-title"
      >
        {renderButtonContent()}
      </button>
      <div
        ref={contentRef}
        className={`accordion-content`}
        style={{
          maxHeight: isOpen ? `${height}px` : '0',
        }}
      >
        <div ref={childrenRef} className="accordion-content-inner">
          {children}
        </div>
      </div>
    </div>
  );
};
