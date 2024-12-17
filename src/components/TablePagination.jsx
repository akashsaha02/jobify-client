// TablePagination.jsx
import React from 'react';

const TablePagination = ({ table }) => {
  return (
    <div className="flex justify-center items-center gap-2 mt-4">
      <button
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
        className="btn btn-sm"
      >
        « Prev
      </button>
      <span>
        Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
      </span>
      <button
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
        className="btn btn-sm"
      >
        Next »
      </button>
    </div>
  );
};

export default TablePagination;
