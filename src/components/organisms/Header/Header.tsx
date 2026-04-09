import { HttpTypes } from '@medusajs/types';
import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/components/atoms';
import { CartDropdown, ContactLinks, MobileNavbar, Navbar, NavLinks } from '@/components/cells';
import { UserDropdown } from '@/components/cells/UserDropdown/UserDropdown';
import { NavbarSearch } from '@/components/molecules';
import CountrySelector from '@/components/molecules/CountrySelector/CountrySelector';
import LocalizedClientLink from '@/components/molecules/LocalizedLink/LocalizedLink';
import { MessageButton } from '@/components/molecules/MessageButton/MessageButton';
import { HeartIcon } from '@/icons';
import { listCategories } from '@/lib/data/categories';
import { retrieveCustomer } from '@/lib/data/customer';
import { listRegions } from '@/lib/data/regions';
import { getUserWishlists } from '@/lib/data/wishlist';
import { Wishlist } from '@/types/wishlist';

export const Header = async ({ locale }: { locale: string }) => {
  const user = await retrieveCustomer().catch(() => null);
  const isLoggedIn = Boolean(user);

  let wishlist: Wishlist = { products: [] };
  if (user) {
    wishlist = await getUserWishlists({ countryCode: locale });
  }

  const wishlistCount = wishlist?.products.length || 0;

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
          {isLoggedIn && <MessageButton />}
          <UserDropdown isLoggedIn={isLoggedIn} />
          {isLoggedIn && (
            <LocalizedClientLink
              href="/user/wishlist"
              className="relative"
              data-testid="header-wishlist-link"
            >
              <HeartIcon size={20} />
              {Boolean(wishlistCount) && (
                <Badge
                  className="absolute -right-2 -top-2 h-4 w-4 p-0"
                  data-testid="wishlist-count-badge"
                >
                  {wishlistCount}
                </Badge>
              )}
            </LocalizedClientLink>
          )}
          <NavbarSearch className="flex w-full max-w-[296px] pl-4" />
          <CartDropdown />
        </div>
      </div>
      <Navbar />
    </header>
  );
};
