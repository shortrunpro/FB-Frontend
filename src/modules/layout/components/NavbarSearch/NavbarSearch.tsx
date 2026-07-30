'use client';

import { MagnifyingGlass } from '@medusajs/icons';
import Link from 'next/link';

interface Props {
  className?: string;
}

export const NavbarSearch = ({ className }: Props) => {
  // TODO implement search feature
  return (
    <div className="flex flex-row items-center justify-center md:w-auto">
      <Link
        prefetch={false}
        href="/search"
        className="label-md flex w-full items-center gap-x-1 rounded-sm bg-gray-100 px-4 py-1 text-brand hover:bg-gray-200 lg:bg-white"
        data-testid="searchbar-link"
      >
        <MagnifyingGlass /> Search
      </Link>
    </div>
  );
};
