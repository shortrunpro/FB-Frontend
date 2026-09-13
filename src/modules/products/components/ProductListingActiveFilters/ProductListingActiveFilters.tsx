'use client';

import { ActiveFilterElement } from '@/components/cells';
import useGetAllSearchParams from '@/hooks/useGetAllSearchParams';
import { filteredParams } from '@/lib/helpers/get-faced-filters';

export const ProductListingActiveFilters = () => {
  const { allSearchParams } = useGetAllSearchParams();
  const filters = Object.entries(allSearchParams).filter(
    element =>
      element[0] !== 'sortBy' &&
      element[0] !== 'page' &&
      element[0] !== 'sold' &&
      element[0] !== 'products[page]' &&
      !element[0].includes('_rsc') &&
      !element[0].includes('utm') &&
      !filteredParams.includes(element[0])
  );

  return (
    <div className="no-scrollbar flex gap-4 overflow-x-scroll">
      {filters.map(filter => (
        <ActiveFilterElement
          key={filter[0]}
          filter={filter}
        />
      ))}
    </div>
  );
};
