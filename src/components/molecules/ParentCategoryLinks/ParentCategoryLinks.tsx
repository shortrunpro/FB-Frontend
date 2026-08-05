'use client';

import { useMemo } from 'react';

import { HttpTypes } from '@medusajs/types';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { getActiveParentHandle } from '@/lib/helpers/category-utils';
import { cn } from '@/lib/utils';

interface ParentCategoryLinksProps {
  parentCategories: HttpTypes.StoreProductCategory[];
  categories: HttpTypes.StoreProductCategory[];
}

export const ParentCategoryLinks = ({ parentCategories, categories }: ParentCategoryLinksProps) => {
  const { category } = useParams<{ category?: string }>();

  const activeParentHandle = useMemo(
    () => getActiveParentHandle(category, categories, parentCategories),
    [category, categories, parentCategories]
  );

  return (
    <nav
      className="hidden items-center gap-4 lg:flex"
      aria-label="Parent categories"
    >
      {parentCategories.map(({ id, handle, name }) => {
        const isActive = handle === activeParentHandle;

        return (
          <Link
            key={id}
            href={`/categories/${handle}`}
            className={cn(
              'label-large pb-2 font-semibold uppercase text-primary transition-opacity hover:opacity-80',
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
