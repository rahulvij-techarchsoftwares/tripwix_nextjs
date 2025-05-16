'use client';

import Image from 'next/image';
import React from 'react';

import account from '/public/account.svg';
import arrowDown from '/public/arrow-down.svg';
import arrowDownWhite from '/public/assets/arrow-down-white.svg';
import nextArrow from '/public/assets/arrows/nextArrow.svg';
import prevArrow from '/public/assets/arrows/prevArrow.svg';
import checkin from '/public/assets/check-in.svg';
import checkout from '/public/assets/check-out.svg';
import filter from '/public/assets/filter.svg';
import bathroom from '/public/assets/icon-bathroom.svg';
import bedroom from '/public/assets/icon-bedroom.svg';
import guest from '/public/assets/icon-guest.svg';
import close from '/public/close.svg';
import closeColored from '/public/close-colored.svg';
import favorite from '/public/favorite.svg';
import favoriteFilled from '/public/favorite-filled.svg';
import list from '/public/icon-list.svg';
import map from '/public/icon-map.svg';
import qualitiesBadge from '/public/icon-qualities-badge.svg';
import qualitiesFavorite from '/public/icon-qualities-favorite.svg';
import qualitiesWifi from '/public/icon-qualities-wifi.svg';
import tick from '/public/icon-tick.svg';
import photoFrame from '/public/photo-frame.svg';
import facebook from '/public/socialmedias/facebook.svg';
import instagram from '/public/socialmedias/instagram.svg';
import linkedin from '/public/socialmedias/linkedin.svg';
import pinterest from '/public/socialmedias/pinterest.svg';
import tiktok from '/public/socialmedias/tiktok.svg';
import x from '/public/socialmedias/x.svg';
import youtube from '/public/socialmedias/youtube.svg';
import star from '/public/star.svg';

import { CustomIconProps, CustomIconVariant } from './types';

const CustomIconType = {
  [CustomIconVariant.X]: x,
  [CustomIconVariant.Facebook]: facebook,
  [CustomIconVariant.Instagram]: instagram,
  [CustomIconVariant.Tiktok]: tiktok,
  [CustomIconVariant.Pinterest]: pinterest,
  [CustomIconVariant.Linkedin]: linkedin,
  [CustomIconVariant.Youtube]: youtube,
  [CustomIconVariant.NextArrow]: nextArrow,
  [CustomIconVariant.PrevArrow]: prevArrow,
  [CustomIconVariant.Guest]: guest,
  [CustomIconVariant.Bedroom]: bedroom,
  [CustomIconVariant.Bathroom]: bathroom,
  [CustomIconVariant.Star]: star,
  [CustomIconVariant.Favorite]: favorite,
  [CustomIconVariant.FavoriteFilled]: favoriteFilled,
  [CustomIconVariant.Filter]: filter,
  [CustomIconVariant.Map]: map,
  [CustomIconVariant.Close]: close,
  [CustomIconVariant.CloseColored]: closeColored,
  [CustomIconVariant.QualitiesBadge]: qualitiesBadge,
  [CustomIconVariant.QualitiesWifi]: qualitiesWifi,
  [CustomIconVariant.QualitiesFavorite]: qualitiesFavorite,
  [CustomIconVariant.PhotoFrame]: photoFrame,
  [CustomIconVariant.Account]: account,
  [CustomIconVariant.ArrowDown]: arrowDown,
  [CustomIconVariant.ArrowDownWhite]: arrowDownWhite,
  [CustomIconVariant.Hearts]: favorite,
  [CustomIconVariant.List]: list,
  [CustomIconVariant.Tick]: tick,
  [CustomIconVariant.CheckIn]: checkin,
  [CustomIconVariant.CheckOut]: checkout,
};

export const CustomIcon: React.FC<CustomIconProps> = ({
  icon,
  height,
  ...props
}) => {
  const IconComponent = CustomIconType[icon];
  return <Image src={IconComponent} alt={icon} height={height} {...props} />;
};
