import { Breadcrumbs, ContentParser } from '@/modules/common/components';
import { Resource } from '@/types/resources';

const ResourcePageContent = async ({ resource }: { resource: Resource }) => {
  return (
    <section className="w-full">
      <Breadcrumbs
        items={[
          {
            label: resource.resource_category?.title,
            path: `/content/category/${resource.resource_category?.handle}`
          },
          { label: resource.title, path: `/content/${resource.handle}` }
        ]}
      />
      <h1 className="heading-lg mb-5">{resource.title}</h1>
      <div className="mx-auto max-w-[1000px]">
        <ContentParser content={resource.content} />
      </div>
    </section>
  );
};

export default ResourcePageContent;
