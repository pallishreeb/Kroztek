import React from "react";

const TermsAndConditionsPage = () => {
  return (
    <div className="container  md:w-1/2 mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Terms and Conditions</h1>

      {/* Terms and Conditions */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">📄 General Terms and Conditions</h2>
        <p className="text-gray-700 mb-4">
          Welcome to Kroztek Integrated Solution. By using our website and purchasing our electrical products for industrial use, you agree to the following terms and conditions. Please read them carefully before making a purchase.
        </p>
        <ul className="list-disc pl-5 text-gray-700">
          <li>All prices listed on our website are in INR (Indian Rupees) and are inclusive of applicable taxes.</li>
          <li>Product descriptions and images are provided for reference only. Actual products may vary slightly in terms of appearance and specifications.</li>
          <li>Kroztek reserves the right to update or modify these terms at any time without prior notice.</li>
          <li>Your use of our website is subject to the laws of India. Any legal disputes will be resolved in the courts of Odisha.</li>
        </ul>
      </section>

      {/* Return and Refund Policy */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">🔄 Return and Refund Policy</h2>
        <p className="text-gray-700 mb-4">
          At Kroztek, we strive to provide high-quality products for your industrial needs.However if you are not satisfied for any reason,
           We accept returns within 14 days of delivery.please contact our customer service team for instructions. 
           Once your return is received, we will issue a refund to your original method of payment within 5 to 7 business days.
        </p>
        {/* <p className="text-gray-700 mb-4">
          At Kroztek, we strive to provide high-quality products for your industrial needs.We do not have any refaund and return policy.However , if any defective or not  described product
          is delivered please contact us immediately, we will do all the needful based on warranty of the products.
        </p> */}
        {/* <ul className="list-disc pl-5 text-gray-700">
          <li>Products can be returned within 15 days of receipt if they are defective or damaged during shipping.</li>
          <li>To initiate a return, please contact our customer support team at <a href="mailto:kroztekintegratedsolution@gmail.com" className="text-blue-500">kroztekintegratedsolution@gmail.com</a> with your order details.</li>
          <li>Refunds will be processed within 7-10 business days after we receive and inspect the returned product.</li>
          <li>Shipping costs for returns will be borne by the customer, except in cases of defective or damaged products.</li>
        </ul> */}
      </section>

      {/* Shipping Policy */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">🚚 Shipping Policy</h2>
        <p className="text-gray-700 mb-4">
          We are committed to delivering your orders in a timely and efficient manner. Please review our shipping policies below:
        </p>
        <ul className="list-disc pl-5 text-gray-700">
          <li>Orders are processed within 2-3 business days after payment confirmation subject to stock availability.</li>
          <li>We offer standard and express shipping options across India. Shipping costs are calculated at checkout based on the weight and destination of your order.</li>
          <li>Delivery times may vary depending on the location and availability of the products.</li>
          <li>Once your order is shipped, you will receive a tracking number via email to monitor the status of your delivery.</li>
          <li>If you experience any delays or issues with shipping, please contact our support team for assistance.</li>
        </ul>
      </section>

      {/* Footer Notice */}
      <section className="text-center mt-4">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Kroztek Integrated Solution. All rights reserved. 
        </p>
      </section>
    </div>
  );
};

export default TermsAndConditionsPage;
