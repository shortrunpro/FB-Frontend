import Image from 'next/image';
import Link from 'next/link';

import { NavMenu } from '@/components/molecules';

export const Navbar = () => {
  return (
    <div className="w-full bg-white">
      <div className="navbar mx-auto w-full max-w-[1250px] bg-white">
        <div className="navbar-start">
          <Link
            className="bg-white"
            href={'/'}
          >
            <Image
              src={'/federal-brace-logo.jpg'}
              alt="Federal Brace Logo"
              width={316}
              height={43}
            />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <NavMenu />
        </div>

        <div className="collapse-content z-1 lg:hidden">
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
