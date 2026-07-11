'use client';

import { useMemo, useState } from 'react';

import { HttpTypes } from '@medusajs/types';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { CollapseIcon } from '@/icons';
import { cn } from '@/lib/utils';

import menu from '../../NavMenu/menu.json';
import { MobileNestedMenuDrawer } from './MobileNestedMenuDrawer';

interface MobileCategoryNavbarProps {
  onClose?: (state: boolean) => void;
}

export const MobileNestedMenu = ({ onClose }: MobileCategoryNavbarProps) => {
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  const handleClose = () => {
    onClose?.(false);
  };

  const handleCategoryClick = (menuItem: any) => {
    const item = menu.find(c => c.title === menuItem.title);
    if (item && item.children.length > 0) {
      setSelectedItem(item);
    }
  };

  const handleDrawerClose = () => {
    setSelectedItem(null);
  };

  return (
    <>
      <nav
        className="flex flex-col gap-2"
        aria-label="Mobile category navigation"
      >
        {menu.map(item => (
          <div
            key={item.title}
            className="relative"
          >
            <div className="flex items-center justify-between">
              {/* <Link
                href={item.link}
                onClick={handleClose}
                className={cn(
                  'label-md flex-1 px-4 py-3 uppercase text-primary transition-colors hover:bg-secondary/10',
                  selectedItem &&
                    item.title === selectedItem.title &&
                    'border-l-2 border-primary bg-secondary/5'
                )}
              >
                {item.title}
              </Link> */}
              {item.children.length > 0 ? (
                <button
                  onClick={() => handleCategoryClick(item)}
                  className={cn(
                    'label-md flex flex-1 justify-between px-4 py-3 uppercase text-primary transition-colors hover:bg-secondary/10',
                    selectedItem &&
                      item.title === selectedItem.title &&
                      'border-l-2 border-primary bg-secondary/5'
                  )}
                  aria-label={`View ${name} subcategories`}
                >
                  {item.title}

                  <CollapseIcon
                    size={18}
                    className="-rotate-90"
                  />
                </button>
              ) : (
                <Link
                  href={item.link}
                  onClick={handleClose}
                  className={cn(
                    'label-md flex-1 px-4 py-3 uppercase text-primary transition-colors hover:bg-secondary/10',
                    selectedItem &&
                      item.title === selectedItem.title &&
                      'border-l-2 border-primary bg-secondary/5'
                  )}
                >
                  {item.title}
                </Link>
              )}
            </div>
          </div>
        ))}

        {/* {filteredCategories.map(({ id, handle, name, category_children }) => {
          const categoryUrl = `/categories/${handle}`
          const isActive = handle === category || handle === parentCategoryHandle
          const hasChildren = category_children && category_children.length > 0

          return (
            <div key={id} className="relative">
              <div className="flex items-center justify-between">
                <LocalizedClientLink
                  href={categoryUrl}
                  onClick={handleClose}
                  className={cn(
                    "label-md uppercase px-4 py-3 text-primary hover:bg-secondary/10 transition-colors flex-1",
                    isActive && "border-l-2 border-primary bg-secondary/5"
                  )}
                >
                  {name}
                </LocalizedClientLink>
                
                {hasChildren && (
                  <button
                    onClick={() => handleCategoryClick(id)}
                    className="px-4 py-3 hover:bg-secondary/10 transition-colors"
                    aria-label={`View ${name} subcategories`}
                  >
                    <CollapseIcon size={18} className="-rotate-90" />
                  </button>
                )}
              </div>
            </div>
          )
        })} */}
      </nav>

      {selectedItem && (
        <MobileNestedMenuDrawer
          item={selectedItem}
          isOpen={!!selectedItem}
          onClose={handleDrawerClose}
          onLinkClick={handleClose}
        />
      )}
    </>
  );
};
