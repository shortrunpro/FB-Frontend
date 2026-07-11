'use client';

import { useEffect, useState } from 'react';

import { BarsThree } from '@medusajs/icons';
import { HttpTypes } from '@medusajs/types';

import { IconButton } from '@/components/atoms';
import { HeaderCategoryNavbar } from '@/components/molecules';
import { CloseIcon, HamburgerMenuIcon } from '@/icons';

import { MobileNestedMenu } from './components';

export const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenuHandler = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div
      className="lg:hidden"
      data-testid="mobile-navbar"
    >
      <div
        onClick={() => setIsOpen(true)}
        data-testid="mobile-menu-toggle"
      >
        <BarsThree
          width={30}
          height={30}
        />
      </div>
      {isOpen && (
        <div
          className="fixed left-0 top-0 z-20 h-full w-full bg-primary"
          data-testid="mobile-menu-drawer"
        >
          <div
            className="flex items-center justify-between border-b p-4"
            data-testid="mobile-menu-header"
          >
            <h2 className="heading-md uppercase text-primary">Menu</h2>
            <IconButton
              icon={<CloseIcon size={20} />}
              onClick={() => closeMenuHandler()}
              variant="icon"
              size="small"
              data-testid="mobile-menu-close-button"
            />
          </div>
          <div className="">
            <MobileNestedMenu onClose={closeMenuHandler} />
            {/* <HeaderCategoryNavbar
              onClose={closeMenuHandler}
              categories={categories}
              parentCategories={parentCategories}
            /> */}
            <div className="p-4">
              {/* <MobileCategoryNavbar
                onClose={closeMenuHandler}
                categories={categories}
                parentCategories={parentCategories}
              /> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
