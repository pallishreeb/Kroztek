const Cart = require('../models/cart');
const Product = require('../models/product');

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
  console.log(userId)
  const cart = await Cart.findOne({ user: userId }).populate('products.product');
  res.status(200).json(cart);
};

exports.removeFromCart = async (req, res) => {
  const { userId, productId } = req.body;

  let cart = await Cart.findOne({ user: userId });

  cart.products = cart.products.filter(p => p.product.toString() !== productId);

  await cart.save();
  res.status(200).json(cart);
};

// Controller function
exports.updateCart = async (req, res) => {
  const { userId, products } = req.body;

  try {
      let cart = await Cart.findOne({ user: userId });

      if (!cart) {
          return res.status(404).json({ message: 'Cart not found' });
      }

      // Update cart with new quantities
      products.forEach(({ productId, quantity }) => {
          const productIndex = cart.products.findIndex(p => p.product.toString() === productId);

          if (productIndex > -1) {
              cart.products[productIndex].quantity = quantity;
          } else {
              cart.products.push({ product: productId, quantity });
          }
      });

      await cart.save();
      res.status(200).json(cart);
  } catch (error) {
      res.status(500).json({ message: 'Failed to update cart', error });
  }
};
