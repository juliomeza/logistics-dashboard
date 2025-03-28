import React from 'react';

interface ColumnDefinition<T> {
  key: keyof T | string; // Allow string keys for computed columns
  header: string;
  render?: (item: T) => React.ReactNode; // Custom render function
  className?: string; // Optional class for cell styling
  headerClassName?: string; // Optional class for header styling
}

interface DataTableProps<T> {
  data: T[];
  columns: ColumnDefinition<T>[];
  keyExtractor: (item: T) => string | number;
  title?: string;
}

function DataTable<T>({ data, columns, keyExtractor, title }: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto">
        {title && <h4 className="text-md font-semibold mb-2 text-gray-700 dark:text-gray-300">{title}</h4>}
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                scope="col"
                className={`px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider ${col.headerClassName || ''}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {data.map((item) => (
            <tr key={keyExtractor(item)} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              {columns.map((col) => (
                <td
                  key={`${keyExtractor(item)}-${String(col.key)}`}
                  className={`px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300 ${col.className || ''}`}
                >
                  {col.render ? col.render(item) : String(item[col.key as keyof T] ?? '')}
                </td>
              ))}
            </tr>
          ))}
           {data.length === 0 && (
              <tr>
                  <td colSpan={columns.length} className="text-center py-4 text-gray-500 dark:text-gray-400">
                      No data available.
                  </td>
              </tr>
           )}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;