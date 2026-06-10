import Link from 'next/link';

import { YouTubeIcon } from '@/icons';

export const YoutubeLink = () => {
  return (
    <Link href={'#'}>
      <YouTubeIcon
        className="fill-current"
        color="current"
      />
    </Link>
  );
};
