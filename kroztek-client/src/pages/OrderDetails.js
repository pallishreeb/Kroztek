import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuthApi } from '../context/authState';
import imgPlaceholder from '../img/no-image.jpg';
import { IMG_URL } from '../config';

const OrderDetails = () => {
  const { orderId } = useParams();
  const { getOrder } = useAuthApi();
  const [order, setOrder] = useState(null);
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    };
    return date.toLocaleDateString('en-US', options);
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderDetails = await getOrder(orderId);
        setOrder(orderDetails);
      } catch (error) {
        console.error('Failed to fetch order:', error);
      }
    };

    fetchOrder();
  }, [orderId, getOrder]);

  if (!order) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container md:w-1/2 mx-auto p-4 order-details">
      <h1 className="text-xl font-bold mb-4">Order Details</h1>
      <h2 className="text-xl mb-2">Order ID: {order._id}</h2>
      <p>Total Amount: ₹{order.totalAmount}</p>
      <p>Payment Status: {order.paymentStatus}</p>
      {/* <p>Shipping Charge: ₹{order.shippingCharge}</p> */}
      <p>Delivery address: {order.streetAddress}, {order.city}, {order.state}, {order.country}, {order.pincode}</p>
      <p>Delivery status: {order.status}</p>
      <p>Order date: {formatDate(order.createdAt)}</p>
      <p>Order Note: {order.orderNotes}</p>
      <div className="grid grid-cols-1 gap-4 mt-4">
        {order.products.map((item) => (
          <div key={item.product._id} className="bg-white p-4 rounded border flex items-center">
            <Link to={`/product/${item.product._id}`} className="flex-shrink-0">
              <img
                src={item.product?.images[0] ? `${IMG_URL}/images/${item.product.images[0]}` : imgPlaceholder}
                alt={item.product.name}
                className="w-32 h-32 object-cover rounded mr-4"
              />
            </Link>
            <div className="flex-grow">
              <h3 className="text-lg font-semibold">{item.product.name}</h3>
              <p>Price: ₹{item.product.features.find((feature) => feature.name.toLowerCase() === 'price')?.value}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetails;
