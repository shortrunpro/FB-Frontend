'use client';

import { PropsWithChildren, useCallback, useEffect, useState } from 'react';

import { StoreCart } from '@medusajs/types';
import { useToggleState } from '@medusajs/ui';

import {
  addToCartBulk,
  addToCart as apiAddToCart,
  deleteLineItem as apiDeleteLineItem,
  updateLineItem as apiUpdateLineItem,
  retrieveCart
} from '@/lib/data/cart';
import { Cart, StoreCartLineItemOptimisticUpdate } from '@/types/cart';
import { BulkAddToCartParams } from '@/types/product';

import { CartContext } from './context';

interface CartProviderProps extends PropsWithChildren {
  cart: Cart | StoreCart | null;
}

export function CartProvider({ cart, children }: CartProviderProps) {
  const [cartState, setCartState] = useState(cart);
  const { state: open, toggle: toggleOpen } = useToggleState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [isUpdatingItem, setIsUpdatingItem] = useState(false);
  const [isRemovingItem, setIsRemovingItem] = useState(false);

  useEffect(() => {
    setCartState(cart);
  }, [cart]);

  const refreshCart = useCallback(async () => {
    try {
      const cartData = await retrieveCart();
      setCartState(cartData);
      return cartData;
    } catch (error) {
      console.error('Error fetching cart:', error);
      return null;
    }
  }, []);

  function handleAddToCart(newItem: StoreCartLineItemOptimisticUpdate, currency_code: string) {
    setCartState(prev => {
      const currentItems = prev?.items || [];
      const isNewItemInCart = currentItems.find(
        ({ variant_id }) => variant_id === newItem.variant_id
      );

      if (isNewItemInCart) {
        const updatedItems = currentItems.map(currentItem => {
          if (currentItem.variant_id !== newItem.variant_id) {
            return currentItem;
          }

          const newQuantity = currentItem.quantity + (newItem?.quantity || 0);
          return {
            ...currentItem,
            quantity: newQuantity,
            subtotal: newQuantity * (newItem?.subtotal || 0),
            total: newQuantity * (newItem?.total || 0),
            tax_total: newQuantity * (newItem?.tax_total || 0)
          };
        }) as StoreCartLineItemOptimisticUpdate[];

        const { item_subtotal, total, tax_total } = getItemsSummaryValues(updatedItems);

        return {
          ...prev,
          items: updatedItems,
          item_subtotal,
          total,
          tax_total,
          currency_code
        } as Cart;
      }

      const updatedItems = [...currentItems, newItem] as StoreCartLineItemOptimisticUpdate[];

      const { item_subtotal, total, tax_total } = getItemsSummaryValues(updatedItems);

      return {
        ...prev,
        items: updatedItems,
        item_subtotal,
        total,
        tax_total,
        currency_code
      } as Cart;
    });
  }

  const updateCartItem = async (lineId: string, quantity: number) => {
    if (!cartState?.items) return;

    setIsUpdatingItem(true);
    setIsUpdating(true);

    const optimisticCart = {
      ...cartState,
      items: cartState.items.map(item => (item.id === lineId ? { ...item, quantity } : item))
    };

    setCartState(optimisticCart);

    try {
      await apiUpdateLineItem({ lineId, quantity });
      await refreshCart();
    } catch (error) {
      console.error('Error updating item quantity:', error);
      await refreshCart();
    } finally {
      setIsUpdatingItem(false);
      setIsUpdating(false);
    }
  };

  const addToCart = async ({ variantId, quantity }: { variantId: string; quantity: number }) => {
    setIsAddingItem(true);
    setIsUpdating(true);

    try {
      await apiAddToCart({
        variantId,
        quantity
      });
      await refreshCart();
    } catch (error) {
      console.error('Error adding product to cart:', error);
      await refreshCart();
      throw error;
    } finally {
      setIsAddingItem(false);
      setIsUpdating(false);
    }
  };

  const handleBulkAddToCart = async (variantQuantities: BulkAddToCartParams) => {
    setIsAddingItem(true);
    setIsUpdating(true);

    try {
      const lineItems = Object.keys(variantQuantities)
        .map(key => ({ variant_id: key, quantity: variantQuantities[key] }))
        .filter(item => item.quantity > 0)
        .flat();
      if (!lineItems.length) {
        return;
      }
      await addToCartBulk(lineItems);
      await refreshCart();
    } catch (error) {
      console.error('Error adding bulk products to cart:', error);
      await refreshCart();
      throw error;
    } finally {
      setIsAddingItem(false);
      setIsUpdating(false);
    }
  };

  const removeCartItem = async (lineId: string) => {
    if (!cartState?.items) return;

    setIsRemovingItem(true);
    setIsUpdating(true);

    const optimisticCart = {
      ...cartState,
      items: cartState.items.filter(item => item.id !== lineId)
    };

    setCartState(optimisticCart);

    try {
      await apiDeleteLineItem(lineId);
      await refreshCart();
    } catch (error) {
      console.error('Error removing item from cart:', error);
      await refreshCart();
    } finally {
      setIsRemovingItem(false);
      setIsUpdating(false);
    }
  };

  function getItemsSummaryValues(items: StoreCartLineItemOptimisticUpdate[]) {
    return items.reduce(
      (acc, item) => ({
        item_subtotal: (acc.item_subtotal || 0) + (item.subtotal || 0),
        total: (acc.total || 0) + (item.total || 0),
        tax_total: (acc.tax_total || 0) + (item.tax_total || 0)
      }),
      { item_subtotal: 0, total: 0, tax_total: 0 }
    );
  }
  function handleOpenState(state: boolean) {
    return setIsOpen(state);
  }
  const toggleOpenState = () => {
    return toggleOpen();
  };

  return (
    <CartContext.Provider
      value={{
        cart: cartState,
        onAddToCart: handleAddToCart,
        addToCart,
        handleBulkAddToCart,
        removeCartItem,
        updateCartItem,
        refreshCart,
        toggleOpenState: handleOpenState,
        isUpdating,
        isAddingItem,
        isUpdatingItem,
        isRemovingItem,
        open: isOpen
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
