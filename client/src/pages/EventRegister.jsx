import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../config";
import toast from "react-hot-toast";

const EventRegister = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    gamerTag: "",
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchEventDetails();
  }, [id]);

  const fetchEventDetails = async () => {
    try {
      const res = await axios.get(`${BASE_URL}events`);
      const match = res.data.find((e) => e._id === id);
      setEvent(match);
    } catch (err) {
      console.error("Error loading event details", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("meethub-user"));
    if (!user) return navigate("/login");

    if (!acceptedTerms) {
      toast.success("❗ Please accept the terms and conditions before registering.");
      return;
    }

    try {
      await axios.post(`${BASE_URL}joined`, {
        userId: user.id,
        eventId: id,
        ...formData,
      });

      toast.success("✅ Successfully registered!");
      navigate("/join-event");
    } catch (err) {
      if (err.response?.status === 409) {
        alert("⚠️ You already joined this event.");
        navigate("/join-event");
      } else {
        console.error("Registration error:", err);
      }
    }
  };

  if (!event)
    return (
      <p className="text-center mt-10 text-gray-600 animate-pulse">
        Loading event details...
      </p>
    );

  return (
    <div className="min-h-screen px-6 py-12 bg-gradient-to-br from-gray-100 to-white">
      <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-xl p-8 space-y-8">
        <h2 className="text-4xl font-extrabold text-center text-gray-900">
          Register for {event.title}
        </h2>

        <img
          src={event.gameImage}
          alt={event.title}
          className="w-full h-60 object-cover rounded-lg shadow"
        />

        <div className="space-y-1">
          <p className="text-lg text-gray-700">{event.description}</p>
          <div className="text-sm text-gray-500 mt-2">
            <p>
              👤 Hosted by: <strong>{event.hostedBy}</strong>
            </p>
            <p>
              📅 Date: <strong>{event.date?.slice(0, 10)}</strong>
            </p>
          </div>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <input
            type="text"
            name="fullName"
            placeholder="Your Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-600 focus:outline-none"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-600 focus:outline-none"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-600 focus:outline-none"
            required
          />
          <input
            type="text"
            name="gamerTag"
            placeholder="In-game Name / GamerTag"
            value={formData.gamerTag}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-600 focus:outline-none"
            required
          />

          {/* ✅ Terms and Conditions Checkbox */}
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={() => setAcceptedTerms(!acceptedTerms)}
              className="mt-1 accent-purple-600"
              required
            />
            <label className="text-sm text-gray-600">
              I agree to the{" "}
              <span
                className="text-purple-600 font-medium hover:underline cursor-pointer"
                onClick={() => navigate("/terms")}
              >
                Terms & Conditions
              </span>{" "}
              of this tournament.
            </label>
          </div>

          <button
            type="submit"
            disabled={!acceptedTerms}
            className={`w-full py-3 rounded-lg text-white font-semibold transition-all duration-200 ${
              acceptedTerms
                ? "bg-purple-600 hover:bg-purple-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Join Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventRegister;
