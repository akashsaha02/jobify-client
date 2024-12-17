// JobTable.jsx
import React from 'react';
import { flexRender } from '@tanstack/react-table';
import JobActions from './JobActions';
import TablePagination from './TablePagination';

const JobTable = ({ table, handleEdit, handleDelete }) => {
  return (
    <div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-gray-100">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="border border-gray-200 px-4 py-2 text-left"
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id} className="border border-gray-200 px-4 py-2">
                      {cell.column.id === 'actions' ? (
                        <JobActions
                          onEdit={() => handleEdit(row.original)}
                          onDelete={() => handleDelete(row.original._id)}
                        />
                      ) : (
                        flexRender(cell.column.columnDef.cell, cell.getContext())
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <TablePagination table={table} />
    </div>
  );
};

export default JobTable;
