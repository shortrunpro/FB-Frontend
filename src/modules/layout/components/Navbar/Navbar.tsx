import Image from 'next/image';
import Link from 'next/link';

import { MobileNavbar } from '../MobileNavbar/MobileNavbar';
import { NavMenu } from '../NavMenu/NavMenu';

// min-[1100px]:max-w-[237px] min-[1150px]:max-w-[252.8px] xl:max-w-[252.8] min-[1300px]:max-w-[252.8] min-[1400px]:max-w-[284.4px]

export const Navbar = () => {
  return (
    <div className="w-full bg-white py-4">
      <div className="container-columns navbar justify-between bg-white px-4">
        <div className="navbar-start w-full lg:hidden">
          <MobileNavbar />
        </div>
        <div className="navbar-start navbar-center w-full justify-center lg:max-w-[221.2px] min-[1050px]:max-w-[237px] min-[1075px]:max-w-[284.4px] min-[1100px]:max-w-[316px] xl:px-4">
          <Link
            className="relative aspect-[316/43] h-auto w-full max-w-[316px] bg-white"
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
