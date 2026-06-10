import Link from 'next/link';

import { TwitterIcon } from '@/icons';

export const TwitterLink = () => {
  return (
    <Link href={'#'}>
      <TwitterIcon
        className="fill-current"
        color="current"
      />
    </Link>
  );
};
