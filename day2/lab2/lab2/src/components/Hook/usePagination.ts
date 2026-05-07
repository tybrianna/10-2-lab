import { useMemo, useState } from "react";

interface UsePaginationProps {
  totalItems: number;
  itemsPerPage?: number;
  initialPage?: number;
}

interface UsePaginationReturn {
  currentPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  itemsOnCurrentPage: number;
  setPage: (pageNumber: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  canNextPage: boolean;
  canPrevPage: boolean;
}

const usePagination = ({
  totalItems,
  itemsPerPage = 10,
  initialPage = 1,
}: UsePaginationProps): UsePaginationReturn => {
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  const [currentPage, setCurrentPage] = useState(() => {
    return Math.min(Math.max(initialPage, 1), totalPages);
  });

  const setPage = (pageNumber: number) => {
    const validPage = Math.min(Math.max(pageNumber, 1), totalPages);
    setCurrentPage(validPage);
  };

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const startIndex = useMemo(() => {
    return (currentPage - 1) * itemsPerPage;
  }, [currentPage, itemsPerPage]);

  const endIndex = useMemo(() => {
    return Math.min(startIndex + itemsPerPage - 1, totalItems - 1);
  }, [startIndex, itemsPerPage, totalItems]);

  const itemsOnCurrentPage = useMemo(() => {
    if (totalItems === 0) return 0;
    return endIndex - startIndex + 1;
  }, [startIndex, endIndex, totalItems]);

  const canNextPage = currentPage < totalPages;
  const canPrevPage = currentPage > 1;

  return {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    itemsOnCurrentPage,
    setPage,
    nextPage,
    prevPage,
    canNextPage,
    canPrevPage,
  };
};

export default usePagination;