import { CategoryCard } from '@/modules/categories/components';

import categories from './categories.json';

export const HomeCategories = async ({ heading }: { heading: string }) => {
  return (
    <section
      className="w-full bg-primary px-2 py-8"
      data-testid="popular-categories-section"
    >
      <div className="mb-6">
        <h2 className="heading-lg uppercase text-brand">{heading}</h2>
      </div>
      <div className="grid grid-cols-2 gap-x-2 gap-y-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {categories?.map(category => (
          <CategoryCard
            key={category.id}
            category={category}
          />
        ))}
      </div>
    </section>
  );
};
