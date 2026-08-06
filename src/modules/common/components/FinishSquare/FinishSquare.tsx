import { cn } from '@/lib/utils';

export const FinishSquare = ({ finish }: { finish: string }) => {
  const bgLabel = finish.toLowerCase().replace(/[^A-Za-z0-9]/g, '-');
  const bg = `filter-${bgLabel}`;

  return (
    <div
      className={cn(
        `h-5 w-5 rounded-xs border border-black ${bg}`,
        Boolean(!finish) && 'opacity-30'
      )}
    />
  );
};
