import { VALID_PROPERTY_SEARCH_PARAMETERS } from '~/lib/constants';

export const INVALID_OPTIONS = [
  'null',
  '',
  'NaN',
  null,
  undefined,
  'undefined',
];

const sanitizeUrlParameters = (params: URLSearchParams) => {
  const keys = Array.from(params.keys());
  for (const key of keys) {
    if (!VALID_PROPERTY_SEARCH_PARAMETERS.includes(key)) {
      params.delete(key);
    }
    if (INVALID_OPTIONS.includes(params.get(key))) {
      params.delete(key);
    }
  }
  return params;
};

export const urlParametersHandler = (params: URLSearchParams) => {
  return sanitizeUrlParameters(params).toString();
};

export const propertySearchURL = (params: any) => {
  let result = '';
  Object.keys(params).map((key, index) => {
    params[key].split(',').map((value: string) => {
      if (index === 0 && result.length === 0) {
        result += `?${key}=${value}`;
        return;
      }
      result += `&${key}=${value}`;
    });
  });
  return result;
};
