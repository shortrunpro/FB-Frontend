import Image from 'next/image';
import Link from 'next/link';

import { Brand } from '@/types/brands';

interface BrandCardProps {
  brand: Brand;
}

export function BrandCard({ brand }: BrandCardProps) {
  return (
    <Link href={brand.href}>
      <div className="relative flex h-[320px] w-[320px] items-center justify-center rounded-sm border border-secondary bg-action transition-all duration-200 hover:rounded-full 2xl:h-[400px] 2xl:w-[400px]">
        <Image
          src={decodeURIComponent(brand.logo)}
          alt={brand.name}
          fill
          className="object-contain brightness-0 invert"
        />
      </div>
    </Link>
  );
}
