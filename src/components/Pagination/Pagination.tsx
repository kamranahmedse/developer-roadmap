import { usePagination } from '../../hooks/use-pagination.ts';
import { MoreHorizontal } from 'lucide-react';
import { cn } from '../../lib/classname.ts';
import { formatCommaNumber } from '../../lib/number.ts';

type PaginationProps = {
  variant?: 'minimal' | 'default';
  totalPages: number;
  currPage: number;
  perPage: number;
  totalCount: number;
  isDisabled?: boolean;
  onPageChange: (page: number) => void;
};

export function Pagination(props: PaginationProps) {
  const {
    variant = 'default',
    onPageChange,
    totalCount,
    totalPages,
    currPage,
    perPage,
    isDisabled = false,
  } = props;

  if (!totalPages || totalPages === 1) {
    return null;
  }

  const pages = usePagination(currPage, totalPages, 5);

  return (
    <div
      className={cn('flex items-center', {
        'justify-between': variant === 'default',
        'justify-start': variant === 'minimal',
      })}
    >
      <div className="flex items-center gap-1 text-xs font-medium">
        <button
          onClick={() => {
            onPageChange(currPage - 1);
          }}
          disabled={currPage === 1 || isDisabled}
          className="rounded-md border px-2 py-1 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          &larr;
        </button>
        {variant === 'default' && (
          <>
            {pages.map((page) => {
              if (page === 'more') {
                return (
                  <span>
                    <MoreHorizontal className="text-gray-400" size={14} />
                  </span>
                );
              }

              return (
                <button
                  disabled={isDisabled}
                  onClick={() => {
                    onPageChange(page as number);
                  }}
                  className={cn(
                    'rounded-md border px-2 py-1 hover:bg-gray-100',
                    {
                      'border-black text-black': currPage === page,
                    },
                  )}
                  key={page}
                >
                  {page}
                </button>
              );
            })}
          </>
        )}
        <button
          disabled={currPage === totalPages || isDisabled}
          className="rounded-md border px-2 py-1 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
          onClick={() => {
            onPageChange(currPage + 1);
          }}
        >
          &rarr;
        </button>
      </div>
      <span className="ml-2 text-sm font-normal text-gray-500">
        Showing {formatCommaNumber((currPage - 1) * perPage)} to{' '}
        {formatCommaNumber((currPage - 1) * perPage + perPage)} of{' '}
        {formatCommaNumber(totalCount)} entries
      </span>
    </div>
  );
}
