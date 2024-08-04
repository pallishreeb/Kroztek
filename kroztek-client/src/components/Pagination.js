import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center mt-4">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 mx-1 border rounded ${currentPage === page ? "bg-blue-500 text-white" : "bg-white text-blue-500"}`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
