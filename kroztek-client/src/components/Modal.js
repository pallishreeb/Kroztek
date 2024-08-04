import React from 'react';
import { Link } from 'react-router-dom';

const Modal = ({ isOpen, onClose, message}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg">
        <p>{message}</p>
        <button className="mt-2 bg-red-500 text-white py-1 px-4 rounded" onClick={onClose}>
          Close
        </button>
        <button className="mt-2 addToCart text-white py-1 px-4 rounded ml-2" onClick={onClose}>
          <Link to={`/cart`}>
          View Cart
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Modal;
