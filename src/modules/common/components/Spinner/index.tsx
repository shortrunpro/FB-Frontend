export const Spinner = ({
  'data-testid': dataTestId,
  variant = 'lg',
  className
}: {
  'data-testid'?: string;
  variant?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}) => {
  return (
    <div
      className={`loading loading-spinner loading-lg ${className ?? ''}`}
      data-testid={dataTestId ?? 'spinner'}
    />
  );
};
