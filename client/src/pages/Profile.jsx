import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../config";
import AlertModal from "../components/AlertModal";
const Profile = () => {
  const [hostedEvents, setHostedEvents] = useState([]);
  const [joinedEvents, setJoinedEvents] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("meethub-user"));

  useEffect(() => {
    if (!user) return;
    const userId = user.id || user._id;

    axios
      .get(`${BASE_URL}events/hosted/${userId}`)
      .then((res) => setHostedEvents(res.data))
      .catch((err) => console.error("Error fetching hosted events", err));

    axios
      .get(`${BASE_URL}joined/${userId}`)
      .then((res) => {
        const joined = res.data.map((j) => j.eventId);
        setJoinedEvents(joined);
      })
      .catch((err) => console.error("Error fetching joined events", err));
  }, []);

  const [showAlert, setShowAlert] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}events/${selectedId}`);
      setHostedEvents((prev) => prev.filter((e) => e._id !== selectedId));
      setShowAlert(false);
    } catch (err) {
      console.error("Delete failed", err);
      setShowAlert(false);
    }
  };

  const triggerDelete = (id) => {
    setSelectedId(id);
    setShowAlert(true);
  };

  return (
    <div className="min-h-screen px-6 py-12 bg-gradient-to-tr from-white via-gray-50 to-white">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">
        👤 {user?.fullName || "Your"} Profile
      </h1>

      {/* Hosted Events */}
      <section className="mb-20">
        <h2 className="text-2xl font-semibold text-purple-700 mb-6 border-b border-gray-200 pb-2">
          🏁 Hosted Events
        </h2>
        {showAlert && (
          <AlertModal
            title="Delete Event"
            message="Are you sure you want to delete this event? This action cannot be undone."
            onConfirm={handleDelete}
            onCancel={() => setShowAlert(false)}
          />
        )}

        {hostedEvents.length === 0 ? (
          <p className="text-gray-500">You haven’t hosted any events yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {hostedEvents.map((event) => (
              <div
                key={event._id}
                className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition overflow-hidden"
              >
                <img
                  src={event.gameImage || "https://via.placeholder.com/400x200"}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 space-y-2">
                  <h3 className="text-xl font-bold text-gray-800 line-clamp-1">
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {event.description}
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs mt-2">
                    <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                      🎮 {event.game || "N/A"}
                    </span>
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      📅 {event.date?.slice(0, 10)}
                    </span>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => triggerDelete(event._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded text-sm"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => navigate(`/edit-event/${event._id}`)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded text-sm"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Joined Events */}
      <section>
        <h2 className="text-2xl font-semibold text-purple-700 mb-6 border-b border-gray-200 pb-2">
          🎮 Joined Events
        </h2>

        {joinedEvents.length === 0 ? (
          <p className="text-gray-500">You haven’t joined any events yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {joinedEvents.map((item, index) => {
              const event = item?.event || item;
              if (!event || typeof event !== "object") return null;

              return (
                <div
                  key={event._id || index}
                  className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition overflow-hidden"
                >
                  <img
                    src={
                      event.gameImage || "https://via.placeholder.com/400x200"
                    }
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4 space-y-2">
                    <h3 className="text-xl font-bold text-gray-800 line-clamp-1">
                      {event.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {event.description}
                    </p>
                    <div className="flex flex-wrap gap-2 text-xs mt-2">
                      <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                        🎯 {event.game || "N/A"}
                      </span>
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                        📅 {event.date?.slice(0, 10)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default Profile;
