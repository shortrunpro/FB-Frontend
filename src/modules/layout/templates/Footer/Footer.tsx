import Image from 'next/image';

import { BRAND_PHONE_NUMBER } from '@/lib/config';
import { FacebookLink, LinkedinLink, TwitterLink, YoutubeLink } from '@/modules/common/components';

export function Footer() {
  return (
    <footer className="bg-[#333333] px-4 pb-4 pt-10 text-white">
      <div className="container-columns grid grid-cols-2 gap-y-4 sm:grid-cols-3">
        <nav className="flex flex-col gap-y-4 text-sm/4">
          <a className="link-hover link">Home</a>
          <a className="link-hover link">Products</a>
          <a className="link-hover link">About Us</a>
          <a
            className="link-hover link"
            href="/contact-us"
          >
            Contact Us
          </a>
          <a className="link-hover link">Blog</a>
          <a className="link-hover link">Company Awards</a>
          <a className="link-hover link">Distributors / Partners</a>
          <a className="link-hover link">Reviews</a>
          <a className="link-hover link">Company Policies</a>
        </nav>
        <div className="flex w-full flex-col items-center max-sm:order-first max-sm:col-span-2">
          <span>Call Us: {BRAND_PHONE_NUMBER}</span>
        </div>
        <div className="flex w-full flex-col gap-2">
          <Image
            src={'/fb-anvil.svg'}
            width={300}
            height={300}
            alt="Federal Brace Anvil"
          />
          <div className="flex justify-center gap-2">
            <TwitterLink />
            <YoutubeLink />
            <FacebookLink />
            <LinkedinLink />
          </div>
        </div>
        <aside className="col-span-full mt-8 py-4 text-center text-xs/4 font-bold">
          <p>Copyright © {new Date().getFullYear()} - Short Run Pro, LLC. All rights reserved.</p>
        </aside>
      </div>
    </footer>
  );
}
