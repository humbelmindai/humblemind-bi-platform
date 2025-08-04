import React from 'react';
import { cn } from '@/lib/utils';
import { TableColumn } from '@/types';

export interface TableProps<T = any> {
  data: T[];
  columns: TableColumn<T>[];
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
  onRowClick?: (row: T) => void;
  selectedRows?: string[];
  onSelectRow?: (id: string) => void;
  onSelectAll?: (selectAll: boolean) => void;
}

function Table<T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  emptyMessage = 'No data available',
  className,
  onRowClick,
  selectedRows = [],
  onSelectRow,
  onSelectAll,
}: TableProps<T>) {
  const hasSelection = onSelectRow && onSelectAll;
  const allSelected = hasSelection && data.length > 0 && selectedRows.length === data.length;
  const someSelected = hasSelection && selectedRows.length > 0 && selectedRows.length < data.length;

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-8 text-center">
          <div className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full" />
          <p className="mt-2 text-sm text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-8 text-center">
          <p className="text-gray-500">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden', className)}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {hasSelection && (
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={allSelected}
                    ref={(input) => {
                      if (input) input.indeterminate = someSelected;
                    }}
                    onChange={(e) => onSelectAll(e.target.checked)}
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  style={{ width: column.width }}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, index) => {
              const rowId = row.id || index.toString();
              const isSelected = selectedRows.includes(rowId);
              
              return (
                <tr
                  key={rowId}
                  className={cn(
                    'hover:bg-gray-50 transition-colors',
                    onRowClick && 'cursor-pointer',
                    isSelected && 'bg-blue-50'
                  )}
                  onClick={() => onRowClick?.(row)}
                >
                  {hasSelection && (
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        checked={isSelected}
                        onChange={(e) => {
                          e.stopPropagation();
                          onSelectRow(rowId);
                        }}
                      />
                    </td>
                  )}
                  {columns.map((column) => {
                    const value = row[column.key];
                    const cellContent = column.render ? column.render(value, row) : value;
                    
                    return (
                      <td key={String(column.key)} className="px-6 py-4 whitespace-nowrap">
                        {column.type === 'number' ? (
                          <span className="text-sm font-medium text-gray-900">
                            {typeof value === 'number' ? value.toLocaleString() : value}
                          </span>
                        ) : column.type === 'date' ? (
                          <span className="text-sm text-gray-900">
                            {value ? new Date(value).toLocaleDateString() : '-'}
                          </span>
                        ) : column.type === 'status' ? (
                          <span className={cn(
                            'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                            {
                              'bg-green-100 text-green-800': value === 'active' || value === 'success' || value === 'completed',
                              'bg-yellow-100 text-yellow-800': value === 'pending' || value === 'warning',
                              'bg-red-100 text-red-800': value === 'inactive' || value === 'error' || value === 'failed',
                              'bg-gray-100 text-gray-800': !['active', 'success', 'completed', 'pending', 'warning', 'inactive', 'error', 'failed'].includes(value),
                            }
                          )}>
                            {value}
                          </span>
                        ) : (
                          <div className="text-sm text-gray-900">
                            {cellContent}
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;