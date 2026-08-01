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
  return (
    <div className="dropdown dropdown-end dropdown-bottom dropdown-hover">
      {item.link ? (
        <Link
          href={item.link}

          role="button"
          className="btn btn-ghost px-1 font-bold uppercase text-brand decoration-brand decoration-2 underline-offset-8 focus-within:underline hover:bg-transparent hover:underline focus:underline focus-visible:underline xl:px-2"
        >
          {item.title}
        </Link>
      ) : (
        <div
          // tabIndex={0}
          role="button"
          className="btn btn-ghost px-1 font-bold uppercase text-brand decoration-brand decoration-2 underline-offset-8 hover:bg-transparent hover:underline"
        >
          {item.title}
        </div>
      )}

      {item.children.length > 0 && (
        <ul
          tabIndex={-1}
          className="z-1 menu dropdown-content w-52 rounded-box bg-brand_grey p-2 shadow-sm"
        >
          {item.children.map((child: any) => {
            return (
              <li key={child.title}>
                <Link
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
