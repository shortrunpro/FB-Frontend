'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { PaginationButton } from '@/components/atoms';
import { MeatballsMenuIcon } from '@/icons';

export const Pagination = ({
  pages,
  setPage,
  currentPage
}: {
  pages: number;
  setPage: (page: number) => void;
  currentPage: number;
}) => {
  const pathname = usePathname();
  const renderPaginationButtons = () => {
    const buttons = [] as React.ReactNode[];

    if (currentPage > 2) {
      buttons.push(
        <PaginationButton
          key={`gap-left`}
          disabled
          aria-label="More pages"
          data-testid="pagination-ellipsis-left"
        >
          <MeatballsMenuIcon />
        </PaginationButton>
      );
    }

    if (currentPage > 1) {
      buttons.push(
        <Link
          key={`page-${currentPage - 1}`}
          href={`${pathname}?page=${currentPage - 1}`}
        >
          <PaginationButton
            aria-label={`Go to page ${currentPage - 1}`}
            data-testid={`pagination-button-${currentPage - 1}`}
          >
            {currentPage - 1}
          </PaginationButton>
        </Link>
      );
    }

    buttons.push(
      <PaginationButton
        key={`page-${currentPage}`}
        isActive
        aria-label={`Current page, page ${currentPage}`}
        data-testid={`pagination-button-current-${currentPage}`}
      >
        {currentPage}
      </PaginationButton>
    );

    if (currentPage < pages) {
      buttons.push(
        <Link
          key={`page-${currentPage + 1}`}
          href={`${pathname}?page=${currentPage + 1}`}
        >
          <PaginationButton
            key={`page-${currentPage + 1}`}
            aria-label={`Go to page ${currentPage + 1}`}
            data-testid={`pagination-button-${currentPage + 1}`}
          >
            {currentPage + 1}
          </PaginationButton>
        </Link>
      );
    }

    if (currentPage < pages - 1) {
      buttons.push(
        <PaginationButton
          key={`gap-right`}
          disabled
          aria-label="More pages"
          data-testid="pagination-ellipsis-right"
        >
          <MeatballsMenuIcon />
        </PaginationButton>
      );
    }

    return buttons;
  };

  return (
    <div
      className="flex items-center"
      data-testid="pagination"
    >
      {currentPage !== 1 && (
        <Link href={`${pathname}?page=${currentPage - 1}`}>
          <PaginationButton
            disabled={Boolean(currentPage === 1)}
            className="mr-2 border-none"
            aria-label="Previous page"
            data-testid="pagination-previous"
          >
            <span className="">Back</span>
          </PaginationButton>
        </Link>
      )}

      {renderPaginationButtons()}

      {currentPage !== pages && (
        <Link href={`${pathname}?page=${currentPage + 1}`}>
          <PaginationButton
            disabled={Boolean(currentPage === pages)}
            className="ml-2 border-none"
            aria-label="Next page"
            data-testid="pagination-next"
          >
            <span>Next</span>
          </PaginationButton>
        </Link>
      )}
    </div>
  );
};
