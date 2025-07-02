import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BASE_URL from "../config";
import toast from "react-hot-toast";
import axios from "axios";

const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;

const plans = [
  {
    name: "Free",
    id: "free",
    price: "₹0",
    description: "Great for casual users who want to host a few events.",
    features: [
      "Host up to 2 events",
      "Access to event dashboard",
      "Basic Support",
    ],
  },
  {
    name: "Pro",
    id: "pro",
    price: "₹199/month",
    description: "Perfect for teams, creators, or organizations hosting often.",
    features: [
      "Unlimited event hosting",
      "Unlimited event joining",
      "Verified Badge",
      "Event Analytics",
      "Priority Support",
    ],
  },
];

const Pricing = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("meethub-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const currentPlan = user?.subscriptionPlan || "free";

  const handleUpgrade = async () => {
    if (!user) {
      toast.error("Please login to upgrade your plan.");
      return navigate("/login");
    }

    try {
      const orderRes = await axios.post(`${BASE_URL}payment/create-order`);
      const options = {
        key: RAZORPAY_KEY_ID,
        amount: orderRes.data.amount,
        currency: "INR",
        name: "MeetHub Pro",
        description: "Upgrade to Pro Plan",
        order_id: orderRes.data.id,
        handler: async function (response) {
          try {
            const verifyRes = await axios.post(
              `${BASE_URL}payment/verify-upgrade`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                userId: user.id,
              }
            );

            

            if (verifyRes.data.success) {
              localStorage.setItem(
                "meethub-user",
                JSON.stringify(verifyRes.data.user)
              );
              setUser(verifyRes.data.user);
              toast.success("🎉 You're now a Pro user!");
              navigate("/profile");
            }
          } catch (err) {
            console.error("Verification Error:", err);
            toast.error("❌ Verification failed. Please contact support.");
          }
        },
        prefill: {
          name: user.fullName,
          email: user.email,
        },
        theme: {
          color: "#5465FF",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (err) {
      console.error("Razorpay Order Error:", err);
      toast.error("❌ Failed to start payment. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white px-6 py-16">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-purple-600">
          Our Subscription Plans
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto mb-12">
          Upgrade anytime to unlock full power for your esports events.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {plans.map((plan) => {
            const isCurrent = plan.id === currentPlan;

            return (
              <div
                key={plan.id}
                className="border border-gray-200 shadow-md rounded-lg p-8 text-left bg-white hover:shadow-lg transition duration-300"
              >
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  {plan.name} Plan
                </h2>
                <p className="text-xl text-purple-500 font-bold mb-4">
                  {plan.price}
                </p>
                <p className="text-gray-500 mb-6">{plan.description}</p>

                <ul className="space-y-3 mb-8 text-gray-600 text-sm">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <span className="text-purple-500 mr-2">✔️</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                {isCurrent ? (
                  <button
                    className="w-full bg-gray-300 text-gray-700 font-medium py-2 rounded-md cursor-not-allowed"
                    disabled
                  >
                    ✅ Current Plan
                  </button>
                ) : (
                  <>
                    {plan.id === "pro" ? (
                      <button
                        onClick={handleUpgrade}
                        className="block text-center w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-md transition"
                      >
                        Upgrade to Pro
                      </button>
                    ) : (
                      <Link
                        to="/"
                        className="block text-center w-full bg-gray-200 text-gray-800 font-semibold py-2 rounded-md"
                      >
                        Get Started
                      </Link>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>

        <p className="text-sm text-gray-400 mt-10">
          Need help?{" "}
          <span className="text-purple-600 font-medium cursor-pointer hover:underline">
            Contact Support
          </span>
        </p>
      </div>
    </div>
  );
};

export default Pricing;
