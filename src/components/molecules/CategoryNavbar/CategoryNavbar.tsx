'use client';

import { useMemo } from 'react';

import { HttpTypes } from '@medusajs/types';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { CollapseIcon } from '@/icons';
import {
  filterCategoriesByParent,
  findParentCategoryHandle,
  getActiveParentHandle
} from '@/lib/helpers/category-utils';
import { cn } from '@/lib/utils';

import { CategoryDropdownMenu } from './components/CategoryDropdownMenu';
import { useCategoryDropdown } from './hooks/useCategoryDropdown';

interface CategoryNavbarProps {
  categories: HttpTypes.StoreProductCategory[];
  parentCategories?: HttpTypes.StoreProductCategory[];
  onClose?: (state: boolean) => void;
}

export const CategoryNavbar = ({
  categories,
  parentCategories = [],
  onClose
}: CategoryNavbarProps) => {
  const { category } = useParams<{ category?: string }>();

  const {
    hoveredCategoryId,
    isDropdownVisible,
    shouldRenderDropdown,
    openDropdown,
    setHoveredCategoryId,
    closeDropdown
  } = useCategoryDropdown();

  const activeParentHandle = useMemo(
    () => getActiveParentHandle(category, categories, parentCategories),
    [category, parentCategories, categories]
  );

  const parentCategoryHandle = useMemo(
    () => findParentCategoryHandle(category, categories),
    [category, categories]
  );

  const filteredCategories = useMemo(
    () => filterCategoriesByParent(activeParentHandle, categories, parentCategories),
    [activeParentHandle, parentCategories, categories]
  );

  const hoveredCategory = useMemo(
    () => filteredCategories.find(cat => cat.id === hoveredCategoryId),
    [filteredCategories, hoveredCategoryId]
  );

  const handleClose = () => {
    onClose?.(false);
    closeDropdown();
  };

  const handleCategoryMouseEnter = (categoryId: string) => {
    const cat = filteredCategories.find(c => c.id === categoryId);
    if (cat?.category_children && cat.category_children.length > 0) {
      openDropdown(categoryId);
    }
  };

  const handleCategoryMouseLeave = () => {
    setHoveredCategoryId(null);
  };

  const handleDropdownMouseEnter = () => {
    if (hoveredCategoryId) {
      setHoveredCategoryId(hoveredCategoryId);
    }
  };

  const handleDropdownMouseLeave = () => {
    setHoveredCategoryId(null);
  };
  return (
    <>
      <nav
        className="flex flex-col gap-2 md:max-w-full md:flex-row md:items-center md:overflow-x-auto md:scrollbar-hide"
        aria-label="Category navigation"
        data-testid="category-navbar"
      >
        <Link
          href="/categories"
          onClick={handleClose}
          className={cn(
            'label-md my-1 flex items-center justify-between px-2 uppercase text-primary md:my-0 md:flex-shrink-0'
          )}
          data-testid="category-link-all-products"
        >
          All Products
        </Link>

        {filteredCategories.map(({ id, handle, name, category_children }) => {
          const categoryUrl = `/categories/${handle}`;
          const isActive = handle === category || handle === parentCategoryHandle;
          const hasChildren = category_children && category_children.length > 0;

          return (
            <div
              key={id}
              className="md:flex-shrink-0"
              onMouseEnter={() => handleCategoryMouseEnter(id)}
              onMouseLeave={handleCategoryMouseLeave}
            >
              <Link
                href={categoryUrl}
                onClick={handleClose}
                className={cn(
                  'label-md relative z-10 my-3 flex items-center justify-between px-2 py-1 uppercase text-primary md:my-0 md:whitespace-nowrap',
                  isActive && 'md:border-b md:border-primary'
                )}
                data-testid={`category-link-${handle}`}
              >
                {name}
                {hasChildren && (
                  <CollapseIcon
                    size={18}
                    className="-rotate-90 md:hidden"
                  />
                )}
              </Link>
            </div>
          );
        })}
      </nav>

      {shouldRenderDropdown && hoveredCategory && (
        <CategoryDropdownMenu
          category={hoveredCategory}
          isVisible={isDropdownVisible}
          onMouseEnter={handleDropdownMouseEnter}
          onMouseLeave={handleDropdownMouseLeave}
          onLinkClick={handleClose}
        />
      )}
    </>
  );
};
