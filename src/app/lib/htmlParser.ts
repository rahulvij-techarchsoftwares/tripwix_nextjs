export const HtmlParserFn = (str: string | undefined): string => {
  if (!str) return '';
  return str.replace(/<\/?[^>]+(>|$)/g, '');
};
