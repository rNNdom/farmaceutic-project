import React, { createContext, useMemo, useState } from "react";

export const CartContext = createContext({
  cart: [],
  addToCart: (element: any, quantity: number) => {},
  emptyCart: () => {},
  quantity: 0,
});

export const CartProvider = ({ children }: any) => {
  const [cart, setCart] = useState<any>([]);
  const [quantity, setQuantity] = useState<number>(0);

  const addToCart = (element: any, _quantity: number) => {
    const index = cart.findIndex((item: any) => item._id === element._id);
    if (index !== -1) {
      const _cart = [...cart];
      _cart[index].onCartQuantity += _quantity;
      setCart(_cart);
      setQuantity(quantity + _quantity);
      return;
    }
    element.onCartQuantity = _quantity;
    setQuantity(quantity + _quantity);

    setCart([...cart, element]);
  };

  const emptyCart = () => {
    setCart([]);
    setQuantity(0);
  };

  const contextValue = useMemo(() => {
    return { cart, addToCart, emptyCart, quantity };
  }, [cart]);

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
