import Link from 'next/link';

import { UserDropdown } from '@/components/cells/UserDropdown/UserDropdown';
import { CartDrawer } from '@/modules/cart/components';

import { NavbarSearch } from '../NavbarSearch/NavbarSearch';

export const NavLinks = ({ user }: any) => {
  const isLoggedIn = Boolean(user);
  return (
    <div className="flex gap-x-4">
      <div className="hidden items-center gap-x-3 lg:flex">
        <Link
          prefetch={false}
          href="/request-quote"
          className="hover:text-neutral-800"
        >
          Request a Quote
        </Link>
        <Link
          prefetch={false}
          href="/categories/clearance"
          className="hover:text-neutral-800"
        >
          Clearance
        </Link>
        <Link
          prefetch={false}
          href="/blog"
          className="hover:text-neutral-800"
        >
          Blog
        </Link>
        <Link
          prefetch={false}
          href="/content/category/company"
          className="hover:text-neutral-800"
        >
          Company
        </Link>
        <Link
          prefetch={false}
          href="/content/category/resources"
          className="hover:text-neutral-800"
        >
          Resources
        </Link>
      </div>
      <div className="flex items-center gap-x-4">
        <UserDropdown isLoggedIn={isLoggedIn} />
        <NavbarSearch className="flex w-full max-w-[296px] pl-4" />
        <CartDrawer />
      </div>
    </div>
  );
};
