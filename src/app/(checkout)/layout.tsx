import Image from 'next/image';
import Link from 'next/link';

import { CollapseIcon } from '@/icons';
import { Button } from '@/modules/common/components';

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header>
        <div className="relative w-full px-4 py-4 lg:px-8">
          <div className="absolute top-3">
            <Link href="/cart">
              <Button
                variant="tonal"
                className="flex items-center gap-2"
              >
                <CollapseIcon className="rotate-90" />
                <span className="hidden lg:block">Back to cart</span>
              </Button>
            </Link>
          </div>
          <div className="flex w-full items-center justify-center pl-4 lg:pl-0">
            <Link
              href="/"
              className="text-2xl font-bold"
            >
              <Image
                src="/federal-brace-logo.jpg"
                width={316}
                height={43}
                alt="Logo"
                priority
              />
            </Link>
          </div>
        </div>
      </header>
      {children}
    </>
  );
}
