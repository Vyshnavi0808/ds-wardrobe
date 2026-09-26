"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { sdk } from "@/lib/medusa";

const CartContext = createContext();

const CART_KEY = "ds_medusa_cart_id";

export function CartProvider({ children }) {
  const [medusaCart, setMedusaCart] = useState(null);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper to format line items for component consumption
  const formatCartItems = (rawItems = []) => {
    return rawItems.map((item) => {
      const title =
        item.title ||
        item.product_title ||
        item.variant?.product?.title ||
        "Item";
      const unitPrice = item.unit_price || 0;
      const formattedPrice = `₹${unitPrice.toLocaleString("en-IN")}`;

      return {
        id: item.id,
        line_item_id: item.id,
        variant_id: item.variant_id,
        product_id: item.product_id,
        name: title,
        title: title,
        price: formattedPrice,
        unit_price: unitPrice,
        quantity: item.quantity || 1,
        thumbnail: item.thumbnail || item.variant?.product?.thumbnail || "",
        raw: item,
      };
    });
  };

  // Sync state from Medusa cart object
  const updateCartState = (cartData) => {
    if (!cartData) {
      setMedusaCart(null);
      setCart([]);
      return;
    }
    setMedusaCart(cartData);
    setCart(formatCartItems(cartData.items || []));
    if (cartData.id) {
      localStorage.setItem(CART_KEY, cartData.id);
    }
  };

  // Fetch or retrieve cart from Medusa
  const fetchCart = useCallback(async (cartId) => {
    if (!cartId) return null;
    try {
      setLoading(true);
      setError(null);
      const { cart: fetchedCart } = await sdk.store.cart.retrieve(cartId, {
        fields: "*items,*items.variant,*items.variant.product",
      });
      updateCartState(fetchedCart);
      return fetchedCart;
    } catch (err) {
      console.error("Failed to retrieve cart from Medusa:", err);
      localStorage.removeItem(CART_KEY);
      updateCartState(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Initialize cart on mount
  useEffect(() => {
    const savedCartId = localStorage.getItem(CART_KEY);
    if (savedCartId) {
      fetchCart(savedCartId);
    } else {
      setLoading(false);
    }
  }, [fetchCart]);

  // Create a new cart on Medusa backend
  const getOrCreateCart = async () => {
    const savedCartId = localStorage.getItem(CART_KEY);
    if (savedCartId && medusaCart) {
      return medusaCart;
    }
    if (savedCartId) {
      const existing = await fetchCart(savedCartId);
      if (existing) return existing;
    }

    // Get default region
    try {
      setLoading(true);
      setError(null);
      const { regions } = await sdk.store.region.list();
      const regionId = regions?.[0]?.id;

      const { cart: newCart } = await sdk.store.cart.create({
        region_id: regionId,
      });

      updateCartState(newCart);
      return newCart;
    } catch (err) {
      const msg = err?.message || "Failed to create Medusa cart";
      setError(msg);
      console.error("Error creating Medusa cart:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Add line item to cart
  const addToCart = async (target, qty = 1) => {
    setError(null);
    let variantId = null;

    if (typeof target === "string") {
      variantId = target;
    } else if (target?.variant_id) {
      variantId = target.variant_id;
    } else if (target?.variants?.[0]?.id) {
      variantId = target.variants[0].id;
    } else if (target?.id && target.id.startsWith("variant_")) {
      variantId = target.id;
    }

    if (!variantId) {
      const msg = "Unable to add product: missing variant ID.";
      setError(msg);
      console.error(msg, target);
      return false;
    }

    try {
      setLoading(true);
      const activeCart = await getOrCreateCart();
      const { cart: updatedCart } = await sdk.store.cart.createLineItem(
        activeCart.id,
        {
          variant_id: variantId,
          quantity: qty,
        }
      );

      updateCartState(updatedCart);
      return true;
    } catch (err) {
      const msg = err?.message || "Failed to add item to Medusa cart";
      setError(msg);
      console.error("addToCart error:", err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Helper to find line item ID from index or string ID
  const resolveLineItemId = (itemIdentifier) => {
    if (typeof itemIdentifier === "string") {
      return itemIdentifier;
    }
    if (typeof itemIdentifier === "number" && cart[itemIdentifier]) {
      return cart[itemIdentifier].id;
    }
    return null;
  };

  // Increase line item quantity
  const increaseQuantity = async (itemIdentifier) => {
    const lineItemId = resolveLineItemId(itemIdentifier);
    if (!lineItemId || !medusaCart?.id) return;

    const currentItem = cart.find((i) => i.id === lineItemId);
    const newQty = (currentItem?.quantity || 1) + 1;

    try {
      setLoading(true);
      setError(null);
      const { cart: updatedCart } = await sdk.store.cart.updateLineItem(
        medusaCart.id,
        lineItemId,
        { quantity: newQty }
      );
      updateCartState(updatedCart);
    } catch (err) {
      setError(err?.message || "Failed to update item quantity");
      console.error("increaseQuantity error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Decrease line item quantity
  const decreaseQuantity = async (itemIdentifier) => {
    const lineItemId = resolveLineItemId(itemIdentifier);
    if (!lineItemId || !medusaCart?.id) return;

    const currentItem = cart.find((i) => i.id === lineItemId);
    const newQty = (currentItem?.quantity || 1) - 1;

    if (newQty <= 0) {
      await removeFromCart(lineItemId);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const { cart: updatedCart } = await sdk.store.cart.updateLineItem(
        medusaCart.id,
        lineItemId,
        { quantity: newQty }
      );
      updateCartState(updatedCart);
    } catch (err) {
      setError(err?.message || "Failed to update item quantity");
      console.error("decreaseQuantity error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Remove line item from cart
  const removeFromCart = async (itemIdentifier) => {
    const lineItemId = resolveLineItemId(itemIdentifier);
    if (!lineItemId || !medusaCart?.id) return;

    try {
      setLoading(true);
      setError(null);
      const response = await sdk.store.cart.deleteLineItem(
        medusaCart.id,
        lineItemId
      );
      
      const updatedCart = response.parent || response.cart;
      if (updatedCart) {
        updateCartState(updatedCart);
      } else {
        // Fallback refetch
        await fetchCart(medusaCart.id);
      }
    } catch (err) {
      setError(err?.message || "Failed to remove item from cart");
      console.error("removeFromCart error:", err);
    } finally {
      setLoading(false);
    }
  };

  const total = medusaCart?.total || 0;
  const subtotal = medusaCart?.subtotal || 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        medusaCart,
        cartId: medusaCart?.id,
        total,
        subtotal,
        loading,
        error,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        refreshCart: () => fetchCart(medusaCart?.id),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}