import { ImageProps, PhotosAPI } from '~/types';

export const parseApiImages = (Photos: PhotosAPI[]): ImageProps[] => {
  return Photos.map((photo, index) => ({
    id: index,
    src: photo.image || 'preloader-image',
  }));
};
