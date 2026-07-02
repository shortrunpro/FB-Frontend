import { fetchBlogByHandle } from '@/lib/data/blog';
import { BlogContent } from '@/modules/blog/templates';
import { Breadcrumbs } from '@/modules/common/components';

// TODO dynamic metadata
export default async function BlogPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const blog = await fetchBlogByHandle({ handle });
  return (
    <main className="container-columns flex flex-grow flex-col">
      {blog.data && (
        <>
          <Breadcrumbs
            items={[
              { label: 'Blog', path: '/blog' },
              { label: blog.data.title, path: `/blog/${handle}` }
            ]}
          />
          <BlogContent data={blog.data} />
        </>
      )}
    </main>
  );
}
