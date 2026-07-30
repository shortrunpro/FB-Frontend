'use client';

import { useState } from 'react';

import Link from 'next/link';
import { FaRegUser } from 'react-icons/fa';

import { Divider, LogoutButton, NavigationItem } from '@/components/atoms';
import { Dropdown } from '@/components/molecules';

export const UserDropdown = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseOver={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
    >
      <Link
        href={isLoggedIn ? '/user' : '/login'}
        className="relative"
        aria-label="Go to user profile"
      >
        <FaRegUser size={'1.25rem'} />
      </Link>
      <div className="hidden lg:block">
        <Dropdown show={open}>
          {isLoggedIn ? (
            <div className="p-1">
              <div className="lg:w-[200px]">
                <h3 className="heading-xs border-b p-4 uppercase">Your account</h3>
              </div>
              <NavigationItem href="/user/orders">Orders</NavigationItem>
              <NavigationItem href="/user/addresses">Addresses</NavigationItem>
              <Divider />
              <NavigationItem href="/user/settings">Settings</NavigationItem>
              <LogoutButton />
            </div>
          ) : (
            <div className="p-1">
              <NavigationItem href="/login">Login</NavigationItem>
              <NavigationItem href="/register">Register</NavigationItem>
            </div>
          )}
        </Dropdown>
      </div>
    </div>
  );
};
