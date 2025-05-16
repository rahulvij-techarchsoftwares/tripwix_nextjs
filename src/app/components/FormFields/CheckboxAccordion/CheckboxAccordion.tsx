'use client';

import './styles.css';

import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

import { ASSET_PATHS } from '~/configs/assetPaths';

import { CheckboxAccordionProps } from './types';

export const CheckboxAccordion: React.FC<CheckboxAccordionProps> = ({
  title,
  checked = false,
  children,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const childrenRef = useRef<HTMLDivElement | null>(null);
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

  return (
    <div className="checkbox-accordion-faq">
      <div className="flex flex-row items-center justify-start gap-2">
        <button
          type="button"
          className={`transition-colors hover:border-success h-4 min-w-4 w-4 border border-tertiary-10 inline-flex justify-center items-center ${checked ? 'bg-success border-success' : ''}`}
          onClick={() => {
            onChange();
          }}
        >
          <Image src={ASSET_PATHS.CHECK} width={9} height={9} alt="check" />
        </button>
        <button
          type="button"
          onClick={() => {
            toggleAccordion();
          }}
          className="checkbox-accordion-title"
        >
          <span>{title}</span>
          <Image
            className={`transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
            height={16}
            width={16}
            src={ASSET_PATHS.CHEVRON_DOWN_DARK}
            alt=""
          />
        </button>
      </div>
      <div
        ref={contentRef}
        className={`checkbox-accordion-content`}
        style={{
          maxHeight: isOpen ? `${height}px` : '0',
        }}
      >
        <div ref={childrenRef} className="checkbox-accordion-content-inner">
          {children}
        </div>
      </div>
    </div>
  );
};
