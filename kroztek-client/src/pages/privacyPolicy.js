import React from "react";

const PrivacyPolicyPage = () => {
  return (
    <div className="container md:w-1/2 mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>

      {/* Introduction */}
      <section className="mb-8">
        <p className="text-gray-700">
          At Kroztek Integrated Solution, we are committed to protecting your privacy. This Privacy Policy outlines the types of personal information we collect, how we use it, and the measures we take to safeguard your data. By using our website, you consent to the practices described in this policy.
        </p>
      </section>

      {/* Information Collection */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">🔍 Information We Collect</h2>
        <p className="text-gray-700 mb-4">
          We collect various types of information to provide and improve our services to you:
        </p>
        <ul className="list-disc pl-5 text-gray-700">
          <li>
            **Personal Information**: When you make a purchase, create an account, or contact us, we collect personal details such as your name, email address, phone number, and shipping address.
          </li>
          <li>
            **Payment Information**: We collect payment information, such as credit/debit card details, to process transactions securely. We do not store your payment information after the transaction is complete.
          </li>
          <li>
            **Technical Data**: We collect technical data, including your IP address, browser type, and device information, to improve the functionality and security of our website.
          </li>
          <li>
            **Cookies**: We use cookies to enhance your browsing experience, remember your preferences, and track website usage. You can manage cookie preferences through your browser settings.
          </li>
        </ul>
      </section>

      {/* Use of Information */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">💼 How We Use Your Information</h2>
        <p className="text-gray-700 mb-4">
          The information we collect is used for the following purposes:
        </p>
        <ul className="list-disc pl-5 text-gray-700">
          <li>To process and fulfill your orders, including shipping and delivery.</li>
          <li>To communicate with you regarding your orders, inquiries, or support requests.</li>
          <li>To personalize your shopping experience by displaying relevant products and offers.</li>
          <li>To improve our website, services, and customer support based on user feedback and usage patterns.</li>
          <li>To comply with legal obligations and prevent fraudulent activities.</li>
        </ul>
      </section>

      {/* Sharing of Information */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">🔗 Sharing of Information</h2>
        <p className="text-gray-700 mb-4">
          We respect your privacy and do not sell or share your personal information with third parties, except in the following cases:
        </p>
        <ul className="list-disc pl-5 text-gray-700">
          <li>
            **Service Providers**: We share information with trusted service providers who assist us in operating our website, processing payments, and delivering products. These providers are obligated to protect your information.
          </li>
          <li>
            **Legal Compliance**: We may disclose your information if required by law or to protect our rights, property, or safety, as well as the rights, property, or safety of our users.
          </li>
          <li>
            **Business Transfers**: In the event of a merger, acquisition, or sale of our business, your information may be transferred as part of the transaction.
          </li>
        </ul>
      </section>

      {/* Data Security */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">🔐 Data Security</h2>
        <p className="text-gray-700 mb-4">
          We take data security seriously and implement appropriate measures to protect your personal information from unauthorized access, disclosure, or destruction. These measures include encryption, secure servers, and regular security audits.
        </p>
        <p className="text-gray-700">
          However, please note that no method of transmission over the Internet or electronic storage is completely secure. While we strive to protect your information, we cannot guarantee its absolute security.
        </p>
      </section>

      {/* Your Rights */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">📝 Your Rights</h2>
        <p className="text-gray-700 mb-4">
          You have the right to access, update, or delete your personal information at any time. You can do this by logging into your account or contacting us directly. Additionally, you have the right to withdraw consent to our data practices, request a copy of the information we hold about you, or lodge a complaint with a data protection authority.
        </p>
      </section>

      {/* Changes to Privacy Policy */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">📄 Changes to This Privacy Policy</h2>
        <p className="text-gray-700 mb-4">
          We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, or for other operational reasons. Any updates will be posted on this page with the effective date. We encourage you to review this policy periodically.
        </p>
      </section>

      {/* Contact Information */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">📧 Contact Us</h2>
        <p className="text-gray-700 mb-4">
          If you have any questions or concerns about this Privacy Policy or how we handle your personal information, please contact us at:
        </p>
        <p className="text-gray-700">
          Email: <a href="mailto:kroztekintegratedsolution@gmail.com" className="text-blue-500">kroztekintegratedsolution@gmail.com</a>
        </p>
        <p className="text-gray-700">
          Phone: <a href="tel:+918637214899" className="text-blue-500">+918637214899</a>
        </p>
        <p className="text-gray-700">
          Address: 113, Gayatrinagar, Nuasasan, Near Saishree Eye Hospital, 759001, Dhenkanal, Odisha
        </p>
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

export default PrivacyPolicyPage;
