import React, { createContext, useState, useMemo } from "react";

export const CartContext = createContext({
  cart: [],
  addToCart: (element: any) => {},
  emptyCart: () => {},
});

export const CartProvider = ({ children }: any) => {
  const [cart, setCart] = useState<any>([]);

  const addToCart = (element: any) => {
    const index = cart.findIndex((item: any) => item._id === element._id);
    if (index !== -1) {
      const _cart = [...cart];
      _cart[index].quantity += 1;
      setCart(_cart);
      return;
    }
    element.quantity = 1;

    setCart([...cart, element]);
  };

  const emptyCart = () => {
    setCart([]);
  };

  const contextValue = useMemo(() => {
    return { cart, addToCart, emptyCart };
  }, [cart]);

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
