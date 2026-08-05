import Image from 'next/image';
import Link from 'next/link';

import { ArrowRightIcon } from '@/icons';
import { cn } from '@/lib/utils';
import { BlogPost } from '@/types/blog';

import tailwindConfig from '../../../../tailwind.config';

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export function BlogCard({ post, index }: BlogCardProps) {
  return (
    <Link
      href={post.href}
      className={cn(
        'group relative block rounded-sm border border-secondary p-1',
        index > 0 && 'hidden lg:block'
      )}
    >
      <div className="relative h-full overflow-hidden rounded-xs">
        <Image
          loading="lazy"
          sizes="(min-width: 1024px) 33vw, 100vw"
          src={decodeURIComponent(post.image)}
          alt={post.title}
          width={467}
          height={472}
          className="h-full max-h-[472px] w-full object-cover"
        />
      </div>
      <div className="absolute bottom-0 left-1 w-[calc(100%-8px)] rounded-b-xs bg-tertiary p-4 text-tertiary transition-all duration-300 group-hover:opacity-100 lg:opacity-0">
        <h3 className="heading-sm">{post.title}</h3>
        <p className="text-md line-clamp-2">{post.excerpt}</p>
        <div className="label-md mt-[26px] flex items-center gap-4 uppercase">
          Read more{' '}
          <ArrowRightIcon
            size={20}
            color={tailwindConfig.theme.extend.colors.tertiary}
          />
        </div>
      </div>
    </Link>
  );
}
