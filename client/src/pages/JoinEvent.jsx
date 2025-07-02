import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import BASE_URL from "../config";

const JoinEvent = () => {
  const [events, setEvents] = useState([]);
  const [joinedEventIds, setJoinedEventIds] = useState([]);
  const [filteredGame, setFilteredGame] = useState("All");

  const user = JSON.parse(localStorage.getItem("meethub-user"));
  const games = ["All", "VALORANT", "BGMI", "FREE FIRE", "PUBG PC"];

  useEffect(() => {
    fetchEvents();
    if (user?.id) fetchJoinedEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get(`${BASE_URL}events`);
      const approvedEvents = res.data.filter((event) => event.isApproved);
      setEvents(approvedEvents);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  const fetchJoinedEvents = async () => {
    try {
      const res = await axios.get(`${BASE_URL}joined/${user.id}`);
      const ids = res.data.map((item) => item.eventId?._id || item.eventId);
      setJoinedEventIds(ids);
    } catch (err) {
      console.error("Error fetching joined events:", err);
    }
  };

  const visibleEvents =
    filteredGame === "All"
      ? events
      : events.filter(
          (e) => (e.game || "").toLowerCase() === filteredGame.toLowerCase()
        );

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-10">
        🎮 Join Esports Events
      </h1>

      <div className="flex flex-wrap gap-3 justify-center mb-10">
        {games.map((game, index) => (
          <button
            key={index}
            onClick={() => setFilteredGame(game)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${
              filteredGame === game
                ? "bg-purple-600 text-white shadow"
                : "bg-gray-100 text-gray-700 hover:bg-purple-100"
            }`}
          >
            {game}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {visibleEvents.length > 0 ? (
          visibleEvents.map((event) => {
            const alreadyJoined = joinedEventIds.includes(event._id);

            return (
              <div
                key={event._id}
                className={`relative ${
                  alreadyJoined ? "pointer-events-none opacity-60" : ""
                }`}
              >
                <Link to={`/join-event/register/${event._id}`}>
                  <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <div className="relative">
                      <img
                        src={event.gameImage}
                        alt={event.title}
                        className="w-full h-48 object-cover"
                      />

                      {alreadyJoined && (
                        <span className="absolute top-2 right-2 bg-green-600 text-white text-xs px-3 py-1 rounded-full shadow-md">
                          ✅ Already Joined
                        </span>
                      )}
                    </div>

                    <div className="p-4 space-y-2">
                      <h2 className="text-xl font-bold text-gray-800 line-clamp-1">
                        {event.title}
                      </h2>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {event.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                          🎯 {event.game}
                        </span>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                          📅 {event.date?.slice(0, 10)}
                        </span>
                      </div>

                      <p className="text-xs text-gray-500 mt-2">
                        👤 Hosted by:{" "}
                        <span className="font-medium text-gray-800">
                          {event.hostedBy || "Anonymous"}
                        </span>
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No events found for{" "}
            <span className="font-medium">{filteredGame}</span>.
          </p>
        )}
      </div>
    </div>
  );
};

export default JoinEvent;
