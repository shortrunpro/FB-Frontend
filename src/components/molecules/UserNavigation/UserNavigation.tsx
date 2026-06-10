'use client';

import { useUnreads } from '@talkjs/react';
import { usePathname } from 'next/navigation';

import { Badge, Card, Divider, LogoutButton, NavigationItem } from '@/components/atoms';

const navigationItems = [
  {
    label: 'Orders',
    href: '/user/orders'
  },
  {
    label: 'Messages',
    href: '/user/messages'
  },
  {
    label: 'Returns',
    href: '/user/returns'
  },
  {
    label: 'Addresses',
    href: '/user/addresses'
  },
  {
    label: 'Reviews',
    href: '/user/reviews'
  }
];

export const UserNavigation = () => {
  const unreads = useUnreads();
  const path = usePathname();

  return (
    <Card className="h-min">
      {navigationItems.map(item => (
        <NavigationItem
          key={item.label}
          href={item.href}
          active={path === item.href}
          className="relative"
        >
          {item.label}
          {item.label === 'Messages' && Boolean(unreads?.length) && (
            <Badge className="absolute left-24 top-3 h-4 w-4 p-0">{unreads?.length}</Badge>
          )}
        </NavigationItem>
      ))}
      <Divider className="my-2" />
      <NavigationItem
        href={'/user/settings'}
        active={path === '/user/settings'}
      >
        Settings
      </NavigationItem>
      <LogoutButton className="w-full text-left" />
    </Card>
  );
};
