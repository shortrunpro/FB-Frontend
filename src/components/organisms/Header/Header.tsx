import { HttpTypes } from '@medusajs/types';

import { CartDrawer, ContactLinks, MobileNavbar, Navbar, NavLinks } from '@/components/cells';
import { UserDropdown } from '@/components/cells/UserDropdown/UserDropdown';
import { NavbarSearch } from '@/components/molecules';
import { listCategories } from '@/lib/data/categories';
import { retrieveCustomer } from '@/lib/data/customer';

export const Header = async ({ locale }: { locale: string }) => {
  const user = await retrieveCustomer().catch(() => null);
  const isLoggedIn = Boolean(user);

  const { categories, parentCategories } = (await listCategories({
    query: { include_ancestors_tree: true }
  })) as {
    categories: HttpTypes.StoreProductCategory[];
    parentCategories: HttpTypes.StoreProductCategory[];
  };
  return (
    <header
      data-testid="header"
      className="sticky top-0 z-50"
    >
      <div
        className="flex justify-between bg-brand px-8 py-2 text-white md:px-5 lg:px-8"
        data-testid="header-top"
      >
        <div className="flex w-full items-center">
          <MobileNavbar
            parentCategories={parentCategories}
            categories={categories}
          />
          <ContactLinks />
        </div>

        <div
          className="flex w-full items-center justify-end gap-2 py-2 lg:gap-4"
          data-testid="header-actions"
        >
          <NavLinks />
          <UserDropdown isLoggedIn={isLoggedIn} />
          <NavbarSearch className="flex w-full max-w-[296px] pl-4" />
          <CartDrawer />
        </div>
      </div>
      <Navbar />
    </header>
  );
};
