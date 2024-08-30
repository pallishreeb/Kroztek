const Order = require('../models/order');
const Cart = require('../models/cart');
const axios = require('axios');
const crypto = require('crypto');

const MERCHANT_ID = process.env.MERCHANT_ID;
const MERCHANT_KEY = process.env.MERCHANT_KEY;

const  MERCHANT_BASE_URL = process.env.MERCHANT_BASE_URL
const MERCHANT_STATUS_URL = process.env.MERCHANT_STATUS_URL

const redirectUrl = process.env.redirectUrl
const successUrl = process.env.successUrl
const failureUrl = process.env.failureUrl

const initiatePayment = async (data) => {
  const { totalAmount, orderId,name,phone } = data;

  const paymentPayload = {
    merchantId: MERCHANT_ID,
    merchantUserId:name,
    mobileNumber:phone,
    amount: totalAmount * 100, // Convert to paise
    merchantTransactionId: orderId,
    redirectUrl: `${redirectUrl}/?id=${orderId}`,
    redirectMode: 'POST',
    paymentInstrument: {
        type: 'PAY_PAGE'
    }
    // Add any other required fields
  };
  const payload = JSON.stringify(paymentPayload);
  const payloadMain = Buffer.from(payload).toString('base64');
  const keyIndex = 1;
  const string = payloadMain + '/pg/v1/pay' + MERCHANT_KEY;
  const sha256 = crypto.createHash('sha256').update(string).digest('hex');
  const checksum = sha256 + '###' + keyIndex;

  const options = {
    method: 'POST',
    url: MERCHANT_BASE_URL,
    headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        'X-VERIFY': checksum
    },
    data: {
        request: payloadMain
    }
};
try {
  const response = await axios.request(options);
  console.log("payment response", response.data.data.instrumentResponse.redirectInfo.url);
  return response.data.data.instrumentResponse.redirectInfo.url;
} catch (error) {
  console.error("Error in payment initiation:", error);
  throw error; // Propagate error to the caller
}
};

exports.createOrder = async (req, res) => {
  const { userId,totalAmount, products,shippingCharge, firstName, lastName, companyName, gst, mobileNumber, country, state, city, streetAddress, pincode, orderNotes,paymentType } = req.body;

  const order = new Order({
    user: userId,
    products: products,
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

  // res.status(201).json(order);
  try {
    const paymentUrl = await initiatePayment({
      totalAmount: order.totalAmount,
      orderId: order._id.toString(),
      name: firstName,
      phone: mobileNumber
    });
    console.log("payment url ----", paymentUrl);
    res.status(201).json({ order, paymentUrl });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: 'Failed to initiate payment' });
  }
};

exports.getOrder = async (req, res) => {
  const { orderId } = req.params;
  const order = await Order.findById(orderId).populate('products.product');
  res.status(200).json(order);
};

exports.getOrdersByUser = async (req, res) => {
  const { userId } = req.params;
  const orders = await Order.find({ user: userId }).populate('products.product').sort({ createdAt: -1 });
  res.status(200).json(orders);
};

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('products.product').sort({ createdAt: -1 });
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

//payment status 
exports.getPaymentStatus = async (req, res) => {

  const merchantTransactionId = req.query.id
  const merchantId = MERCHANT_ID

  const keyIndex = 1;
  const string = `/pg/v1/status/${merchantId}/${merchantTransactionId}` + MERCHANT_KEY;
  const sha256 = crypto.createHash('sha256').update(string).digest('hex');
  const checksum = sha256 + "###" + keyIndex;

  const options = {
      method: 'GET',
      url: `${MERCHANT_STATUS_URL}/${merchantId}/${merchantTransactionId}`,
      headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          'X-VERIFY': checksum,
          'X-MERCHANT-ID': `${merchantId}`
      }
  };

  // CHECK PAYMENT TATUS
  axios.request(options).then(async (response) => {
          if (response.data.success === true) {
              const url = `${successUrl}`
              const updatedOrder = await Order.findByIdAndUpdate(
                merchantTransactionId,
                { paymentStatus : 'Completed' },
                { new: true }
              );
              if (!updatedOrder) {
                console.log(first)('Order not found');
              }
              return res.redirect(url)
          } else {
              const url = `${failureUrl}`
              const updatedOrder = await Order.findByIdAndUpdate(
                merchantTransactionId,
                { paymentStatus : 'Failed' },
                { new: true }
              );
              if (!updatedOrder) {
                console.log(first)('Order not found');
              }
              return res.redirect(url)
          }
      })
      .catch((error) => {
          console.error(error);
      });

}