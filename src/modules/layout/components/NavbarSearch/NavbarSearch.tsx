'use client';

import { useState } from 'react';

import { MagnifyingGlass } from '@medusajs/icons';
import clsx from 'clsx';
import Link from 'next/link';
import { redirect, useSearchParams } from 'next/navigation';

import { Input } from '@/components/atoms';
import { SearchIcon } from '@/icons';

interface Props {
  className?: string;
}

export const NavbarSearch = ({ className }: Props) => {
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get('query') || '');

  const handleSearch = () => {
    if (search) {
      redirect(`/categories?query=${search}`);
    } else {
      redirect(`/categories`);
    }
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch();
  };
  // TODO implement search feature
  return (
    <div className="w-30 flex flex-row items-center justify-center md:w-auto">
      <Link
        prefetch={false}
        href="/search"
        className="flex w-full items-center gap-x-2 rounded bg-white px-4 text-black"
        data-testid="searchbar-link"
      >
        <MagnifyingGlass /> Search
      </Link>
    </div>
    // <form
    //   className={clsx('w-full', className)}
    //   method="POST"
    //   onSubmit={submitHandler}
    // >
    //   <Input
    //     icon={<SearchIcon />}
    //     onIconClick={handleSearch}
    //     iconAriaLabel="Search"
    //     placeholder="Search product"
    //     value={search}
    //     changeValue={setSearch}
    //     type="search"
    //     className="py-2"
    //   />
    //   <input
    //     type="submit"
    //     className="hidden"
    //   />
    // </form>
  );
};
