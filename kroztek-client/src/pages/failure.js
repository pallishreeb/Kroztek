import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentFailure = () => {
  const navigate = useNavigate();

  const handleRetryPayment = () => {
    // Logic to retry payment
    navigate('/myorders'); // Redirect to checkout page
  };

  return (
    <div className="flex items-center justify-center h-[50vh] bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-red-500 mb-4">Payment Failed</h1>
        <p className="text-gray-700 mb-6">
          We're sorry, but your payment was not successful. Please try again or contact support.
        </p>
        <div className='flex flex-col justify-center items-center gap-6' >
        <button
          onClick={handleRetryPayment}
          className="genButton px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Retry Payment
        </button>
        <button
          onClick={() => navigate('/')}
          className="mt-4 text-blue-500 hover:underline focus:outline-none"
        >
          Go to Home
        </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailure;
