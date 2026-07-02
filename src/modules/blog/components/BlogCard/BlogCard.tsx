import Image from 'next/image';
import Link from 'next/link';

import { ArrowRightIcon } from '@/icons';
import { cn } from '@/lib/utils';
import { BlogListItem } from '@/types/blog';

const BlogCard = ({ blog, index }: { blog: BlogListItem; index: number }) => {
  return (
    <Link
      href={`/blog/${blog.handle}`}
      className={cn('flex flex-col rounded-md hover:shadow-lg')}
    >
      <div
        className="relative h-full overflow-hidden rounded-xs rounded-b-none"
        itemProp="image"
        itemScope
        itemType="https://schema.org/ImageObject"
      >
        <Image
          loading="lazy"
          sizes="(min-width: 1024px) 33vw, 100vw"
          src={blog.main_image.replace(/.jpg|.jpeg|.png|.JPG|.JPEG|.PNG/g, '.webp')}
          alt={blog.title}
          width={467}
          height={472}
          className="h-full max-h-[472px] w-full object-cover"
          itemProp=""
        />
      </div>
      <div className="rounded-b-xs bg-brand_grey p-4 text-brand">
        <h3 className="heading-sm line-clamp-1">{blog.title}</h3>
        <p className="text-md line-clamp-3">{blog.subtitle}</p>
        <div className="label-md mt-[26px] flex items-center uppercase">
          Read more{' '}
          <ArrowRightIcon
            size={20}
            color={'#49576f'}
          />
        </div>
      </div>
    </Link>
  );
};
export default BlogCard;
