import React from "react";
import usePagination from "../hooks/usePagination";
import "./PaginationDemo.css";

const PaginationDemo: React.FC = () => {
  const items = Array.from({ length: 100 }, (_, index) => `Item ${index + 1}`);

  const {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    itemsOnCurrentPage,
    nextPage,
    prevPage,
    setPage,
    canNextPage,
    canPrevPage,
  } = usePagination({
    totalItems: items.length,
    itemsPerPage: 10,
    initialPage: 1,
  });

  const currentItems = items.slice(startIndex, endIndex + 1);

  return (
    <div className="pagination-container">
      <h1>Pagination Demo</h1>

      <div className="pagination-info">
        <p>
          Page <strong>{currentPage}</strong> of{" "}
          <strong>{totalPages}</strong>
        </p>

        <p>
          Showing {itemsOnCurrentPage} items
        </p>
      </div>

      <ul className="item-list">
        {currentItems.map((item) => (
          <li key={item} className="item">
            {item}
          </li>
        ))}
      </ul>

      <div className="button-group">
        <button onClick={prevPage} disabled={!canPrevPage}>
          Previous
        </button>

        <button onClick={nextPage} disabled={!canNextPage}>
          Next
        </button>
      </div>

      <div className="page-buttons">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setPage(index + 1)}
            className={
              currentPage === index + 1 ? "active-page" : ""
            }
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PaginationDemo;