import { CategoryCard } from '@/components/organisms';

import categories from './categories.json';

export const HomeCategories = async ({ heading }: { heading: string }) => {
  return (
    <section
      className="w-full bg-primary py-8"
      data-testid="popular-categories-section"
    >
      <div className="mb-6">
        <h2 className="heading-lg uppercase text-brand">{heading}</h2>
      </div>
      <div className="grid grid-cols-6 gap-x-2 gap-y-4">
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
