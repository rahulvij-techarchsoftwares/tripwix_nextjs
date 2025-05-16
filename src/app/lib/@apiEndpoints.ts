const apiEndpoints = {
  PAGES: {
    LIST: '/pages/',
    READ_SLUG: (slug: string) => `/pages/slug/${slug}/`,
  },
  FILTERS: {
    LIST: '/properties/filters/',
  },
  PROPERTIES: {
    LIST: '/properties/',
    READ_SLUG: (slug: string) => `/properties/slug/${slug}/`,
    READ_ID: (id: string | number) => `/properties/${id}/`,
  },
  EXPERIENCES: {
    LIST: '/experiences/',
    READ_ID: (id: string) => `/experiences/${id}/`,
  },
  POST_CONTACT_FORM: {
    POST: '/leads',
  },
  POST_INQUIRY_FORM: {
    POST: '/inquires',
  },
  INSTANT_BOOKING: {
    READ_SLUG: (slug: string) =>
      `/properties/slug/${slug}/fees_and_availability/`,
  },
  ARTICLES: {
    LIST: '/blog/articles/',
    ID: (id: string) => `/blog/articles/${id}/`,
    SLUG: (slug: string) => `/blog/articles/slug/${slug}/`,
  },
  AUTH: {
    SIGNUP: '/users/signup/',
    FORGOT_PASSWORD: '/password-reset/',
    RESET_PASSWORD: '/password/validate/',
    GETUSER: '/users/me/',
    UPDATE_USER: '/users/me/',
  },
  WISHLIST: {
    LIST: '/wishlist/',
    ADD: `/wishlist/`,
    REMOVE: (id: number) => `/wishlist/${id}/`,
  },
  SUBSCRIBE_NEWSLETTER: '/create-person/',
};

export default apiEndpoints;
