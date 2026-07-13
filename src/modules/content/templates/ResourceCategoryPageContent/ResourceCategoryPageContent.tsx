import { fetchResourceCategoryByHandle } from '@/lib/data/resources';

import { ResourceCategoryItemsList } from '../../components';

const ResourceCategoryPageContent = async ({ handle }: { handle: string }) => {
  const { data, ok } = await fetchResourceCategoryByHandle({ handle });

  return (
    <section className="flex w-full flex-col gap-4">
      <div className="mb-4 flex items-center justify-center align-middle">
        <h1 className="heading-lg">{data.title}</h1>
        {/* {data?.subtitle && <h2 className="heading-sm">{data.subtitle}</h2>} */}
      </div>

      {ok && <ResourceCategoryItemsList items={data.items} />}
    </section>
  );
};

export default ResourceCategoryPageContent;
