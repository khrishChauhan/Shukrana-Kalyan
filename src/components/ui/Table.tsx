import React from 'react';

export function Table({ className = '', children, ...props }: React.TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="w-full overflow-x-auto border border-gray-200 rounded-xl bg-white shadow-sm">
      <table className={`w-full text-left text-sm text-gray-600 ${className}`} {...props}>
        {children}
      </table>
    </div>
  );
}

export function TableHeader({ className = '', children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead className={`bg-gray-50 text-xs uppercase text-gray-500 font-bold tracking-wider border-b border-gray-200 ${className}`} {...props}>
      {children}
    </thead>
  );
}

export function TableBody({ className = '', children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody className={`divide-y divide-gray-100 ${className}`} {...props}>
      {children}
    </tbody>
  );
}

export function TableRow({ className = '', children, ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr className={`hover:bg-gray-50/50 transition-colors ${className}`} {...props}>
      {children}
    </tr>
  );
}

export function TableHead({ className = '', children, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th className={`px-6 py-4 whitespace-nowrap ${className}`} {...props}>
      {children}
    </th>
  );
}

export function TableCell({ className = '', children, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td className={`px-6 py-4 whitespace-nowrap ${className}`} {...props}>
      {children}
    </td>
  );
}
