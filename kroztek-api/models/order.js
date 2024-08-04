const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'product' },
      quantity: { type: Number, default: 1 }
    }
  ],
  totalAmount: Number,
  paymentStatus: { type: String, default: 'Pending' },
  status: { type: String, default: 'Pending' },
  shippingCharge: { type: Number, default: 0 },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  companyName: { type: String },
  gst: { type: String },
  paymentType: { type: String },
  paymentNumber: { type: String },
  mobileNumber: { type: String, required: true },
  country: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  streetAddress: { type: String, required: true },
  pincode: { type: String, required: true },
  orderNotes: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }

});

module.exports = mongoose.model('Order', orderSchema);
