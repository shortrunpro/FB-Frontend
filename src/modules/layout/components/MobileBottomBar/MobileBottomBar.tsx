import { StoreCustomer } from '@medusajs/types';
import { Divider } from '@medusajs/ui';

import { UserDropdown } from '@/components/cells/UserDropdown/UserDropdown';
import { CartDrawer } from '@/modules/cart/components';

import { NavbarSearch } from '../NavbarSearch/NavbarSearch';

interface MobileBottomBarProps {
  user: StoreCustomer | null;
}

export const MobileBottomBar = ({ user }: MobileBottomBarProps) => {
  const isLoggedIn = Boolean(user);
  return (
    <div className="sticky bottom-0 z-50 flex w-full bg-white px-2 py-4 lg:hidden">
      <div className="flex w-full items-center justify-around">
        <UserDropdown isLoggedIn={isLoggedIn} />
        <div className="h-full p-2">
          <Divider
            orientation="vertical"
            variant="solid"
            className="h-full border-gray-400"
          />
        </div>

        <CartDrawer />
        <div className="h-full p-2">
          <Divider
            orientation="vertical"
            variant="solid"
            className="h-full border-gray-400"
          />
        </div>

        <NavbarSearch />
      </div>
    </div>
  );
};
