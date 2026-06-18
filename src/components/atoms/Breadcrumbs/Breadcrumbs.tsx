'use client';

import { usePathname } from 'next/navigation';

import LocalizedClientLink from '@/components/molecules/LocalizedLink/LocalizedLink';
import { ForwardIcon } from '@/icons';
import { cn } from '@/lib/utils';

interface BreadcrumbsProps {
  items: { label: string; path: string }[];
  className?: string;
  'data-testid'?: string;
}

export function Breadcrumbs({ items, className, 'data-testid': dataTestId }: BreadcrumbsProps) {
  const pathname = usePathname();
  return (
    <nav
      className={cn('flex', className)}
      aria-label="Breadcrumb"
      data-testid="breadcrumbs"
    >
      <ol className="inline-flex items-center gap-2">
        {items.map(({ path, label }, index) => {
          const isActive = pathname === path;
          return (
            <li
              key={path}
              className="inline-flex items-center"
              data-testid={`breadcrumb-item-${index}`}
            >
              {index > 0 && <ForwardIcon size={16} />}
              <LocalizedClientLink
                href={path}
                className={cn(
                  'label-md inline-flex items-center text-primary',
                  index > 0 && 'ml-2',
                  isActive && 'text-secondary'
                )}
                data-testid={
                  dataTestId ? `${dataTestId}-link-${index}` : `breadcrumbs-link-${index}`
                }
              >
                {label}
              </LocalizedClientLink>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
