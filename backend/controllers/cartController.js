import Cart from '../models/Cart.js';

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      return res.json({ userId: req.user._id, cartItems: [] });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Add item to cart
// @route   POST /api/cart/add
// @access  Private
export const addToCart = async (req, res) => {
  const { productId, name, price, image, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId: req.user._id });

    if (cart) {
      // Check if product exists in cart
      const itemIndex = cart.cartItems.findIndex(item => item.productId.toString() === productId);

      if (itemIndex > -1) {
        // Update quantity
        cart.cartItems[itemIndex].quantity = quantity;
      } else {
        // Add new item
        cart.cartItems.push({ productId, name, price, image, quantity });
      }
    } else {
      // Create new cart
      cart = new Cart({
        userId: req.user._id,
        cartItems: [{ productId, name, price, image, quantity }]
      });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:productId
// @access  Private
export const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });

    if (cart) {
      cart.cartItems = cart.cartItems.filter(item => item.productId.toString() !== req.params.productId);
      await cart.save();
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: 'Cart not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Clear user cart
// @route   DELETE /api/cart
// @access  Private
export const clearCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ userId: req.user._id });
    res.status(200).json({ message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
