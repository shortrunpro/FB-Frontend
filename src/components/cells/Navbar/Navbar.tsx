import { HttpTypes } from '@medusajs/types';

import { CategoryNavbar, NavbarSearch } from '@/components/molecules';

export const Navbar = ({
  categories,
  parentCategories
}: {
  categories: HttpTypes.StoreProductCategory[];
  parentCategories: HttpTypes.StoreProductCategory[];
}) => {
  return (
    <div
      className="flex flex-col justify-between gap-4 border px-4 py-4 md:gap-0 md:px-5 lg:flex-row"
      data-testid="navbar"
    >
      <div className="hidden w-full items-center justify-between lg:flex">
        <CategoryNavbar
          categories={categories}
          parentCategories={parentCategories}
        />
        {/* <div className="ml-auto max-w-[296px] w-full pl-4" data-testid="navbar-search-desktop">
          <NavbarSearch />
        </div> */}
      </div>
      {/* <div className="lg:hidden max-w-[296px] w-full" data-testid="navbar-search-mobile">
        <NavbarSearch className="max-w-[296px]" />
      </div> */}
    </div>
  );
};
