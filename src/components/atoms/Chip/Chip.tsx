import { cn } from '@/lib/utils';

interface ChipProps {
  value?: React.ReactNode | string;
  selected?: boolean;
  disabled?: boolean;
  color?: boolean;
  onSelect?: () => void;
  className?: string;
  'data-testid'?: string;
}

export function Chip({
  value,
  selected,
  disabled,
  color,
  onSelect,
  className,
  'data-testid': dataTestId
}: ChipProps) {
  const baseClasses = 'chip-wrapper';
  const selectedClasses = selected ? 'bg-brand text-white hover:text-brand' : '';
  const hoverClasses = !disabled && !selected ? 'hover:bg-gray-200' : '';
  const disabledClasses = disabled
    ? 'bg-component border-disabled/50 hover:bg-component cursor-not-allowed text-disabled'
    : 'cursor-pointer';
  const colorClasses = color ? 'w-[40px] h-[40px] border' : '';

  return (
    <div
      data-disabled={disabled}
      className={cn(
        baseClasses,
        colorClasses,
        selectedClasses,
        hoverClasses,
        disabledClasses,
        className
      )}
      onClick={!disabled ? onSelect : undefined}
      role="button"
      tabIndex={disabled ? -1 : 0}
      data-testid={dataTestId ?? 'chip'}
    >
      {color ? (
        <span
          className={cn(
            'absolute left-[3px] top-[3px] h-[32px] w-[32px] rounded-xs bg-action',
            disabled && 'bg-disabled'
          )}
          style={{
            backgroundColor: (value || '').toString()
          }}
        />
      ) : (
        value
      )}
    </div>
  );
}
