import axios from 'axios';
import { getSession } from 'next-auth/react';

const baseURL = process.env.API_HOST;

const ApiClient = () => {
  const defaultOptions = {
    baseURL,
  };

  const instance = axios.create(defaultOptions);

  instance.interceptors.request.use(async request => {
    const session = (await getSession()) as { user: { access?: string } };
    if (session?.user?.access) {
      request.headers.Authorization = `Bearer ${session.user.access}`;
    }
    return request;
  });

  instance.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      console.error('API Error:', error);
      return Promise.reject(error); // Forward error to the caller
    }
  );

  return instance;
};

export default ApiClient();
