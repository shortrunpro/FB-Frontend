import { HttpTypes } from '@medusajs/types';

import { Badge } from '@/components/atoms';
import { CartDropdown, ContactLinks, MobileNavbar, Navbar, NavLinks } from '@/components/cells';
import { UserDropdown } from '@/components/cells/UserDropdown/UserDropdown';
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

  const regions = await listRegions();

  const wishlistCount = wishlist?.products.length || 0;

  const { categories, parentCategories } = (await listCategories({
    query: { include_ancestors_tree: true }
  })) as {
    categories: HttpTypes.StoreProductCategory[];
    parentCategories: HttpTypes.StoreProductCategory[];
  };
  return (
    <header data-testid="header">
      <div
        className="bg-brand flex px-4 py-2 text-white md:px-5 lg:px-8"
        data-testid="header-top"
      >
        <div className="flex items-center lg:w-1/3">
          <MobileNavbar
            parentCategories={parentCategories}
            categories={categories}
          />
          <ContactLinks />
        </div>
        <div className="flex items-center pl-4 lg:w-1/3 lg:justify-center lg:pl-0"></div>
        <div
          className="flex w-full items-center justify-end gap-2 py-2 lg:w-1/3 lg:gap-4"
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

          <CartDropdown />
        </div>
      </div>
      <Navbar
        categories={categories}
        parentCategories={parentCategories}
      />
    </header>
  );
};
