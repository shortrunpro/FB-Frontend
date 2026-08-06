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
import { getVariantOptions, getVariantPrices } from '@/lib/helpers/get-variant-data';
import { useCartContext } from '@/modules/cart/provider/context';
import {
  AddToCartButton,
  FinishSquare,
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
            size: size?.value,
            price: variant.calculated_price?.calculated_amount
          };
        })
      : [];
  }, [product]);

  const { finishes } = getVariantOptions(product?.variants as any[]);
  const initialState: InitialValue = variants.reduce((obj, item) => {
    // @ts-ignore
    obj[item.id] = '';
    return obj;
  }, {});
  const [cartQuantity, setCartQuantity] = useState<InitialValue>(initialState);
  const [variant, setVariant] = useState<StoreProductVariant | null>(null);

  /**      PRODUCT SORTING       **/
  const [sorting, setSorting] = useState<DataTableSortingState | null>({
    id: 'size',
    desc: false
  });
  const sortedProducts = useMemo(() => {
    if (!sorting) {
      return variants;
    }
    return variants.slice().sort((a, b) => {
      const aVal =
        sorting.id === 'size'
          ? Number(a[sorting.id]?.split('x')[0].trim())
          : // @ts-ignore
            a[sorting.id];
      // @ts-ignore
      const bVal =
        sorting.id === 'size'
          ? Number(b[sorting.id]?.split('x')[0].trim())
          : // @ts-ignore
            b[sorting.id];
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
        enableSorting: true
      }),
      columnHelper.accessor('size', {
        header: 'Size',
        enableSorting: true
      }),
      columnHelper.accessor('price', {
        header: 'Price',
        enableSorting: true,
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
      className="rou my-4 space-y-2"
      data-testid="product-variants"
    >
      <DataTable
        instance={table}
        className="gap-y-8"
      >
        <div className="flex flex-col items-start justify-between gap-2 md:flex-row md:items-center">
          <div data-testid={`product-variant-finishes`}>
            <span className="label-md-medium">FINISHES: </span>
            <div className="mt-2 flex gap-2">
              {(finishes || []).map(value => (
                <Chip
                  className=""
                  key={value}
                  selected={selectedFinish === value}
                  value={
                    <span className="label-md-medium flex gap-x-2">
                      <FinishSquare finish={value} /> {value}
                    </span>
                  }
                  onSelect={() => handleSelectedFinish(value)}
                  data-testid={`product-variant-chip-finishes-${value?.toLowerCase().replace(/\s+/g, '-')}`}
                />
              ))}
            </div>
          </div>
        </div>
        <div data-testid="variants-datatable">
          <DataTable.Table />
          <DataTable.Pagination />
        </div>
      </DataTable>
      <AddToCartButton
        items={cartQuantity}
        icon={false}
      />
      {activeSku && variant && (
        <ProductVariantModal
          variant={variant}
          product={product}
        />
      )}
    </div>
  );
};
