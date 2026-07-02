import { listBlogs } from '@/lib/data/blog';
import { PaginationContainer } from '@/modules/common/components/Pagination/PaginationContainer';

import { BlogCard } from '../../components';

const BlogsList = async ({ page }: { page: string | string[] | undefined }) => {
  const blogs = await listBlogs({ page });
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {blogs &&
          blogs.blogs.map((blog, index) => (
            <BlogCard
              key={blog.id}
              blog={blog}
              index={index}
            />
          ))}
      </div>
      <PaginationContainer pages={blogs.count / blogs.limit} />
    </section>
  );
};

export default BlogsList;
