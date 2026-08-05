'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { primeCategories } from '@/data/categories';
import { cn } from '@/lib/utils';

export const PrimeCategoryNavbar = () => {
  const { category } = useParams();

  return (
    <div className="flex items-center gap-2">
      {Object.keys(primeCategories).map((key: string) => (
        <Link
          key={key}
          href={`/${key}`}
          className={cn(
            'label-lg px-2 pb-1 uppercase',
            key === category && 'border-b border-primary'
          )}
        >
          {primeCategories[key as keyof typeof primeCategories]}
        </Link>
      ))}
    </div>
  );
};
