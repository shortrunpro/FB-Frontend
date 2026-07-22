import { ReactNode } from 'react';

import Link, { LinkProps } from 'next/link';

import { cn } from '@/lib/utils';

interface TextLinkProps extends LinkProps {
  className?: string;
  children: ReactNode;
}

export const TextLink = ({
  className,
  href,
  replace = false,
  scroll = false,
  prefetch = false,
  children,
  ...props
}: TextLinkProps) => {
  return (
    <Link
      href={href}
      replace={replace}
      scroll={scroll}
      prefetch={prefetch}
      className={cn('text-[#2c9ffd]', className)}
      {...props}
    >
      {children}
    </Link>
  );
};
