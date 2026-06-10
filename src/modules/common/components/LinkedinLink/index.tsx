import Link from 'next/link';

import { LinkedinIcon } from '@/icons';

export const LinkedinLink = () => {
  return (
    <Link href={'#'}>
      <LinkedinIcon
        className="fill-current"
        color="current"
      />
    </Link>
  );
};
