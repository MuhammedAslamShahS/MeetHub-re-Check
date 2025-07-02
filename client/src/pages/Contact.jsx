import React, { useState } from "react";
import axios from "axios";
import BASE_URL from "../config";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      await axios.post(`${BASE_URL}contact`, formData);
      setStatus("✅ Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Error sending message:", err);
      setStatus("❌ Failed to send message.");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side image */}
      <div className="hidden lg:flex w-1/2 h-screen">
  <img
    src="https://store-images.s-microsoft.com/image/apps.21507.13663857844271189.4c1de202-3961-4c40-a0aa-7f4f1388775a.20ed7782-0eda-4f9d-b421-4cc47492edc6"
    alt="Contact"
    className="w-full h-full object-cover object-center"
  />
</div>

      {/* Right side form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white px-6 py-16">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Contact Us</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            ></textarea>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold"
            >
              Send Message
            </button>
          </form>

          {status && (
            <p className="mt-4 text-sm text-center text-gray-600">{status}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
