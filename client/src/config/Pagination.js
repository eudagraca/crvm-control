import React from "react";
export default function Pagination({ totalPages, currentPage, onPageChange }) {
    const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  return (
    <ul className="uk-flex uk-flex-middle uk-margin-remove">
      {pageNumbers.map((page) => (
        <div className="uk-padding-small" key={page}>
          <button
            className="uk-button uk-button-small uk-button-primary"
            onClick={() => onPageChange(page)}
            disabled={page === currentPage}
          >
            {page}
          </button>
        </div>
      ))}
    </ul>
  );
}
