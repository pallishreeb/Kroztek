import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthApi } from '../context/authState';
import { IMG_URL } from '../config'; // Adjust this based on your config
import imgPlaceholder from '../img/no-image.jpg';

const MyOrders = () => {
  const { user, getOrdersByUser } = useAuthApi();
  const [orders, setOrders] = useState([]);
  
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
    const fetchOrders = async () => {
      try {
        const userOrders = await getOrdersByUser(user._id);
        setOrders(userOrders);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user, getOrdersByUser]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container md:w-2/3  mx-auto p-4 order-details">
      <h1 className="text-xl font-bold mb-4">My Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white p-4 rounded shadow-md border">
              <h2 className="text-xl mb-2">Order ID: {order._id}</h2>
              <p>Total Amount: ₹{order.totalAmount}</p>
              <p>Payment Status: {order.paymentStatus}</p>
              <p>Delivery Status: {order.status}</p>
              <p>Created Date: {formatDate(order.createdAt)}</p>
              <p>Order Note: {order.orderNotes}</p>
              
              <div className="products mt-4">
                <h3 className="text-lg font-medium mb-2">Products:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {order.products.map(({ product, quantity }) => (
                    <div key={product._id} className="product-item flex items-center bg-white p-4 rounded shadow-sm">
                      <Link to={`/product/${product._id}`} className="flex-shrink-0">
                        <img 
                          src={product.images ? `${IMG_URL}/images/${product.images[0]}` : imgPlaceholder} 
                          alt={product.name} 
                          className="w-32 h-32 object-cover rounded mr-4"
                        />
                      </Link>
                      <div className="flex-grow">
                        <p className="text-sm font-semibold">{product.name}</p>
                        <p>Price: ₹{product.features.find(feature => feature.name.toLowerCase() === 'price')?.value}</p>
                        <p>Quantity: {quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Link to={`/order/${order._id}`} className="text-blue-500 mt-2 inline-block">
               <h2 className='text-sm'>View Order Details</h2> 
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
