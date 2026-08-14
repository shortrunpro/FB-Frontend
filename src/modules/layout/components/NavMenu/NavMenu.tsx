'use client';

import Link from 'next/link';

import menu from './menu.json';

export const NavMenu = () => {
  return (
    <div className="gap-x- flex gap-x-0.5 min-[1150px]:gap-x-1.5 min-[1200px]:gap-x-3 min-[1250px]:gap-x-4 xl:gap-x-1.5 min-[1300px]:gap-x-2 min-[1325px]:gap-x-3 min-[1350px]:gap-x-3.5 min-[1375px]:gap-x-4 min-[1400px]:gap-x-5 min-[1450px]:gap-x-6 min-[1600px]:gap-x-7">
      {menu.map(item => (
        <MenuItem
          key={item.title}
          item={item}
        />
      ))}
    </div>
  );
};
interface MenuItemProps {
  item: {
    title: string;
    link: string | null;
    children: {
      link: string;
      title: string;
    }[];
  };
}
const MenuItem = ({ item }: MenuItemProps) => {
  const closeDropdown = () => {
    if (typeof window !== 'undefined' && document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };
  return (
    <div className="dropdown dropdown-end dropdown-bottom dropdown-hover">
      {item.link ? (
        <Link
          href={item.link}
          onClick={closeDropdown}
          role="button"
          className="btn btn-ghost px-1 font-bold uppercase text-brand hover:bg-transparent hover:text-[#718fbe] xl:px-2"
        >
          {item.title}
        </Link>
      ) : (
        <div
          role="button"
          className="btn btn-ghost px-1 font-bold uppercase text-brand hover:bg-transparent hover:text-[#718fbe]"
        >
          {item.title}
        </div>
      )}

      {item.children.length > 0 && (
        <ul className="z-1 menu dropdown-content w-52 rounded-box bg-brand_grey px-2 py-0 shadow-sm">
          {item.children.map((child: any) => {
            return (
              <li key={child.title}>
                <Link
                  onClick={closeDropdown}
                  href={child.link}
                  className="px-2"
                >
                  {child.title}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
