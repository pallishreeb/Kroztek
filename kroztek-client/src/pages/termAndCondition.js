import React from "react";

const TermsAndConditionsPage = () => {
  return (
    <div className="container  md:w-1/2 mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Terms & Condition</h1>

      <p className="text-md mb-6 text-justify">
      Welcome to Kroztek Integrated Solution
      <br/>
      These Terms and Conditions  govern your relationship with Kroztek Integrated Solution operated by Saswat Dibyashakti Sahoo.
      <br/>
      Please read these Terms and Conditions carefully before using our Service.
      <br/>
      By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the Terms, you may not access the Service.
      </p>
      {/* Terms and Conditions */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Use of the Service</h2>
        <p className="text-gray-700 mb-4">
          Welcome to Kroztek Integrated Solution. By using our website and purchasing our electrical products for industrial use, you agree to the following terms and conditions. Please read them carefully before making a purchase.
        </p>
        <ul className="list-disc pl-5 text-gray-700">
          <li>Eligibility:There is no age limit for using the Service. However, by using the Service, you represent and warrant that you have the legal capacity to enter into these Terms.</li>
          <li>License: We grant you a limited, non-exclusive, non-transferable, and revocable license to use the Service for your personal, non-commercial use.</li>
          <li>Prohibited Conduct: You agree not to use the Service in any way that is unlawful, harmful, or otherwise objectionable. This includes, but is not limited to:

            <ul>
              <li>– Violating any local, state, national, or international law.

              <li>– Infringing on any third party’s intellectual property rights.</li> 
              <li>– Engaging in any conduct that is harmful, fraudulent, deceptive, or offensive.</li>
          </li>
            </ul>
          </li>
      
        </ul>
      </section>
      {/* Return and Refund Policy */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4"> Intellectual Property</h2>
        <p className="text-gray-700 mb-4">
        All content, trademarks, logos, and other intellectual property displayed on the Service are the property of Vishal Ramanand Singh or our licensors. You are not permitted to use these without our prior written consent.
        </p>
      </section>
        {/* Return and Refund Policy */}
        <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Privacy</h2>
        <p className="text-gray-700 mb-4">
        Your use of the Service is also governed by our Privacy Policy, which explains how we collect, use, and disclose information that pertains to your privacy. By using the Service, you consent to the collection and use of information as described in the Privacy Policy.
        </p>
      </section>
        {/* Return and Refund Policy */}
        <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Limitation of Liability</h2>
        <p className="text-gray-700 mb-4">
        To the maximum extent permitted by law, MFBuddy shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:

        – Your use or inability to use the Service.

        – Any unauthorized access to or use of our servers and/or any personal information stored therein.

        – Any bugs, viruses, or the like that may be transmitted to or through our Service by any third party.
        </p>
      </section>
        {/* Return and Refund Policy */}
        <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Changes to the Terms</h2>
        <p className="text-gray-700 mb-4">
        We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 7 days’ notice before any new terms take effect. For less significant changes, we will provide 3 days’ notice. What constitutes a material change will be determined at our sole discretion.
        </p>
      </section>
            {/* Return and Refund Policy */}
  <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4"> Return and Refund Policy</h2>
        <p className="text-gray-700 mb-4">
          At Kroztek, we strive to provide high-quality products for your industrial needs.However if you are not satisfied for any reason,
           We accept returns within 14 days of delivery.please contact our customer service team for instructions. 
           Once your return is received, we will issue a refund to your original method of payment within 5 to 7 business days.
        </p>
      </section>

      {/* Shipping Policy */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Shipping Policy</h2>
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
      {/* Return and Refund Policy */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Governing Law</h2>
        <p className="text-gray-700 mb-4">
        These Terms shall be governed and construed in accordance with the laws of Odisha, India, without regard to its conflict of law provisions.
        </p>
      </section>
      {/* Return and Refund Policy */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4"> Contact Us</h2>
        <p className="text-gray-700 mb-4">
        If you have any questions about these Terms, please contact us at kroztekintegratedsolution@gmail.com or call us at +918637214899
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

export default TermsAndConditionsPage;
