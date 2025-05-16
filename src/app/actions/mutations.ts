import { TClientAreaSchema } from '~/components/AccountDashboard/types';
import { RegisterFormSchema } from '~/components/RegisterForm/formSchema';
import apiEndpoints from '~/lib/@apiEndpoints';
import axiosInstance from '~/lib/axios';

export const pushPropertyToWishlist = async (propertyId: string) => {
  const { data } = await axiosInstance.post(
    `${process.env.API_HOST}${apiEndpoints.WISHLIST.ADD}`,
    { property_id: propertyId }
  );
  return data;
};

export const removePropertyFromWishlist = async (wishlistId: number) => {
  const { data } = await axiosInstance.delete(
    `${process.env.API_HOST}${apiEndpoints.WISHLIST.REMOVE(wishlistId)}`
  );
  return data;
};

export const pushUpdateUserData = async (data: TClientAreaSchema) => {
  await axiosInstance.patch(
    `${process.env.API_HOST}${apiEndpoints.AUTH.UPDATE_USER}`,
    data
  );
  return data;
};

export const signupUser = async (data: RegisterFormSchema) => {
  await axiosInstance.post(
    `${process.env.API_HOST}${apiEndpoints.AUTH.SIGNUP}`,
    data
  );
  return data;
};
