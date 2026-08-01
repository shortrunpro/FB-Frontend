'use client';

import { useEffect, useMemo, useState } from 'react';

import { Minus, Plus } from '@medusajs/icons';
import { StoreProduct, StoreProductVariant } from '@medusajs/types';
import {
  createDataTableColumnHelper,
  DataTable,
  DataTableSortingState,
  IconButton,
  useDataTable,
  type DataTablePaginationState
} from '@medusajs/ui';
import { usePathname, useSearchParams } from 'next/navigation';

import { Chip, Input } from '@/components/atoms';
import { useCartContext } from '@/modules/cart/provider/context';
import { AddToCartButton, InteractiveLink } from '@/modules/common/components';

import ProductVariantModal from '../ProductVariantModal/ProductVariantModal';

export const ProductVariants = ({ product }: { product: StoreProduct }) => {
  const params = useSearchParams();
  const pathname = usePathname();
  const [variant, setVariant] = useState<StoreProductVariant | null>(null);
  const activeSku = params.get('sku');
  const { isAddingItem, isUpdating } = useCartContext();
  const PAGE_SIZE = 10;
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
  }, [product?.variants]);

  const [pagination, setPagination] = useState<DataTablePaginationState>({
    pageSize: PAGE_SIZE,
    pageIndex: 0
  });
  type InitialValue = {
    [key: string]: number;
  };
  const initialState: InitialValue = variants.reduce((obj, item) => {
    // @ts-ignore
    obj[item.id] = 0;
    return obj;
  }, {});
  const [cartQuantity, setCartQuantity] = useState<InitialValue>(initialState);
  const [selectedFinish, setSelectedFinish] = useState<string>();
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
  const shownProducts = useMemo(() => {
    return sortedProducts.slice(
      pagination.pageIndex * pagination.pageSize,
      (pagination.pageIndex + 1) * pagination.pageSize
    );
  }, [pagination, sortedProducts]);

  const plusHandler = (id: string) => {
    setCartQuantity({ ...cartQuantity, [id]: (cartQuantity[id] += 1) });
  };
  const minusHandler = (id: string) => {
    if (cartQuantity[id] > 0) {
      setCartQuantity({ ...cartQuantity, [id]: cartQuantity[id] - 1 });
    }
  };
  const finishes = product.options?.find(option => option.title === 'finish');
  const columnHelper = createDataTableColumnHelper<(typeof variants)[0]>();
  const columns = [
    columnHelper.accessor('sku', {
      header: 'Product SKU',
      id: 'sku',
      cell: ({ getValue }) => {
        const value = getValue();
        const v = shownProducts.find(f => f.sku === value);
        return (
          v && v.sku && <InteractiveLink href={`${pathname}?sku=${v.sku}`}>{value}</InteractiveLink>
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
      cell: ({ getValue }) => {
        const value = getValue();
        return (
          <div className="flex items-center">
            <IconButton
              onClick={() => minusHandler(value)}
              value={value}
            >
              <Minus />
            </IconButton>
            <div className="w-1/3">
              <Input
                className="py-2 text-center"
                id={value}
                value={cartQuantity[value]}
              />
            </div>

            <IconButton onClick={() => plusHandler(value)}>
              <Plus />
            </IconButton>
          </div>
        );
      }
    })
  ];
  const table = useDataTable({
    columns,
    data: shownProducts,
    getRowId: variant => variant.id,
    rowCount: variants.length,
    pagination: {
      // Pass the pagination state and updater to the table instance
      state: pagination,
      onPaginationChange: setPagination
    },
    sorting: {
      // Pass the pagination state and updater to the table instance
      state: sorting,
      onSortingChange: setSorting
    },
    isLoading: false
  });
  useEffect(() => {
    if (isAddingItem || isUpdating) {
      setCartQuantity(initialState);
    }
  }, [isAddingItem, isUpdating]);
  const handleSelectedFinish = (e: any) => {
    setSelectedFinish(e.target.value);
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
            <span className="label-md text-secondary">FINISHES: </span>
            <div className="mt-2 flex gap-2">
              {(finishes?.values || []).map(({ id, value }) => (
                <Chip
                  key={id}
                  selected={selectedFinish === value}
                  value={value}
                  onSelect={() => setSelectedFinish(value)}
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
