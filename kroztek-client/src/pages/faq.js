import React from "react";

const FAQPage = () => {
  return (
    <div className="container md:w-1/2 mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Frequently Asked Questions (FAQ)</h1>

      {/* What products does Kroztek offer? */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">❓ What products does Kroztek Integrated Solution offer?</h2>
        <p className="text-gray-700">
          Kroztek Integrated Solution specializes in offering a wide range of electrical products for industrial factories and manufacturers. Our catalog includes switchgear, circuit breakers, cables, connectors, industrial automation products, and more.
        </p>
      </div>

      {/* How can I place an order? */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">❓ How can I place an order?</h2>
        <p className="text-gray-700">
          You can place an order directly through our website by browsing the product catalog and adding items to your cart. Once you’re ready, proceed to checkout to complete your purchase. If you need assistance, you can contact our sales team via WhatsApp, email, or phone.
        </p>
      </div>

      {/* What is your return and refund policy? */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">❓ What is your return and refund policy?</h2>
        <p className="text-gray-700">
         Currently We dont accept any returns after delivery of products. If a product is found to be defective or not as described, please contact us immediately. For more details, please refer to our Return and Refund Policy.
        </p>
      </div>

      {/* Do you offer international shipping? */}
      {/* <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">❓ Do you offer international shipping?</h2>
        <p className="text-gray-700">
          Yes, we offer international shipping to select countries. Shipping rates and delivery times vary based on the destination. Please check our Shipping Policy or contact our customer support for more details.
        </p>
      </div> */}

      {/* How can I track my order? */}
      {/* <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">❓ How can I track my order?</h2>
        <p className="text-gray-700">
          Once your order has been shipped, you will receive a tracking number via email. You can use this number to track your order on our website or through the carrier’s tracking service. If you have any issues tracking your order, feel free to reach out to our support team.
        </p>
      </div> */}

      {/* Do you provide technical support for products? */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">❓ Do you provide technical support for products?</h2>
        <p className="text-gray-700">
          Yes, we offer technical support for all the products we sell. Whether you need installation assistance or troubleshooting, our expert team is here to help. You can contact us through our support channels for any technical queries.
        </p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">❓ How can I contact support?</h2>
        <p className="text-gray-700">
          You can contact our support team via WhatsApp at +918637214899, email us at kroztekintegratedsolution@gmail.com, or call us directly at +918637214899. We are here to help you with any queries or issues.
        </p>
      </div>
    </div>
    
  );
};

export default FAQPage;
