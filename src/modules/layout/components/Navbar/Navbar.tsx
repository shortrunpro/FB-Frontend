import Image from 'next/image';
import Link from 'next/link';

import { MobileNavbar } from '../MobileNavbar/MobileNavbar';
import { NavMenu } from '../NavMenu/NavMenu';

export const Navbar = () => {
  return (
    <div className="w-full bg-white py-4">
      <div className="container-columns navbar justify-between bg-white px-4">
        <div className="navbar-start w-full lg:hidden">
          <MobileNavbar />
        </div>
        <div className="navbar-center w-full justify-center lg:navbar-start lg:max-w-[316px]">
          <Link
            className="relative aspect-[316/43] w-3/4 max-w-[316px] bg-white lg:w-11/12 3xl:w-full"
            href={'/'}
          >
            <Image
              src={'/federal-brace-logo.jpg'}
              alt="Federal Brace Logo"
              className="object-cover"
              fill
            />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <NavMenu />
        </div>
      </div>
    </div>
  );
};
