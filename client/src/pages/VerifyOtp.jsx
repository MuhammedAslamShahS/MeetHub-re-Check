import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../config";
import toast from "react-hot-toast";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [isResending, setIsResending] = useState(false);
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("meethub-userId");
    if (!storedUserId) {
      toast.error("No user ID found. Please sign up again.");
      navigate("/signup");
    } else {
      setUserId(storedUserId);
    }
  }, [navigate]);

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}auth/verify-otp`, {
        userId,
        otp: otp.toString().trim(),
      });
      toast.success("✅ Email verified successfully!");
      localStorage.removeItem("meethub-userId");
      navigate("/");
    } catch (err) {
      toast.error("❌ OTP invalid or expired.");
    }
  };

  const handleResend = async () => {
    try {
      setIsResending(true);
      await axios.post(`${BASE_URL}auth/resend-otp`, { userId });
      toast.success("✅ OTP resent to your email.");
    } catch (err) {
      console.error("Resend failed", err);
      toast.error("❌ Failed to resend OTP.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-[#0f0f10] text-white">
      {/* Left Side - Game image */}
      <div className="hidden md:block w-1/2 h-screen">
        <img
          src="https://platform.polygon.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/19874924/VALORANT_Jett_Red_crop.jpg?quality=90&strip=all&crop=13.957157090668,0,72.085685818665,100"
          alt="Gamer OTP"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Side - OTP Form */}
      <div className="w-full md:w-1/2 p-10 flex flex-col items-center justify-center">
        <div className="w-full max-w-md bg-[#1f1f25] p-8 rounded-lg shadow-lg space-y-6">
          <h2 className="text-3xl font-bold text-center text-purple-400">
            Verify OTP
          </h2>
          <p className="text-center text-gray-400 text-sm">
            Enter the OTP sent to your email to complete verification.
          </p>

          <form onSubmit={handleVerify} className="space-y-4">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-3 rounded-md bg-[#2c2c36] text-white border border-gray-600 focus:outline-none focus:border-purple-500"
              required
            />
            <button
              type="submit"
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 transition duration-300 rounded-md text-white font-semibold"
            >
              Verify Now
            </button>
          </form>

          <p className="text-xs text-center text-gray-500">
            Didn’t receive OTP?{" "}
            <span
              onClick={handleResend}
              className={`text-purple-500 cursor-pointer hover:underline ${isResending ? "opacity-60 pointer-events-none" : ""}`}
            >
              {isResending ? "Sending..." : "Resend"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
