import Image from 'next/image';

import { ContentParser } from '@/modules/common/components';
import { Blog } from '@/types/blog';

const BlogContent = ({ data }: { data: Blog }) => {
  return (
    <div className="mx-auto max-w-[900px]">
      <div
        data-testid="blog-main-image-container"
        className=""
      >
        <Image
          src={data.main_image.replace(/.jpg|.jpeg|.png|.JPG|.JPEG|.PNG/g, '.webp')}
          alt={`${data.title} Main Image`}
          sizes="100vw"
          width={1000}
          height={1000}
          className="h-auto w-full"
        />
      </div>
      <ContentParser content={data.content} />
    </div>
  );
};

export default BlogContent;
