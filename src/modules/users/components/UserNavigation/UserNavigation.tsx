'use client';

import { usePathname } from 'next/navigation';

import { Badge, Card, Divider, LogoutButton, NavigationItem } from '@/components/atoms';

const navigationItems = [
  {
    label: 'Orders',
    href: '/user/orders'
  },
  {
    label: 'Addresses',
    href: '/user/addresses'
  }
];

export const UserNavigation = () => {
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
