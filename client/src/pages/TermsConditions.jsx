import React from "react";
import { useNavigate } from "react-router-dom";

const TermsConditions = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white p-6 sm:p-10 rounded-lg shadow-lg border border-gray-200">

        {/* 🟦 Go Back Button */}
        <div className="mb-6">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-sm sm:text-base font-medium text-[#5465FF] hover:underline transition"
          >
            <span className="text-xl">←</span> Go Back to Home
          </button>
        </div>

        {/* 🔷 Heading */}
        <h1 className="text-2xl sm:text-3xl font-bold text-[#5465FF] mb-2">
          Terms and Conditions
        </h1>
        <p className="text-sm text-gray-500 mb-6">Effective Date: June 22, 2025</p>

        {/* 📄 Sections */}
        {[
          {
            title: "1. Acceptance of Terms",
            body: "By creating an account, hosting or participating in an event, or otherwise accessing or using any part of the Service, you signify your irrevocable acceptance of these Terms and agree to comply with them."
          },
          {
            title: "2. User Accounts",
            body: (
              <>
                <p><strong>a. Registration:</strong> You must register to access certain features and provide accurate, up-to-date information.</p>
                <p><strong>b. Account Responsibilities:</strong> You are responsible for all activity under your account and must protect your password.</p>
                <p><strong>c. Eligibility:</strong> Minimum age to use the service is 13.</p>
              </>
            )
          },
          {
            title: "3. Event Hosting and Participation",
            body: (
              <>
                <p><strong>a. Event Content:</strong> You are responsible for your content and agree not to post anything illegal, offensive, infringing, or malicious.</p>
                <ul className="list-disc pl-5 text-sm text-gray-700 my-2">
                  <li>Illegal, harmful, threatening, or abusive content</li>
                  <li>Intellectual property infringement</li>
                  <li>Viruses or malicious code</li>
                  <li>Hate speech or harassment</li>
                </ul>
                <p><strong>b. Online Events:</strong> Follow all game rules, avoid cheating, and use proper equipment.</p>
                <p><strong>c. Event Review:</strong> Events are reviewed in 2+ days. We may reject or request changes.</p>
                <p><strong>d. Future Offline Events:</strong> Offline events will be supported later with updated terms.</p>
              </>
            )
          },
          {
            title: "4. Prohibited Activities",
            body: (
              <ul className="list-disc pl-5 text-sm text-gray-700">
                <li>Illegal use of the service</li>
                <li>Impersonating others</li>
                <li>Unauthorized data collection</li>
                <li>Disrupting the service or network</li>
                <li>Hacking or unauthorized access</li>
                <li>Using bots/scrapers without permission</li>
                <li>Reproducing content without consent</li>
              </ul>
            )
          },
          {
            title: "5. Intellectual Property",
            body: "All content and features are owned by MeetHub or licensors. You are granted a limited, non-exclusive, non-transferable license for personal, non-commercial use."
          },
          {
            title: "6. Disclaimers",
            body: "The service is provided 'as is'. We don't guarantee uninterrupted or error-free access, or event outcomes."
          },
          {
            title: "7. Limitation of Liability",
            body: "We are not liable for any indirect, incidental, or consequential damages including data loss, revenue loss, or access issues."
          },
          {
            title: "8. Indemnification",
            body: "You agree to defend and indemnify MeetHub against any claims arising from your misuse or violation of these Terms."
          },
          {
            title: "9. Termination",
            body: "We can suspend or terminate your access at any time if you violate these Terms. You can stop using the service anytime."
          },
          {
            title: "10. Governing Law",
            body: "These Terms are governed by the laws of India."
          },
          {
            title: "11. Dispute Resolution",
            body: "Disputes will be handled by the courts in Kerala, India or through arbitration as decided."
          },
          {
            title: "12. Changes to Terms",
            body: "We may update these Terms at any time. We'll notify you of material changes 30 days before they take effect."
          },
          {
            title: "13. Contact Us",
            body: (
              <>
                <p>If you have questions, contact us:</p>
                <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                  <li>Email: <a href="mailto:support@meethub.live" className="text-blue-600 underline">support@meethub.live</a></li>
                  <li>Contact Page: <a href="/contact" className="text-blue-600 underline">meethub.live/contact</a></li>
                </ul>
              </>
            )
          }
        ].map((section, index) => (
          <div key={index} className="mb-6">
            <h2 className="text-lg font-semibold text-[#333] mb-2">{section.title}</h2>
            <div className="text-sm text-gray-700 space-y-2">{section.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TermsConditions;
