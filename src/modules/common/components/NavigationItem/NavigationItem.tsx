import Link from 'next/link';

import { cn } from '@/lib/utils';

interface NavigationItemProps extends React.ComponentPropsWithoutRef<'a'> {
  active?: boolean;
  'data-testid'?: string;
}

export const NavigationItem: React.FC<NavigationItemProps> = ({
  children,
  href = '/',
  className,
  active,
  'data-testid': dataTestId,
  ...props
}) => (
  <Link
    href={href}
    className={cn(
      'label-md my-3 flex items-center justify-between px-4 py-3 uppercase md:my-0',
      active && 'underline underline-offset-8',
      className
    )}
    data-testid={dataTestId ?? 'navigation-item'}
    {...props}
  >
    {children}
  </Link>
);
