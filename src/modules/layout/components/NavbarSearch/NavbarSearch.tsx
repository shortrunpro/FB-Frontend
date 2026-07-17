'use client';

import { MagnifyingGlass } from '@medusajs/icons';
import Link from 'next/link';

interface Props {
  className?: string;
}

export const NavbarSearch = ({ className }: Props) => {
  // TODO implement search feature
  return (
    <div className="w-30 flex flex-row items-center justify-center md:w-auto">
      <Link
        prefetch={false}
        href="/search"
        className="btn flex w-full gap-x-1 rounded-md bg-white text-brand"
        data-testid="searchbar-link"
      >
        <MagnifyingGlass /> Search
      </Link>
    </div>
  );
};
