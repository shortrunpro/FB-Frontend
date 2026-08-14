import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  isActive?: boolean;
  disabled?: boolean;
  'data-testid'?: string;
}

export const PaginationButton = ({
  children,
  className = '',
  isActive = false,
  disabled = false,
  'data-testid': dataTestId,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        'label-md-medium flex h-10 w-10 cursor-pointer items-center justify-center rounded-sm border hover:bg-component-hover',
        isActive && 'cursor-default border-primary bg-brand text-white hover:bg-brand',
        disabled && 'cursor-default border bg-primary text-disabled hover:bg-primary',
        className
      )}
      disabled={disabled}
      data-testid={dataTestId ?? 'pagination-button'}
      {...props}
    >
      {children}
    </button>
  );
};
