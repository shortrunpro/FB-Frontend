'use client';

import { use } from 'react';

import { ListCategoriesResponse } from '@/types/categories';

import { CategoryCard } from '../components';

const CategoryList = ({ categories }: { categories: Promise<ListCategoriesResponse> }) => {
  const allCategories = use(categories);

  return (
    <div className="grid grid-cols-6 gap-x-2 gap-y-4">
      {allCategories.parentCategories.map(category => (
        <CategoryCard
          key={category.id}
          category={category}
        />
      ))}
    </div>
  );
};

export default CategoryList;
