import { Blog } from '@/types/blog';

import { ContentParser } from '../../components';

const BlogContent = ({ data }: { data: Blog }) => {
  return (
    <div className="mx-auto max-w-[900px]">
      <ContentParser content={data.content} />
    </div>
  );
};

export default BlogContent;
