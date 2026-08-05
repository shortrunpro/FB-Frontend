'use client';

import { useMemo } from 'react';

import { HttpTypes } from '@medusajs/types';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { getActiveParentHandle } from '@/lib/helpers/category-utils';
import { cn } from '@/lib/utils';

export const HeaderCategoryNavbar = ({
  parentCategories,
  categories,
  onClose
}: {
  parentCategories: HttpTypes.StoreProductCategory[];
  categories: HttpTypes.StoreProductCategory[];
  onClose?: (state: boolean) => void;
}) => {
  const { category } = useParams<{ category?: string }>();

  const activeParentHandle = useMemo(
    () => getActiveParentHandle(category, categories, parentCategories),
    [category, categories, parentCategories]
  );

  return (
    <nav
      className="flex items-center gap-2 overflow-x-auto p-4 scrollbar-hide"
      aria-label="Parent categories"
    >
      {parentCategories?.map(({ id, handle, name }) => {
        const isActive = handle === activeParentHandle;
        return (
          <Link
            key={id}
            href={`/categories/${handle}`}
            onClick={() => (onClose ? onClose(false) : null)}
            className={cn(
              'label-large px-8 py-2 font-semibold uppercase text-primary transition-opacity hover:opacity-80',
              isActive && 'border-b border-primary'
            )}
          >
            {name}
          </Link>
        );
      })}
    </nav>
  );
};
