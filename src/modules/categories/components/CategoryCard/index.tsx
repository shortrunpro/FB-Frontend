import { StoreProductCategory } from '@medusajs/types';
import Image from 'next/image';
import Link from 'next/link';

import { CategoryListObject, StaticCategoryListObject } from '@/types/categories';

type Props = {
  category: CategoryListObject;
  nested?: boolean;
};
const CategoryCard = ({ category, nested = false }: Props) => {
  const handle = nested ? category?.handle : `categories/${category.handle}`;
  return (
    <Link
      href={handle}
      className="relative flex aspect-square flex-col items-center justify-between rounded-sm border bg-component transition-all hover:rounded-full"
    >
      <div className="relative flex aspect-square overflow-hidden">
        <Image
          loading="lazy"
          src={category?.product_category_image[0].url}
          alt={`category - ${category.name}`}
          width={300}
          height={300}
          sizes="(min-width: 1024px) 200px, 40vw"
          className="rounded-full object-contain"
        />
      </div>
      <h3 className="label-lg w-full bg-brand_grey py-2 text-center text-brand">{category.name}</h3>
      {/* <span>{category.description}</span> */}
    </Link>
  );
};

export default CategoryCard;
