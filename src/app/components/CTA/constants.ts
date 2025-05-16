const articlePagination = 'h-10 w-10 mx-1 rounded-lg font-bold';
const arrowPagination =
  'inline-flex flex-row items-center justify-center h-10 w-10 mx-1 rounded-lg font-bold';

export const buttonStyles = {
  articlePagination: `${articlePagination} border border-primary`,
  articlePaginationActive: `${articlePagination} bg-success text-white`,
  articleNext: `${arrowPagination} border border-primary`,
  articlePrev: `${arrowPagination} border border-primary`,
};
