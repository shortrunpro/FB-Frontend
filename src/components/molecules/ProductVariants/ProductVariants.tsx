'use client';

import { HttpTypes } from '@medusajs/types';

import { Chip } from '@/components/atoms';
import useUpdateSearchParams from '@/hooks/useUpdateSearchParams';

export const ProductVariants = ({
  product,
  selectedVariant
}: {
  product: HttpTypes.StoreProduct;
  selectedVariant: Record<string, string>;
}) => {
  const updateSearchParams = useUpdateSearchParams();

  // update the options when a variant is selected
  const setOptionValue = (optionId: string, value: string) => {
    if (value) updateSearchParams(optionId, value);
  };

  return (
    <div
      className="my-4 space-y-2"
      data-testid="product-variants"
    >
      {(product.options || []).map(({ id, title, values }: HttpTypes.StoreProductOption) => (
        <div
          key={id}
          data-testid={`product-variant-${title.toLowerCase()}`}
        >
          <span className="label-md text-secondary">{title.toUpperCase()}: </span>
          <div
            className="mt-2 flex gap-2"
            data-testid={`product-variant-options-${title.toLowerCase()}`}
          >
            {(
              values?.sort((a, b) =>
                title === 'finish'
                  ? a.value.localeCompare(b.value)
                  : Number(a.value) - Number(b.value)
              ) || []
            ).map(({ id, value }: Partial<HttpTypes.StoreProductOptionValue>) => (
              <Chip
                key={id}
                selected={selectedVariant[title.toLowerCase()] === value}
                color={title === 'Color'}
                value={value}
                onSelect={() => setOptionValue(title.toLowerCase(), value || '')}
                data-testid={`product-variant-chip-${title.toLowerCase()}-${value?.toLowerCase().replace(/\s+/g, '-')}`}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
