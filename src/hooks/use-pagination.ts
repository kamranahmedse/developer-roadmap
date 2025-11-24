import { useMemo } from 'react';

export function usePagination(
  currentPage: number,
  totalPages: number,
  maxPagesToShow: number,
) {
  return useMemo(() => {
    const pages: Array<number | string> = [];
    const half = Math.floor(maxPagesToShow / 2);
    const start = Math.max(1, currentPage - half);
    const end = Math.min(totalPages, currentPage + half);

    if (start > 1) {
      pages.push(1);
    }

    if (start > 2) {
      pages.push('more');
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) {
      pages.push('more');
    }

    if (end < totalPages) {
      pages.push(totalPages);
    }

    return pages;
  }, [currentPage, totalPages, maxPagesToShow]);
}
