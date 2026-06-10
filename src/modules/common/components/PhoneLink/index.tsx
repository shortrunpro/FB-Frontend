import { Phone } from '@medusajs/icons';
import Link from 'next/link';

export const PhoneLink = () => {
  const PhoneNumber = process.env.NEXT_PUBLIC_PHONE_NUMBER;
  return (
    <Link
      href={`tel:${PhoneNumber}`}
      className="flex flex-row items-center text-white hover:text-neutral-800"
    >
      <Phone className="mr-2" /> {PhoneNumber}
    </Link>
  );
};
