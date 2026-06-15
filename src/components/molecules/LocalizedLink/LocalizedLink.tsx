'use client';

import React, { MouseEventHandler } from 'react';

import Link from 'next/link';

const LocalizedClientLink = ({
  children,
  href,
  ...props
}: {
  children?: React.ReactNode;
  href: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement> | undefined;
  passHref?: true;
  [x: string]: any;
}) => {
  return (
    <Link
      href={href}
      {...props}
    >
      {children}
    </Link>
  );
};

export default LocalizedClientLink;
