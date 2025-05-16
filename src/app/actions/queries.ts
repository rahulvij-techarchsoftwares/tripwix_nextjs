import apiEndpoints from '~/lib/@apiEndpoints';
import axiosInstance from '~/lib/axios';
import { PropertyPropsAPI } from '~/types';
import { User, WishlistData } from '~/types/globalTypes';

export const fetchWishlistData = async () => {
  const { data } = await axiosInstance.get(
    `${process.env.API_HOST}${apiEndpoints.WISHLIST.LIST}`
  );
  return data as WishlistData;
};

export const getUserData = async (): Promise<User> => {
  const { data } = await axiosInstance.get(
    `${process.env.API_HOST}${apiEndpoints.AUTH.GETUSER}`
  );
  return data;
};

export const getSpecialOffers = async () => {
  const { data } = await axiosInstance.get(
    `${process.env.API_HOST}${apiEndpoints.PROPERTIES.LIST}?special_offer=true`
  );
  return data as { results: PropertyPropsAPI[] };
};
