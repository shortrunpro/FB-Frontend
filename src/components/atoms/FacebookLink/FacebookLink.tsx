import Link from 'next/link';

import { FacebookIcon } from '@/icons/index';

export const FacebookLink = () => {
  return (
    <Link href={'#'}>
      <FacebookIcon
        className="fill-current"
        color="current"
      />
    </Link>
  );
};
