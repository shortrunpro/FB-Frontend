'use client';

import { useState } from 'react';

import { User } from '@medusajs/icons';
import { HttpTypes } from '@medusajs/types';
import { useUnreads } from '@talkjs/react';

import { Badge, Divider, LogoutButton, NavigationItem } from '@/components/atoms';
import { Dropdown } from '@/components/molecules';
import LocalizedClientLink from '@/components/molecules/LocalizedLink/LocalizedLink';
import { ProfileIcon } from '@/icons';

export const UserDropdown = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const [open, setOpen] = useState(false);

  const unreads = useUnreads();

  return (
    <div
      className="relative"
      onMouseOver={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
    >
      <LocalizedClientLink
        href={isLoggedIn ? '/user' : '/login'}
        className="relative"
        aria-label="Go to user profile"
      >
        <User />
      </LocalizedClientLink>
      <Dropdown show={open}>
        {isLoggedIn ? (
          <div className="p-1">
            <div className="lg:w-[200px]">
              <h3 className="heading-xs border-b p-4 uppercase">Your account</h3>
            </div>
            <NavigationItem href="/user/orders">Orders</NavigationItem>
            <NavigationItem
              href="/user/messages"
              className="relative"
            >
              Messages
              {Boolean(unreads?.length) && (
                <Badge className="absolute left-24 top-3 h-4 w-4 p-0">{unreads?.length}</Badge>
              )}
            </NavigationItem>
            <NavigationItem href="/user/returns">Returns</NavigationItem>
            <NavigationItem href="/user/addresses">Addresses</NavigationItem>
            <NavigationItem href="/user/reviews">Reviews</NavigationItem>
            <NavigationItem href="/user/wishlist">Wishlist</NavigationItem>
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
  );
};
