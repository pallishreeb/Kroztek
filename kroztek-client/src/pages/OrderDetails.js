import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
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


  const downloadInvoice = () => {
    const doc = new jsPDF();
    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, '0')}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getFullYear()}`;
    doc.setFontSize(12);
    // Add company details
    doc.text('Invoice', 100, 10);
    doc.text('Kroztek Integrated Solution', 10, 20);
    doc.text('GST: 21EOUPS1807D1ZX', 10, 30);
    doc.text('www.kroztek.com', 10, 40);
    doc.text('kroztekintegratedsolution@gmail.com', 10, 50);
    doc.text('Phone: 8637214899', 10, 60);
    doc.text('113, Gayatrinagar, Nuasasan', 10, 70);
    doc.text('Near Saishree Eye Hospital, 759001, Dhenkanal, Odisha', 10, 80);

    // Add order details
    doc.text(`Order ID: ${order._id}`, 10, 100);
    doc.text(`Order Date: ${formatDate(order.createdAt)}`, 10, 110);
    doc.text(`Total Amount: Rs ${order.totalAmount}`, 10, 120);
    doc.text(`Name: ${order?.firstName} + ${order?.lastName}`, 10, 130);
    doc.text(`Delivery Address: ${order.streetAddress}, ${order.city}, ${order.state}, ${order.pincode}, ${order.country}`, 10, 140);
    doc.text(`Company Name: ${order?.companyName ? order?.companyName : 'NA'}`, 10, 150);
    doc.text(`GST: ${order?.gst ? order?.gst : 'NA'}`, 10, 160);
    doc.text(`Payment Status: ${order.paymentStatus}`, 10, 170);
    doc.text(`Delivery Status: ${order.status}`, 10, 180);

    // Add product details
    const productData = order.products.map((item) => [
      item.product.name,
      item.quantity,
      `Rs ${item?.product?.sellingPrice}`,
    ]);

    doc.autoTable({
      head: [['Product Name', 'Quantity', 'Price']],
      body: productData,
      startY: 200,
    });

    // Add total amount
    doc.text(`Total Amount: Rs ${order.totalAmount}`, 10, doc.autoTable.previous.finalY + 10);
    doc.text(`Thank you for shopping with us.`, 10, doc.autoTable.previous.finalY + 20);

    // Save the PDF
    doc.save(`invoice-${formattedDate}.pdf`);

  };

  if (!order) {
    return <p className='text-center'>Loading...</p>;
  }

  return (
    <div className="container md:w-1/2 mx-auto p-4 order-details">
      <h1 className="text-xl font-bold mb-4">Order Details</h1>
      <h2 className="text-xl mb-2">Order ID: {order._id}</h2>
      <p>Total Amount: ₹{order.totalAmount}</p>
      <p>Payment Status: {order.paymentStatus}</p>
      <p>Name: {order.firstName} {" "} {order.lastName}</p>
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
              <p>Price: ₹{item?.product?.sellingPrice}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
          </div>
        ))}
      </div>
      <button onClick={downloadInvoice} className="mt-4 addToCart py-2 px-4 rounded">
        Download Invoice
      </button>
    </div>
  );
};

export default OrderDetails;
