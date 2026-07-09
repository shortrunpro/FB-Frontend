import { ContentParser } from '@/modules/common/components';
import { Blog } from '@/types/blog';

const BlogContent = ({ data }: { data: Blog }) => {
  return (
    <div className="mx-auto max-w-[900px]">
      <ContentParser content={data.content} />
    </div>
  );
};

export default BlogContent;
