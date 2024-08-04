const Cart = require('../models/cart');
const Product = require('../models/product');
const mongoose = require('mongoose');
const { ObjectId } = require("mongodb");
exports.addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  console.log(userId)
  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = new Cart({ user: userId, products: [] });
  }

  const productIndex = cart.products.findIndex(p => p.product.toString() === productId);

  if (productIndex > -1) {
    cart.products[productIndex].quantity += quantity;
  } else {
    cart.products.push({ product: productId, quantity });
  }

  await cart.save();
  res.status(200).json(cart);
};

exports.getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    // Find the cart and populate the product details
    const cart = await Cart.findOne({ user: userId }).populate('products.product');

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found for this user' });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
};


exports.removeFromCart = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    // Find the cart for the user
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found for this user' });
    }

    // Check if the product exists in the cart
    const productExists = cart.products.some(p => p.product._id === productId);

    if (!productExists) {
      return res.status(404).json({ error: 'Product not found in the cart' });
    }

    // Remove the product from the cart
    cart.products = cart.products.filter(p => p.product._id !== productId);

    // Save the updated cart
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.error('Error removing product from cart:', error);
    res.status(500).json({ error: 'Failed to remove product from cart' });
  }
};

exports.updateCart = async (req, res) => {
  const { userId, products } = req.body;

  try {
    // Ensure userId and products are present
    if (!userId || !products || !Array.isArray(products)) {
      return res.status(400).json({ message: 'Invalid input' });
    }

    // Find the cart for the user
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Debug: Log cart and products
    console.log('Cart:', cart);
    console.log('Products:', products);

    // Convert products to ObjectId and update cart
    products.forEach(({ productId, quantity }) => {
      if (!productId || !quantity) {
        console.warn('Missing productId or quantity:', { productId, quantity });
        return;
      }

      const objectId = mongoose.Types.ObjectId(productId);
      const productIndex = cart.products.findIndex(p => p.product._id === objectId);

      if (productIndex > -1) {
        // Update existing product quantity
        cart.products[productIndex].quantity = quantity;
      } else {
        // Add new product to cart
        cart.products.push({ product: objectId, quantity });
      }
    });

    // Save the updated cart
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ message: 'Failed to update cart', error });
  }
};

exports.syncCart = async (req, res) => {
  const { userId, cart } = req.body;

  if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
  }

  try {
      // Update or create the cart for the user
      const updatedCart = await Cart.findOneAndUpdate(
          { user: userId },
          { products: cart },
          { new: true, upsert: true }
      );

      res.status(200).json({ products: updatedCart.products });
  } catch (error) {
    console.log(error)
      res.status(500).json({ error: 'Failed to sync cart' });
  }
}
