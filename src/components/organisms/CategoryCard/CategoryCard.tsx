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
      className="relative flex aspect-square w-[233px] flex-col items-center justify-between rounded-sm border bg-component transition-all hover:rounded-full"
    >
      <div className="relative flex aspect-square w-[200px] overflow-hidden">
        <Image
          loading="lazy"
          src={category.image}
          alt={`category - ${category.name}`}
          width={200}
          height={200}
          sizes="(min-width: 1024px) 200px, 40vw"
          className="scale-90 rounded-full object-contain"
        />
      </div>
      <h3 className="label-lg text-brand w-full bg-brand_grey py-2 text-center">{category.name}</h3>
    </LocalizedClientLink>
  );
}
