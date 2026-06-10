import { EnvelopeSolid } from '@medusajs/icons';
import Link from 'next/link';

export const EmailLink = () => {
  const SupportEmail = process.env.NEXT_PUBLIC_EMAIL;
  return (
    <Link
      href={`mailto:${SupportEmail}`}
      className="flex flex-row items-center text-white hover:text-neutral-800"
    >
      <EnvelopeSolid className="mr-2" />
      Email Us
    </Link>
  );
};
