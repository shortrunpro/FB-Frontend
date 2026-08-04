import Image from 'next/image';

import { BRAND_PHONE_NUMBER } from '@/lib/config';

import { AssociationLinks } from './AssociationLinks';
import { NavLinks } from './NavLinks';
import { SocialLinks } from './SocialLinks';

export const FooterLinks = () => {
  return (
    <div className="container-columns grid grid-cols-2 gap-y-4 sm:grid-cols-3">
      <NavLinks />
      <div className="flex w-full flex-col items-center gap-y-4 max-sm:order-first max-sm:col-span-2">
        <span>Call Us: {BRAND_PHONE_NUMBER}</span>
        <AssociationLinks />
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
        <SocialLinks />
      </div>
      <aside className="col-span-full mt-8 py-4 text-center text-xs/4 font-bold">
        <p>Copyright © {new Date().getFullYear()} - Short Run Pro, LLC. All rights reserved.</p>
      </aside>
    </div>
  );
};
