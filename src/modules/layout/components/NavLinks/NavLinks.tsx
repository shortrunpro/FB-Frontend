'use client';

import Link from 'next/link';

import { CartDrawer } from '@/modules/cart/components';
import { UserDropdown } from '@/modules/users/components';

import { NavbarSearch } from '../NavbarSearch/NavbarSearch';
import menuItems from './menu.json';

export const NavLinks = ({ user }: any) => {
  const closeDropdown = () => {
    if (typeof window !== 'undefined' && document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };
  const isLoggedIn = Boolean(user);
  return (
    <div className="flex gap-x-4">
      <div className="hidden items-center gap-x-3 lg:flex">
        {menuItems.map(item =>
          !item.children ? (
            <Link
              prefetch={false}
              key={item.link}
              href={item.link}
              className="hover:text-neutral-800"
            >
              {item.title}
            </Link>
          ) : (
            <div
              className="dropdown dropdown-bottom dropdown-hover"
              key={item.link}
            >
              <Link
                prefetch={false}
                href={item.link}
                className="hover:text-neutral-800"
                onClick={closeDropdown}
              >
                {item.title}
              </Link>
              <ul className="menu dropdown-content z-50 w-52 rounded-box bg-brand_grey px-2 py-0 text-black shadow-sm">
                {item.children.map((child: any) => (
                  <li key={child.link}>
                    <Link
                      onClick={closeDropdown}
                      href={child.link}
                      className="px-2"
                    >
                      {child.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )
        )}
      </div>
      <div className="flex items-center gap-x-4">
        <UserDropdown isLoggedIn={isLoggedIn} />
        <NavbarSearch className="flex w-full max-w-[296px] pl-4" />
        <CartDrawer />
      </div>
    </div>
  );
};
