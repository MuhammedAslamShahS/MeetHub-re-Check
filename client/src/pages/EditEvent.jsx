import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../config";
import toast from "react-hot-toast";

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null); // null initially
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`${BASE_URL}events/${id}`);
        setFormData({
          title: res.data.title || "",
          description: res.data.description || "",
          game: res.data.game || "",
          gameImage: res.data.gameImage || "",
          date: res.data.date ? res.data.date.slice(0, 10) : "",
        });
      } catch (err) {
        console.error("Error fetching event", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${BASE_URL}events/${id}`, formData);
      toast.success("✅ Event updated successfully!")
      navigate("/profile");
    } catch (err) {
      console.error("Update failed", err);
      alert("❌ Failed to update event");
    }
  };

  if (loading || !formData)
    return <p className="text-center py-10 text-gray-600">Loading event details...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white shadow-xl rounded-xl p-8 space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          ✏️ Edit Event
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Event Title"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Event Description"
            rows={3}
            className="w-full px-4 py-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />

          <input
            type="text"
            name="game"
            value={formData.game}
            onChange={handleChange}
            placeholder="Game (e.g., VALORANT)"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <input
            type="text"
            name="gameImage"
            value={formData.gameImage}
            onChange={handleChange}
            placeholder="Game Banner Image URL"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-md transition-all"
        >
          ✅ Update Event
        </button>
      </form>
    </div>
  );
};

export default EditEvent;
