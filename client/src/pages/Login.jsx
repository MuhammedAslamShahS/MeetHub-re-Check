import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BASE_URL from "../config";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${BASE_URL}auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Invalid credentials");
        return;
      }

      // ✅ Save user and token
      localStorage.setItem("meethub-user", JSON.stringify(data.user));
      localStorage.setItem("meethub-token", data.token);

      // Navigate to homepage
      navigate("/");
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
      {/* Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-20">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Welcome Back
          </h2>
          <p className="text-sm text-gray-500 text-center mt-1">
            Login to your MeetHub account
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#5465FF] hover:bg-[#3f4fd0] text-white py-2 rounded-lg font-semibold"
            >
              Login
            </button>

            {error && <p className="text-sm text-red-500 text-center mt-2">{error}</p>}
          </form>

          <p className="text-sm text-gray-600 text-center mt-4">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#5465FF] font-medium hover:underline">
              Sign up here
            </Link>
          </p>
        </div>
      </div>

      {/* Image Section */}
      <div className="w-full lg:w-1/2 hidden lg:block">
        <img
          src="/Hero.png"
          alt="Login Visual"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
