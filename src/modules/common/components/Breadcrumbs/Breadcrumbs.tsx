'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome } from 'react-icons/fa';

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
      className={cn('my-4 flex', className)}
      aria-label="Breadcrumb"
      data-testid="breadcrumbs"
    >
      <ol className="inline-flex items-center gap-1">
        <li className="inline-flex items-center">
          <Link
            href={'/'}
            className="label-md mr-2 inline-flex items-center"
            data-testid="breadcrumb-link-home"
          >
            <FaHome
              size={20}
              color="#49576f"
            />
          </Link>
          <ForwardIcon size={16} />
        </li>
        {items.map(({ path, label }, index) => {
          const isActive = pathname === path;
          return (
            <li
              key={path}
              className="inline-flex items-center"
              data-testid={`breadcrumb-item-${index}`}
            >
              {index > 0 && <ForwardIcon size={16} />}
              <Link
                href={path}
                className={cn(
                  'label-md inline-flex items-center text-brand',
                  index > 0 && 'ml-2',
                  isActive && 'text-secondary'
                )}
                data-testid={
                  dataTestId ? `${dataTestId}-link-${index}` : `breadcrumbs-link-${index}`
                }
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
