import { cn } from '@/lib/utils';

export const Spinner = ({
  'data-testid': dataTestId,
  variant = 'lg',
  className = ''
}: {
  'data-testid'?: string;
  variant?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}) => {
  const loadingClass = `loading-${variant}`;
  return (
    <div
      className={cn('loading loading-spinner', className, loadingClass)}
      data-testid={dataTestId ?? 'spinner'}
    />
  );
};
