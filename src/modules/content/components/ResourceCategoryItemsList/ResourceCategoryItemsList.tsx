import Link from 'next/link';

import { ResourceCategoryItems } from '@/types/resources';

const ResourceCategoryItemsList = ({ items }: { items: ResourceCategoryItems[] }) => {
  return (
    <ul className="grid grid-cols-3 justify-center gap-4 text-base/6">
      {items
        .toSorted((a, b) => a.title.localeCompare(b.title))
        .map(item => (
          <li
            key={item.id}
            className="line-clamp-1 flex justify-center text-brand"
          >
            <Link href={`/content/${item.handle}`}>{item.title}</Link>
          </li>
        ))}
    </ul>
  );
};

export default ResourceCategoryItemsList;
