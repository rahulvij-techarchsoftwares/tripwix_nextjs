'use client';
import './styles.css';

import React, { useState } from 'react';

import { Button, ButtonVariants } from '~/components/CTA';
import { CustomIcon, CustomIconVariant } from '~/components/CustomIcon';
import { Gallery } from '~/components/Gallery';

import { DialogGalleryProps } from './types';

export const DialogGallery: React.FC<DialogGalleryProps> = ({ images }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.classList.add('body-lock-scroll');
  };
  const closeModal = () => {
    setIsModalOpen(false);
    document.body.classList.remove('body-lock-scroll');
  };

  return (
    <>
      <div className="relative">
        <div className="relative w-[90%] m-auto max-w-[1300px] -translate-y-full z-10 bottom-2 text-center md:text-right overflow-visible">
          <div className="absolute w-full h-0 -mt-28">
            <Button
              variant={ButtonVariants.WhiteTransparent}
              onClick={() => openModal()}
              extraClasses="group"
            >
              <CustomIcon
                icon={CustomIconVariant.PhotoFrame}
                height={16}
                className="group-hover:filter-white"
              />
              <span>View All Photos</span>
            </Button>
          </div>
        </div>
      </div>
      {isModalOpen ? (
        <div className="fixed top-0 left-0 z-50 h-screen w-screen flex items-center justify-center max-h-screen overflow-auto">
          <div
            className="fixed top-0 left-0 z-10 bg-primary h-screen w-full"
            onClick={closeModal}
          ></div>
          <div className="flex flex-col relative z-20 w-full md:w-[90%] max-w-[1300px] max-h-[90%] overflow-scroll">
            <button className="relative py-2">
              <CustomIcon
                icon={CustomIconVariant.Close}
                height={30}
                onClick={() => closeModal()}
                className="filter-white float-right"
              />
            </button>
            <Gallery
              slides={images.map((image, index) => {
                return { id: index, image: image.src };
              })}
            />
          </div>
        </div>
      ) : null}
    </>
  );
};
