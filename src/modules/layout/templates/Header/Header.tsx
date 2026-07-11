import { CartDrawer } from '@/components/cells';
import { UserDropdown } from '@/components/cells/UserDropdown/UserDropdown';
import { retrieveCustomer } from '@/lib/data/customer';
import { ContactLinks, Navbar, NavbarSearch, NavLinks } from '@/modules/layout/components';

export const Header = async () => {
  const user = await retrieveCustomer().catch(() => null);
  const isLoggedIn = Boolean(user);

  return (
    <header
      data-testid="header"
      className="sticky top-0 z-50 overflow-hidden"
    >
      <div
        className="hidden justify-between bg-brand px-8 py-2 text-white md:px-5 lg:flex lg:px-8"
        data-testid="header-top"
      >
        <div className="flex items-center">
          <ContactLinks />
        </div>

        <div
          className="flex items-center justify-end gap-2 py-2 lg:gap-4"
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
