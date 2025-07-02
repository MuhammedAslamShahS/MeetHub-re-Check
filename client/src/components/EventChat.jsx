// src/components/EventChat.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../config";

const EventChat = ({ eventId }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const user = JSON.parse(localStorage.getItem("meethub-user"));

  // Fetch messages
  const fetchMessages = async () => {
    try {
      const res = await axios.get(`${BASE_URL}chat/${eventId}`);
      setMessages(res.data);
    } catch (err) {
      console.error("Error loading messages:", err);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000); // Refresh every 5s
    return () => clearInterval(interval);
  }, [eventId]);

  // Send a message
  const sendMessage = async () => {
    if (!text.trim()) return;

    try {
      await axios.post(`${BASE_URL}chat`, {
        eventId,
        userId: user.id,
        text,
      });

      setText("");
      fetchMessages(); // Refresh immediately
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 max-h-[400px] overflow-y-auto">
      <h2 className="text-lg font-semibold mb-2 text-gray-800">💬 Event Chat</h2>

      <div className="space-y-2 max-h-[250px] overflow-y-auto">
        {messages.map((msg) => (
          <div key={msg._id} className="p-2 bg-gray-100 rounded-md">
            <span className="font-semibold text-blue-700">{msg.userId?.fullName || "Unknown"}:</span>{" "}
            <span>{msg.text}</span>
            <div className="text-xs text-gray-400">{new Date(msg.createdAt).toLocaleTimeString()}</div>
          </div>
        ))}
      </div>

      <div className="flex mt-3 gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border px-3 py-2 rounded-md"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default EventChat;
