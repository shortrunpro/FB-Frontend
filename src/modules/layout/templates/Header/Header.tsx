import { StoreCustomer } from '@medusajs/types';

import { ContactLinks, Navbar, NavLinks } from '@/modules/layout/components';

interface HeaderProps {
  user: StoreCustomer | null;
}

export const Header = async ({ user }: HeaderProps) => {
  return (
    <header
      data-testid="header"
      className="sticky top-0 z-40 overflow-hidden lg:overflow-visible"
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
          <NavLinks user={user} />
        </div>
      </div>
      <Navbar />
    </header>
  );
};
