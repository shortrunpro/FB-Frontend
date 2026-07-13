import { fetchResourceByHandle } from '@/lib/data/resources';
import { Breadcrumbs, ContentParser } from '@/modules/common/components';

const ResourcePageContent = async ({ handle }: { handle: string }) => {
  const { data, ok } = await fetchResourceByHandle({ handle });
  console.log(data);
  return (
    <section className="w-full">
      <Breadcrumbs
        items={[
          {
            label: data.resource_category?.title,
            path: `/content/category/${data.resource_category?.handle}`
          },
          { label: data.title, path: `/content/${data.handle}` }
        ]}
      />
      <h1 className="heading-md">{data.title}</h1>
      {/* <h2 className="heading-xs">{data.subtitle}</h2> */}
      <div className="mx-auto max-w-[1000px]">
        <ContentParser content={data.content} />
      </div>
    </section>
  );
};

export default ResourcePageContent;
