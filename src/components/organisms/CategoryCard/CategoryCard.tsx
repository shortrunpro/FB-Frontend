import Image from 'next/image';

import LocalizedClientLink from '@/components/molecules/LocalizedLink/LocalizedLink';

export function CategoryCard({
  category
}: {
  category: { name: string; handle: string; image: string };
}) {
  return (
    <LocalizedClientLink
      href={`/categories/${category.handle}`}
      className="relative flex aspect-square flex-col items-center justify-between rounded-sm border bg-component transition-all hover:rounded-full"
    >
      <div className="relative flex aspect-square overflow-hidden">
        <Image
          loading="lazy"
          src={category.image}
          alt={`category - ${category.name}`}
          width={300}
          height={300}
          sizes="(min-width: 1024px) 200px, 40vw"
          className="rounded-full object-contain"
        />
      </div>
      <h3 className="label-lg w-full bg-brand_grey py-2 text-center text-brand">{category.name}</h3>
    </LocalizedClientLink>
  );
}
