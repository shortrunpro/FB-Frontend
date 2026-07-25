import Link from 'next/link';
import { FaPhoneAlt } from 'react-icons/fa';

import { cn } from '@/lib/utils';

type PhoneLinkProps = {
  className?: string;
};

export const PhoneLink = ({ className }: PhoneLinkProps) => {
  const PhoneNumber = process.env.NEXT_PUBLIC_PHONE_NUMBER;
  return (
    <Link
      href={`tel:${PhoneNumber}`}
      className={cn(
        'flex flex-row items-center gap-x-1 text-white hover:text-neutral-800',
        className
      )}
    >
      <FaPhoneAlt /> {PhoneNumber}
    </Link>
  );
};
