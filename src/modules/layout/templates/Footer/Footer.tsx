import { StoreCustomer } from '@medusajs/types';

import { FooterLinks, MobileBottomBar } from '../../components';

interface FooterProps {
  user: StoreCustomer | null;
}
export function Footer({ user }: FooterProps) {
  return (
    <>
      <footer className="bg-[#333333] px-4 pb-4 pt-10 text-white">
        <FooterLinks />
      </footer>
      <MobileBottomBar user={user} />
    </>
  );
}
