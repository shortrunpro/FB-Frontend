import { HttpTypes } from '@medusajs/types';
import Image from 'next/image';
import Link from 'next/link';

import { DeleteCartItemButton } from '@/components/molecules';
import { filterValidCartItems } from '@/lib/helpers/filter-valid-cart-items';
import { convertToLocale } from '@/lib/helpers/money';

import { UpdateCartItemButton } from '../UpdateCartItemButton/UpdateCartItemButton';

export const CartItemsProducts = ({
  products,
  currency_code,
  delete_item = true,
  change_quantity = true,
  closeDrawer
}: {
  products: HttpTypes.StoreCartLineItem[];
  currency_code: string;
  delete_item?: boolean;
  change_quantity?: boolean;
  closeDrawer?: () => void;
}) => {
  // Filter out items with invalid data (missing prices/variants)
  const validProducts = filterValidCartItems(products);
  /**
   * @description
   * Function passed down by the cart drawer to handle closing the drawer when a product link is clicked
   */
  const handleClose = () => {
    if (closeDrawer) {
      closeDrawer();
    }
  };
  return (
    <div>
      {validProducts.map(product => {
        const { options, sku } = product.variant ?? {};

        const total = convertToLocale({
          amount: product.subtotal ?? 0,
          currency_code
        });

        return (
          <div
            key={product.id}
            data-testid={`cart-item-${product.id}`}
            className="flex gap-4 rounded-sm border p-1"
          >
            <Link
              href={`/products/${product.product_handle}`}
              onClick={handleClose}
            >
              <div
                className="flex h-[132px] w-[100px] items-center justify-center"
                data-testid="cart-item-image"
              >
                {product.thumbnail ? (
                  <Image
                    src={decodeURIComponent(product.thumbnail)}
                    alt="Product thumbnail"
                    width={100}
                    height={132}
                    className="h-[132px] w-[100px] rounded-xs object-contain"
                  />
                ) : (
                  <Image
                    src={'/images/placeholder.svg'}
                    alt="Product thumbnail"
                    width={50}
                    height={66}
                    className="h-[66px] w-[50px] rounded-xs object-contain opacity-30"
                  />
                )}
              </div>
            </Link>

            <div className="w-full p-2">
              <div className="flex justify-between gap-x-4 lg:mb-2">
                <Link
                  href={`/products/${product.product_handle}`}
                  onClick={handleClose}
                >
                  <div className="mb-4 lg:mb-0">
                    <h3
                      className="label-lg truncate font-medium uppercase"
                      data-testid="cart-item-title"
                    >
                      {product.product_title}
                    </h3>
                    <p className="label-md">
                      SKU: <span className="label-md-medium">{sku}</span>
                    </p>
                  </div>
                </Link>
                {delete_item && (
                  <div className="lg:flex">
                    <DeleteCartItemButton id={product.id} />
                  </div>
                )}
              </div>
              <div className="-mt-4 justify-between lg:mt-0 lg:flex">
                <div
                  className="label-md text-secondary"
                  data-testid="cart-item-details"
                >
                  <div className="">
                    {options?.map(({ option, id, value }) => (
                      <p
                        key={id}
                        className="flex gap-x-2"
                      >
                        {option?.title}: <span className="label-md-medium">{value}</span>
                      </p>
                    ))}
                  </div>
                  {change_quantity && product.variant_id ? (
                    <UpdateCartItemButton
                      quantity={product.quantity}
                      lineItemId={product.id}
                    />
                  ) : (
                    <p>
                      Quantity: <span className="text-primary">{product.quantity}</span>
                    </p>
                  )}
                </div>
                <div className="mt-4 flex items-center gap-2 lg:mt-0 lg:block lg:text-right">
                  <p
                    className="label-lg"
                    data-testid="cart-item-price"
                  >
                    {total}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
