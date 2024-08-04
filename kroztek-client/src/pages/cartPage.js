import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import imgPlaceholder from '../img/no-image.jpg';
import { IMG_URL } from '../config';
import { useAuthApi } from "../context/authState";
import { API_URL } from "../config";
import { toast } from 'react-toastify';
const CartPage = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const {removeFromCart } = useAuthApi();
  useEffect(() => {
    // Load cart from localStorage
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(cartItems);

  }, []);
  const navigateToDetails = (id) => navigate(`/product/${id}`);
  const handleQuantityChange = async (id, change) => {
    const updatedCart = cart.map(item => {
        if (item._id === id) {
            const newQuantity = item.quantity + change;
            return { ...item, quantity: Math.max(1, newQuantity) }; // Ensure quantity is at least 1
        }
        return item;
    });

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    // Fetch the userId from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?._id;

    // Make a backend API call to update the quantity
    try {
        const response = await fetch(`${API_URL}/cart/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId,
                products: updatedCart.map(item => ({
                    productId: item._id,
                    quantity: item.quantity
                }))
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to update cart in backend');
        }

        const result = await response.json();
        console.log('Cart updated successfully in backend:', result);
    } catch (error) {
        console.error('Error updating cart in backend:', error);
        toast.error('Failed to update cart in backend');
    }
};


  const handleRemove = (id) => {
    const updatedCart = cart?.filter(item => item._id !== id);
    setCart(updatedCart);
    removeFromCart(id)
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const getTotal = () => {
    return cart?.reduce((total, item) => total + (parseFloat(item?.features?.find(feature => feature.name.toLowerCase() === 'price')?.value.replace(/,/g, '') || 0) * item.quantity), 0);
  };

  const handleCheckout = () => {
    // Handle checkout logic here
    navigate('/checkout');
  };
  return (
    <div className="flex p-4 bg-gray-100">
      {/* Left Side: Cart Items */}
      <div className="w-2/3 pr-4">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
        {cart?.length === 0 ? (
          <p className="text-center text-gray-600">Your cart is empty.</p>
        ) : (
          cart?.map(item => (
            <div key={item._id} className="flex border-b pb-4 mb-4">
            <img
              src={item?.images?.length > 0 ? `${IMG_URL}/images/${item?.images[0]}` : imgPlaceholder}
              alt={item.name}
              className="w-28 h-28 object-cover rounded mr-4 cursor-pointer"
              onClick={() => navigateToDetails(item?._id)}
            />

              <div className="flex-grow">
                <h3 className="text-lg font-semibold textColor">{item.name}</h3>
                <p className="text-gray-800">Price: ₹{item?.features?.find(feature => feature.name.toLowerCase() === 'price')?.value}</p>
                <div className="flex items-center mt-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => handleQuantityChange(item._id, -1)}
                  >
                    -
                  </button>
                  <span className="text-gray-800">{item.quantity}</span>
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded ml-2"
                    onClick={() => handleQuantityChange(item._id, 1)}
                  >
                    +
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded ml-4"
                    onClick={() => handleRemove(item._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Right Side: Summary */}
      <div className="w-1/3 pl-4">
        <h2 className="text-2xl font-bold mb-4">Summary</h2>
        <div className="bg-white p-4 rounded shadow-sm">
          <p className="text-gray-800 mb-2">Total Products: {cart?.length}</p>
          <p className="text-gray-800 mb-2">Total Quantity: {cart?.reduce((total, item) => total + item.quantity, 0)}</p>
          <p className="text-gray-800 mb-4">Subtotal: ₹{getTotal().toLocaleString()}</p>
          <button
            className="addToCart py-2 px-4 rounded hover:bg-blue-700 w-full"
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
