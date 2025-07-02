import React, { useState } from "react";
import axios from "axios";
import BASE_URL from "../config";
import toast from "react-hot-toast";

const HostEvent = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    game: "",
    date: "",
    gameImage: "",
  });

  const user = JSON.parse(localStorage.getItem("meethub-user"));
  const games = ["VALORANT", "BGMI", "FREE FIRE", "PUBG PC"];

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const finalData = {
        ...formData,
        hostedBy: user?.email || user?.fullName || "Anonymous",
        userId: user?.id || user?._id,
      };

      await axios.post(`${BASE_URL}events`, finalData);
      toast.success(
        "✅ Event submitted successfully!\n🕐 Your event is under review and will appear within 2 days."
      );
      setFormData({
        title: "",
        description: "",
        game: "",
        date: "",
        gameImage: "",
      });
    } catch (error) {
      if (error.response?.status === 403) {
        toast.error(
          "⚠️ You’ve reached your free event limit.\nUpgrade to Pro to host unlimited events!"
        );
        setTimeout(() => {
          window.location.href = "/pricing";
        }, 1500);
      } else {
        console.error("Error hosting event:", error);
        toast.error("Something went wrong. Try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 py-10 flex justify-center">
      <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-md border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Host an Event
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Event Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Valorant 5v5 Clash"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write a short description of the event..."
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Game
            </label>
            <select
              name="game"
              value={formData.game}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-purple-500"
              required
            >
              <option value="">-- Choose Game --</option>
              {games.map((game) => (
                <option key={game} value={game}>
                  {game}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Event Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Game Image URL
            </label>
            <input
              type="text"
              name="gameImage"
              value={formData.gameImage}
              onChange={handleChange}
              placeholder="https://example.com/game-banner.jpg"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hosted By
            </label>
            <input
              type="text"
              value={user?.email || user?.fullName || "Anonymous"}
              disabled
              className="w-full px-4 py-2 border border-gray-200 bg-gray-100 text-gray-600 rounded-md"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md font-semibold transition-all duration-300"
          >
            🚀 Host Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default HostEvent;
