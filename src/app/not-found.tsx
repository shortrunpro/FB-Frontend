import { Metadata } from 'next';
import Link from 'next/link';

import { ArrowUpIcon } from '@/icons';

export const metadata: Metadata = {
  title: '404',
  description: 'Something went wrong'
};

export default function NotFound() {
  return (
    <div className="flex flex-grow flex-col items-center justify-center gap-4 py-24">
      <h1 className="text-2xl-semi text-ui-fg-base">Page not found</h1>
      <p className="text-small-regular text-ui-fg-base">
        The page you tried to access does not exist.
      </p>
      <Link
        className="group flex items-center gap-x-1"
        href="/"
      >
        Go to frontpage
        <ArrowUpIcon
          className="duration-150 ease-in-out group-hover:rotate-45"
          color="var(--fg-interactive)"
        />
      </Link>
    </div>
  );
}
