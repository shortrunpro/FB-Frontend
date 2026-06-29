import Image from 'next/image';
import Link from 'next/link';

import { NavMenu } from '../NavMenu/NavMenu';

export const Navbar = () => {
  return (
    <div className="w-full bg-white py-4">
      <div className="container-columns navbar justify-between bg-white">
        <div className="navbar-start max-w-[316px]">
          <Link
            className="3xl:w-full relative aspect-[316/43] w-3/4 bg-white lg:w-11/12"
            href={'/'}
          >
            <Image
              src={'/federal-brace-logo.jpg'}
              alt="Federal Brace Logo"
              className="object-cover"
              // width={316}
              // height={43}
              fill
            />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <NavMenu />
        </div>

        <div className="z-1 collapse-content lg:hidden">
          <ul className="menu">
            <li>
              <button>Item 1</button>
            </li>
            <li>
              <button>Parent</button>
              <ul>
                <li>
                  <button>Submenu 1</button>
                </li>
                <li>
                  <button>Submenu 2</button>
                </li>
              </ul>
            </li>
            <li>
              <button>Item 3</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
