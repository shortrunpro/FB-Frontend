import Link from 'next/link';

import { TabsTrigger } from '@/components/atoms';

export const TabsList = ({
  list,
  activeTab,
  'data-testid': dataTestId
}: {
  list: { label: string; link: string }[];
  activeTab: string;
  'data-testid'?: string;
}) => {
  return (
    <div
      className="flex w-full gap-4"
      data-testid={dataTestId ?? 'tabs-list'}
    >
      {list.map(({ label, link }) => (
        <Link
          key={label}
          href={link}
        >
          <TabsTrigger isActive={activeTab === label.toLowerCase()}>{label}</TabsTrigger>
        </Link>
      ))}
    </div>
  );
};
