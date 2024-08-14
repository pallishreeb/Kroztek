import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import imgPlaceholder from '../img/no-image.jpg';
import { IMG_URL } from '../config';
import { useAuthApi } from '../context/authState';
import { toast } from 'react-toastify'; // Assuming you're using react-toastify for alerts

const CheckoutPage = () => {
  const [cart, setCart] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    gst: '',
    mobileNumber: '',
    country: '',
    state: '',
    city: '',
    streetAddress: '',
    pincode: '',
    orderNotes: '',
    paymentType: 'UPI', // Set default and only option to UPI
    paymentNumber: '1234567890',
    shippingCharge: ''
  });

  const navigate = useNavigate();
  const { user, placeOrder } = useAuthApi();

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(cartItems);
  }, []);

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + (parseFloat(item?.sellingPrice.replace(/,/g, '') || 0) * item.quantity), 0);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any required fields are missing
    const requiredFields = ['firstName', 'lastName', 'mobileNumber', 'country', 'state', 'city', 'streetAddress', 'pincode'];
    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.error(`Please fill up the required field: ${field}`);
        return;
      }
    }

    const orderData = {
      userId: user?._id,
      products: cart.map(item => ({
        product: item._id,
        quantity: item.quantity
      })),
      paymentStatus: 'Pending',
      totalAmount: getTotalAmount(),
      shippingCharge: 0, // Replace with actual shipping charge if applicable
      ...formData
    };

    try {
      await placeOrder(orderData,navigate);
      // navigate('/myorders');
    } catch (error) {
      toast.error('Failed to place order');
    }
  };

  return (
    <div className="container mx-auto p-4 flex flex-col md:flex-row">
      {/* Left Side: Form Fields */}
      <div className="w-full md:w-2/3 pr-0 md:pr-4 mb-6 md:mb-0">
        <h1 className="text-3xl font-bold mb-4">Checkout</h1>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
          {/* First Name and Last Name */}
          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="firstName">
                First Name*
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="w-full md:w-1/2 px-2">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="lastName">
                Last Name*
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
          </div>

          {/* Company Name and GST */}
          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="companyName">
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="w-full md:w-1/2 px-2">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="gst">
                GST
              </label>
              <input
                type="text"
                id="gst"
                name="gst"
                value={formData.gst}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>

          {/* Mobile Number and Country */}
          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="mobileNumber">
                Mobile Number*
              </label>
              <input
                type="text"
                id="mobileNumber"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="w-full md:w-1/2 px-2">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="country">
                Country*
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
          </div>

          {/* State and City */}
          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="state">
                State*
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="w-full md:w-1/2 px-2">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="city">
                City*
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
          </div>

          {/* Street Address and Pincode */}
          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="streetAddress">
                Street Address*
              </label>
              <input
                type="text"
                id="streetAddress"
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="w-full md:w-1/2 px-2">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="pincode">
                Pincode*
              </label>
              <input
                type="text"
                id="pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
          </div>

          {/* Order Notes */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="orderNotes">
              Order Notes
            </label>
            <textarea
              id="orderNotes"
              name="orderNotes"
              value={formData.orderNotes}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            ></textarea>
          </div>

          <button
            type="submit"
            className="py-2 px-4 addToCart text-white rounded hover:bg-blue-700"
          >
            Place Order
          </button>
        </form>
      </div>

      {/* Right Side: Order Summary */}
      <div className="w-full md:w-1/3 pl-0 md:pl-4">
        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
        <div className="bg-white p-4 rounded shadow-sm">
          {cart.map(item => (
            <div key={item._id} className="flex border-b pb-4 mb-4">
              <img
                src={item?.images[0] ? `${IMG_URL}/images/${item?.images[0]}` : imgPlaceholder}
                alt={item.name}
                className="w-24 h-24 object-cover rounded mr-4"
              />
              <div className="flex-grow">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-800">
                  Price: ₹{item?.sellingPrice}
                </p>
                <p className="text-gray-800">Quantity: {item.quantity}</p>
              </div>
            </div>
          ))}
          <div className="mt-4">
            <p className="text-gray-800 mb-2">Total Products: {cart.length}</p>
            <p className="text-gray-800 mb-2">Total Quantity: {cart.reduce((total, item) => total + item.quantity, 0)}</p>
            <p className="text-gray-800 mb-4">Subtotal: ₹{getTotalAmount().toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
