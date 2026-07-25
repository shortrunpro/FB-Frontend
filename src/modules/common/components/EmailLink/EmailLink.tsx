import { EnvelopeSolid } from '@medusajs/icons';
import Link from 'next/link';
import { CiMail } from 'react-icons/ci';
import { IoIosMail } from 'react-icons/io';

import { cn } from '@/lib/utils';

interface EmailLinkProps {
  className?: string;
  variant?: 'primary' | 'secondary';
}
export const EmailLink = ({ className, variant = 'primary' }: EmailLinkProps) => {
  const SupportEmail = process.env.NEXT_PUBLIC_EMAIL;
  return (
    <Link
      href={`mailto:${SupportEmail}`}
      className={cn(
        'flex flex-row items-center gap-x-1 text-white hover:text-neutral-800',
        className
      )}
    >
      <IoIosMail size={'1.3em'} />
      {variant === 'primary' && 'Email Us'}
      {variant === 'secondary' && SupportEmail}
    </Link>
  );
};
