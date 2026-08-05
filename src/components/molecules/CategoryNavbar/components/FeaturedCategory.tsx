import { HttpTypes } from '@medusajs/types';
import Image from 'next/image';
import Link from 'next/link';

import { ArrowRightIcon } from '@/icons';

interface Props {
  category: HttpTypes.StoreProductCategory;
  onLinkClick?: () => void;
}

export const FeaturedCategory = ({ category, onLinkClick }: Props) => {
  return (
    <Link
      href={`/categories/${category.handle}`}
      onClick={onLinkClick}
      className="flex h-full w-full flex-col"
    >
      <div className="bg-initial relative aspect-square h-full max-h-[248px] w-full rounded-t-sm">
        {category && category.metadata && (
          <Image
            src={category.metadata?.image_url as string}
            alt={category.name}
            width={100}
            height={100}
            className="h-full w-full rounded-sm object-cover p-1"
          />
        )}
      </div>

      <div className="bg-initial mt-auto flex flex-col gap-y-2 p-4">
        <h3 className="heading-md uppercase text-primary">{category.name}</h3>
        <div className="flex items-center gap-x-2">
          <p className="label-md uppercase">Shop Now</p>
          <ArrowRightIcon className="h-4 w-4" />
        </div>
      </div>
    </Link>
  );
};
