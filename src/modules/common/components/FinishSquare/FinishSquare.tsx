import { cn } from '@/lib/utils';

export const FinishSquare = ({ finish }: { finish: string }) => {
  const bgLabel = finish ? finish.toLowerCase().replace(/[^A-Za-z0-9]/g, '-') : null;
  const bg = `filter-${bgLabel}`;

  return (
    finish && (
      <div
        className={cn(
          `h-5 w-5 rounded-xs border border-black ${bg}`,
          Boolean(!finish) && 'opacity-30'
        )}
      />
    )
  );
};
