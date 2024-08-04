const Order = require('../models/order');
const Cart = require('../models/cart');

exports.createOrder = async (req, res) => {
  const { userId,totalAmount, products, paymentStatus,shippingCharge, firstName, lastName, companyName, gst, mobileNumber, country, state, city, streetAddress, pincode, orderNotes,paymentType } = req.body;

  // const cart = await Cart.findOne({ user: userId }).populate('products.product');

  // if (!cart) {
  //   return res.status(400).json({ error: 'No items in cart' });
  // }

  // const totalAmount = cart.products.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
// console.log(totalAmount)
  const order = new Order({
    user: userId,
    products: products,
    paymentStatus,
    totalAmount,
    shippingCharge,
    firstName,
    lastName,
    companyName,
    gst,
    mobileNumber,
    country,
    state,
    city,
    streetAddress,
    pincode,
    orderNotes,
    paymentType,
  });

  await order.save();
  await Cart.deleteOne({ user: userId });

  res.status(201).json(order);
};

exports.getOrder = async (req, res) => {
  const { orderId } = req.params;
  const order = await Order.findById(orderId).populate('products.product');
  res.status(200).json(order);
};

exports.getOrdersByUser = async (req, res) => {
  const { userId } = req.params;
  const orders = await Order.find({ user: userId }).populate('products.product');
  res.status(200).json(orders);
};
