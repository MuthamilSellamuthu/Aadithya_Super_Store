import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { fetchCart, syncCartAdd, syncCartRemove, syncCartClear } from '../services/api';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useAuth(); // Depend on user explicitly

  // Load cart from DB if user is logged in, else use local storage for guest
  useEffect(() => {
    const loadCart = async () => {
      if (user) {
        try {
          const dbCart = await fetchCart();
          // Align dbCart.cartItems to local context properties
          if (dbCart && dbCart.cartItems) {
            const formattedItems = dbCart.cartItems.map(item => ({
              _id: item.productId,
              name: item.name,
              price: item.price,
              image: item.image,
              qty: item.quantity
            }));
            setCartItems(formattedItems);
          } else {
            setCartItems([]);
          }
        } catch (error) {
          console.error('Failed to load DB cart, falling back to local', error);
          const savedCart = localStorage.getItem('cartItems');
          if (savedCart) setCartItems(JSON.parse(savedCart));
        }
      } else {
        const savedCart = localStorage.getItem('cartItems');
        if (savedCart) setCartItems(JSON.parse(savedCart));
      }
    };
    
    loadCart();
  }, [user]);

  // Sync to local storage for guests
  useEffect(() => {
    if (!user) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems, user]);

  const addToCart = async (product, qty = 1) => {
    const existingItem = cartItems.find(item => item._id === product._id);
    let newItems;
    
    if (existingItem) {
      newItems = cartItems.map(item => 
        item._id === product._id ? { ...item, qty: item.qty + qty } : item
      );
    } else {
      newItems = [...cartItems, { ...product, qty }];
    }
    
    setCartItems(newItems);

    if (user) {
      try {
        const itemQty = existingItem ? existingItem.qty + qty : qty;
        await syncCartAdd({
          productId: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: itemQty
        });
      } catch (error) {
        console.error('Failed to sync add to cart', error);
      }
    }
  };

  const removeFromCart = async (id) => {
    const newItems = cartItems.filter(item => item._id !== id);
    setCartItems(newItems);

    if (user) {
      try {
        await syncCartRemove(id);
      } catch (error) {
        console.error('Failed to sync remove from cart', error);
      }
    }
  };

  const updateQuantity = async (id, qty) => {
    if (qty <= 0) {
      removeFromCart(id);
      return;
    }

    const newItems = cartItems.map(item => 
      item._id === id ? { ...item, qty } : item
    );
    setCartItems(newItems);

    if (user) {
      const updatedItem = newItems.find(item => item._id === id);
      try {
        if (updatedItem) {
           await syncCartAdd({
             productId: updatedItem._id,
             name: updatedItem.name,
             price: updatedItem.price,
             image: updatedItem.image,
             quantity: updatedItem.qty
           });
        }
      } catch (error) {
        console.error('Failed to sync quantity update', error);
      }
    }
  };

  const clearCart = async () => {
    setCartItems([]);
    if (user) {
      try {
        await syncCartClear();
      } catch (error) {
        console.error('Failed to clear DB cart', error);
      }
    }
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
