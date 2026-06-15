'use client';

import { useMemo, useState } from 'react';

import { Minus, Plus } from '@medusajs/icons';
import { HttpTypes } from '@medusajs/types';
import {
  createDataTableColumnHelper,
  DataTable,
  DataTableSortingState,
  IconButton,
  useDataTable,
  type DataTablePaginationState
} from '@medusajs/ui';

import { Button, Chip, Input } from '@/components/atoms';
import { useCartContext } from '@/modules/cart/provider/context';

export const ProductVariants = ({ product }: { product: HttpTypes.StoreProduct }) => {
  const { handleBulkAddToCart, isAddingItem } = useCartContext();
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
      header: 'Product SKU'
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
  const handleAddToCart = async () => {
    try {
      await handleBulkAddToCart(cartQuantity).then(() => setCartQuantity(initialState));
    } catch (err) {
      console.error('oops something went wrong', err);
    }
  };
  const handleSelectedFinish = (e: any) => {
    setSelectedFinish(e.target.value);
  };
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
      <Button
        onClick={handleAddToCart}
        loading={isAddingItem}
        className="mb-4 flex w-full justify-center bg-yellow-500 font-extrabold uppercase text-brand"
        size="small"
        data-testid="product-add-to-cart-button"
      >
        ADD TO CART
      </Button>
    </div>
  );
};
