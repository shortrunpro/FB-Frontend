'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import { StoreProduct, StoreProductOption, StoreProductVariant } from '@medusajs/types';
import {
  createDataTableColumnHelper,
  DataTable,
  DataTableFilteringState,
  DataTableSortingState,
  useDataTable,
  type DataTablePaginationState
} from '@medusajs/ui';
import { usePathname, useSearchParams } from 'next/navigation';

import { Chip } from '@/components/atoms';
import { useCartContext } from '@/modules/cart/provider/context';
import {
  AddToCartButton,
  InteractiveLink,
  ProductQuantityInput
} from '@/modules/common/components';

import ProductVariantModal from '../ProductVariantModal/ProductVariantModal';

interface InitialValue {
  [key: string]: number;
}
const PAGE_SIZE = 10;
export const ProductVariants = ({ product }: { product: StoreProduct }) => {
  const { isAddingItem, isUpdating } = useCartContext();
  const params = useSearchParams();
  const activeSku = params.get('sku');
  const pathname = usePathname();
  const variants = useMemo(() => {
    return product?.variants
      ? product?.variants.map(variant => {
          let finish = variant.options?.find(option => option.option?.title === 'finish');
          let size = variant.options?.find(option => option.option?.title === 'size');
          return {
            ...variant,
            finish: finish?.value,
            size: size?.value
          };
        })
      : [];
  }, [product]);

  const finishes = product?.options?.find(
    option => option.title === 'finish'
  ) as StoreProductOption;
  const initialState: InitialValue = variants.reduce((obj, item) => {
    // @ts-ignore
    obj[item.id] = '';
    return obj;
  }, {});
  const [cartQuantity, setCartQuantity] = useState<InitialValue>(initialState);
  const [variant, setVariant] = useState<StoreProductVariant | null>(null);

  /**      PRODUCT SORTING       **/
  const [sorting, setSorting] = useState<DataTableSortingState | null>(null);
  const sortedProducts = useMemo(() => {
    if (!sorting) {
      return variants;
    }
    return variants.sort((a, b) => {
      // @ts-ignore
      const aVal = a[sorting.id];
      // @ts-ignore
      const bVal = b[sorting.id];
      if (aVal < bVal) {
        return sorting.desc ? 1 : -1;
      }
      if (aVal > bVal) {
        return sorting.desc ? -1 : 1;
      }
      return 0;
    });
  }, [sorting, variants]);
  const [filtering, setFiltering] = useState<DataTableFilteringState>({});
  /**      TABLE PAGINATION       **/
  const [pagination, setPagination] = useState<DataTablePaginationState>({
    pageSize: PAGE_SIZE,
    pageIndex: 0
  });
  const filteredProducts = useMemo(() => {
    return sortedProducts.filter(product => {
      return Object.entries(filtering).every(([key, value]) => {
        if (!value) {
          return true;
        }
        if (typeof value === 'string') {
          // @ts-ignore
          return product[key].toString().toLowerCase().includes(value.toString().toLowerCase());
        }
        if (Array.isArray(value)) {
          // @ts-ignore
          return value.includes(product[key].toLowerCase());
        }
      });
    });
  }, [filtering, sortedProducts]);

  const shownProducts = useMemo(() => {
    return filteredProducts.slice(
      pagination.pageIndex * pagination.pageSize,
      (pagination.pageIndex + 1) * pagination.pageSize
    );
  }, [pagination, filteredProducts]);
  const [selectedFinish, setSelectedFinish] = useState<string>();

  const handleQuantityChange = useCallback((id: string, newValue: number) => {
    setCartQuantity(prev => ({
      ...prev,
      [id]: newValue
    }));
  }, []);

  const columnHelper = createDataTableColumnHelper<(typeof variants)[0]>();
  const columns = useMemo(
    () => [
      columnHelper.accessor('sku', {
        header: 'Product SKU',
        id: 'sku',
        cell: ({ getValue }) => {
          const value = getValue();
          const v = shownProducts.find(f => f.sku === value);
          return (
            v &&
            v.sku && <InteractiveLink href={`${pathname}?sku=${v.sku}`}>{value}</InteractiveLink>
          );
        }
      }),
      columnHelper.accessor('finish', {
        header: 'Finish',
        enableSorting: true,
        sortLabel: 'Finish',
        // If omitted the default value will be "A-Z"
        sortAscLabel: 'A-Z',
        // If omitted the default value will be "Z-A"
        sortDescLabel: 'Z-A'
      }),
      columnHelper.accessor('size', {
        header: 'Size'
        // enableSorting: true
      }),
      columnHelper.accessor('calculated_price.calculated_amount', {
        header: 'Price',
        cell: ({ getValue }) => {
          const amount = getValue();
          return `$${amount?.toFixed(2)}`;
        }
      }),
      columnHelper.accessor('id', {
        header: 'Quantity',
        id: 'quantity',
        cell: ({ row }) => {
          return (
            <div className="w-2/3">
              <ProductQuantityInput
                id={row.id}
                initialQuantity={cartQuantity[row.id]}
                onUpdate={handleQuantityChange}
              />
            </div>
          );
        }
      })
    ],
    [cartQuantity, handleQuantityChange, columnHelper, pathname, shownProducts]
  );

  const table = useDataTable({
    columns,
    data: shownProducts,
    getRowId: variant => variant.id,
    rowCount: filtering?.finish ? filteredProducts.length : variants.length,
    pagination: {
      state: pagination,
      onPaginationChange: setPagination
    },
    sorting: {
      state: sorting,
      onSortingChange: setSorting
    },
    isLoading: false
  });
  useEffect(() => {
    if (isAddingItem || isUpdating) {
      setCartQuantity(initialState);
    }
  }, [isAddingItem, isUpdating, initialState]);
  const handleSelectedFinish = (value: string) => {
    if (filtering?.finish === value) {
      setFiltering({});
      setSelectedFinish('');
    } else {
      setFiltering({ finish: value });
      setSelectedFinish(value);
    }

    setPagination(prev => ({ ...prev, pageIndex: 0 }));
  };
  useEffect(() => {
    const selectedVariant = shownProducts.find(v => v.sku === activeSku);
    selectedVariant && setVariant(selectedVariant);
  }, [activeSku, shownProducts]);
  return (
    <div
      className="my-4 space-y-2"
      data-testid="product-variants"
    >
      <DataTable instance={table}>
        <DataTable.Toolbar className="flex flex-col items-start justify-between gap-2 md:flex-row md:items-center">
          <div data-testid={`product-variant-finishes`}>
            <span className="label-md-medium">FINISHES: </span>
            <div className="mt-2 flex gap-2">
              {(finishes?.values || []).map(({ id, value }) => (
                <Chip
                  className=""
                  key={id}
                  selected={selectedFinish === value}
                  value={value}
                  onSelect={() => handleSelectedFinish(value)}
                  data-testid={`product-variant-chip-finishes-${value?.toLowerCase().replace(/\s+/g, '-')}`}
                />
              ))}
            </div>
          </div>
        </DataTable.Toolbar>
        <DataTable.Table />
        <DataTable.Pagination />
      </DataTable>
      <AddToCartButton
        items={cartQuantity}
        icon={false}
      />
      {activeSku && variant && <ProductVariantModal variant={variant} />}
    </div>
  );
};
