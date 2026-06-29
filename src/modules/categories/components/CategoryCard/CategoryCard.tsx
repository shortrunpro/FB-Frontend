import Image from 'next/image';
import Link from 'next/link';

export function CategoryCard({
  category
}: {
  category: { name: string; handle: string; image?: string };
}) {
  console.log(category);
  return (
    <Link
      href={`/categories/${category.handle}`}
      className="relative flex aspect-square flex-col items-center justify-between rounded-sm border"
    >
      <div className="relative flex aspect-square overflow-hidden">
        {category?.image ? (
          <Image
            loading="lazy"
            src={category.image}
            alt={`category - ${category.name}`}
            width={300}
            height={300}
            sizes="(min-width: 1024px) 200px, 40vw"
            className="object-contain"
          />
        ) : (
          <Image
            loading="lazy"
            src={'/federal-brace-logo.jpg'}
            alt={`category - ${category.name}`}
            width={300}
            height={300}
            sizes="(min-width: 1024px) 200px, 40vw"
            className="object-contain"
          />
        )}
      </div>
      <div className="w-full bg-brand_grey px-2 py-2">
        <h3 className="label-lg text-center text-brand">{category.name}</h3>
      </div>
    </Link>
  );
}
