import React from 'react';

export enum CustomIconVariant {
  X = 'x',
  Facebook = 'facebook',
  Tiktok = 'tiktok',
  Instagram = 'instagram',
  Pinterest = 'pinterest',
  Linkedin = 'linkedin',
  Youtube = 'youtube',
  NextArrow = 'nextArrow',
  PrevArrow = 'prevArrow',
  Guest = 'guest',
  Bedroom = 'bedroom',
  Bathroom = 'bathroom',
  Star = 'star',
  Favorite = 'favorite',
  FavoriteFilled = 'favoriteFilled',
  Filter = 'filter',
  Map = 'map',
  List = 'list',
  Close = 'close',
  CloseColored = 'closeColored',
  QualitiesBadge = 'qualities-badge',
  QualitiesWifi = 'qualities-wifi',
  QualitiesFavorite = 'qualities-favorite',
  PhotoFrame = 'photo-frame',
  Hearts = 'Hearts',
  Account = 'Account',
  ArrowDown = 'ArrowDown',
  ArrowDownWhite = 'ArrowDownWhite',
  Tick = 'Tick',
  CheckIn = 'CheckIn',
  CheckOut = 'CheckOut',
}

export interface CustomIconProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  width?: number;
  height: number;
  icon: CustomIconVariant;
}
