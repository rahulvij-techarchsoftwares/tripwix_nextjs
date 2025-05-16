export interface PaginationProps {
  currentPage: number;
  totalArticles: number;
  onPaginationChange?: (page: number) => void;
}
