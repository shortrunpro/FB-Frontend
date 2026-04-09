'use client';

import { useState } from 'react';

import Link from 'next/link';

import { Dropdown } from '../Dropdown/Dropdown';
import menu from './menu.json';

export const NavMenu = () => {
  return menu.map(item => (
    <MenuItem
      key={item.title}
      item={item}
    />
  ));
};

const MenuItem = ({ item }: { item: any }) => {
  return (
    <div className="dropdown dropdown-hover">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost rounded-field"
      >
        {item.title}
      </div>
      {item.children.length > 0 && (
        <ul
          tabIndex={-1}
          className="dropdown-content menu rounded-box z-1 bg-brand_grey w-52 p-2 shadow-sm"
        >
          {item.children.map((child: any) => {
            return (
              <li key={child.title}>
                <Link href={child.link}>{child.title}</Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
