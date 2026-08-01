import Image from 'next/image';
import Link from 'next/link';

import { BRAND_PHONE_NUMBER } from '@/lib/config';
import {
  FacebookLink,
  InstagramLink,
  LinkedinLink,
  PinterestLink,
  TwitterLink,
  YoutubeLink
} from '@/modules/common/components';

export const FooterLinks = () => {
  return (
    <div className="container-columns grid grid-cols-2 gap-y-4 sm:grid-cols-3">
      <nav className="flex flex-col gap-y-4 text-sm/4">
        <Link
          href={'/'}
          className="link-hover link"
        >
          Home
        </Link>
        <Link
          href={'/products'}
          className="link-hover link"
        >
          Products
        </Link>
        <Link
          href={'/content/about-us'}
          className="link-hover link"
        >
          About Us
        </Link>
        <Link
          className="link-hover link"
          href={'/contact-us'}
        >
          Contact Us
        </Link>
        <Link
          href={'/blog'}
          className="link-hover link"
        >
          Blog
        </Link>
        <Link
          href={'/content/company-awards'}
          className="link-hover link"
        >
          Company Awards
        </Link>
        <Link
          href={'/content/our-partners'}
          className="link-hover link"
        >
          Distributors / Partners
        </Link>
        <Link
          href={'/reviews'}
          className="link-hover link"
        >
          Reviews
        </Link>
        <Link
          href={'/content/policies'}
          className="link-hover link"
        >
          Company Policies
        </Link>
      </nav>
      <div className="flex w-full flex-col items-center gap-y-4 max-sm:order-first max-sm:col-span-2">
        <span>Call Us: {BRAND_PHONE_NUMBER}</span>
        <div className="flex gap-x-2">
          <Link
            href={'https://www.cabinetmakers.org/'}
            target="_blank"
          >
            <Image
              src={'/footer/cma-footer.jpg'}
              width={32}
              height={35}
              alt="CMA Logo"
            />
          </Link>
          <Link
            href={'https://nkba.org/'}
            target="_blank"
          >
            <Image
              src={'/footer/nkba-footer.jpg'}
              width={102}
              height={35}
              alt="NKBA Logo"
            />
          </Link>
          <Link
            href={'https://www.aia.org/'}
            target="_blank"
          >
            <Image
              src={'/footer/aia-footer.jpg'}
              width={121}
              height={35}
              alt="AIA Logo"
            />
          </Link>
          <Link
            href={'https://nari.org/'}
            target="_blank"
          >
            <Image
              src={'/footer/nari-footer.jpg'}
              width={62}
              height={35}
              alt="NARI Logo"
            />
          </Link>
          <Link
            href={'https://www.isfanow.org/'}
            target="_blank"
          >
            <Image
              src={'/footer/isfa-footer.jpg'}
              width={93}
              height={35}
              alt="ISFA Logo"
            />
          </Link>
        </div>
        <div>
          <Image
            src={'/fb-anvil.svg'}
            width={300}
            height={300}
            alt="Federal Brace Anvil"
          />
        </div>
      </div>
      <div className="flex items-center justify-end">
        <div className="grid h-min w-fit grid-cols-2 gap-x-5 gap-y-3">
          <FacebookLink />
          <InstagramLink />
          <TwitterLink />
          <LinkedinLink />
          <YoutubeLink />
          <PinterestLink />
        </div>
      </div>

      <aside className="col-span-full mt-8 py-4 text-center text-xs/4 font-bold">
        <p>Copyright © {new Date().getFullYear()} - Short Run Pro, LLC. All rights reserved.</p>
      </aside>
    </div>
  );
};
