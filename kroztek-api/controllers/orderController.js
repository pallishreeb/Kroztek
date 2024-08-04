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


// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('products.product');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  }
};

// Update an order
exports.updateOrder = async (req, res) => {
  const { orderId } = req.params;
  const { paymentStatus, status } = req.body;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { paymentStatus, status },
      { new: true }
    ).populate('products.product');

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error updating order', error });
  }
};

// Delete an order
exports.deleteOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting order', error });
  }
};
