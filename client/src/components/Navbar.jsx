import React, { useEffect, useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [eventDropdownOpen, setEventDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleEventDropdown = () => setEventDropdownOpen(!eventDropdownOpen);

  useEffect(() => {
    const storedUser = localStorage.getItem("meethub-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("meethub-user");
    localStorage.removeItem("meethub-token");
    setUser(null);
    navigate("/login");
  };

  useEffect(() => {
    const fetchUpdatedUser = async () => {
      const localUser = JSON.parse(localStorage.getItem("meethub-user"));
      if (!localUser?._id) return;

      const res = await axios.get(`${BASE_URL}users/${localUser._id}`);
      localStorage.setItem("meethub-user", JSON.stringify(res.data));
    };

    fetchUpdatedUser();
  }, []);

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center relative z-50">
      {/* Logo */}
      <div
        onClick={() => navigate("/")}
        className="flex items-center gap-2 cursor-pointer"
      >
        <h1 className="text-blue-600 font-bold text-[23px]">
          POPIN<span className="text-black">EVENTS</span>
        </h1>

        {user && (
          <div className="flex items-center gap-2">
            {user.subscriptionPlan === "pro" ? (
              <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                <svg
                  className="w-4 h-4 text-purple-600"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M9 16.2l-3.5-3.6-1.4 1.4L9 19 20 8l-1.4-1.4z" />
                </svg>
                Esports Subscription
              </span>
            ) : (
              <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs font-semibold">
                Free Plan
              </span>
            )}
          </div>
        )}
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6">
        <div className="relative">
          <button
            onClick={toggleEventDropdown}
            className="text-gray-700 font-semibold hover:text-blue-600 hover:cursor-pointer"
          >
            Events
          </button>
          {eventDropdownOpen && (
            <div className="absolute top-8 left-0 bg-white border border-gray-200 rounded-md shadow-lg w-40">
              <Link
                to="/join-event"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Join Event
              </Link>
              <Link
                to="/host-event"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Host Event
              </Link>
            </div>
          )}
        </div>

        {/* Extra Links */}
        <Link
          to="/top-teams"
          className="text-gray-700 font-medium hover:text-blue-600"
        >
          Esports Teams
        </Link>
        <Link
          to="/about"
          className="text-gray-700 font-medium hover:text-blue-600"
        >
          About Us
        </Link>
        <Link
          to="/terms"
          className="text-gray-700 font-medium hover:text-blue-600"
        >
          Terms
        </Link>
        <Link
          to="/contact"
          className="text-gray-700 font-medium hover:text-blue-600"
        >
          Contact
        </Link>
        <Link
          to="/pricing"
          className="text-gray-700 font-medium hover:text-blue-600"
        >
          Pricing
        </Link>

        {/* Auth Links */}
        {user ? (
          <>
            <Link to="/profile">
              <div
                title={user.fullName}
                className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center"
              >
                {user.fullName[0]?.toUpperCase()}
              </div>
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm text-red-500 hover:underline"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/signup">
              <button className="text-gray-700 font-medium hover:text-blue-600">
                Signup
              </button>
            </Link>
            <Link to="/login">
              <button className="bg-[#5465FF] hover:bg-[#4351cc] text-white px-4 py-2 rounded-md font-semibold shadow">
                Login
              </button>
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu Icon */}
      <div className="md:hidden">
        <button onClick={toggleMenu}>
          {menuOpen ? (
            <HiOutlineX className="w-6 h-6" />
          ) : (
            <HiOutlineMenu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white border-t border-gray-200 flex flex-col items-start px-6 py-4 md:hidden">
          <Link to="/" className="py-2 font-medium">
            Home
          </Link>
          <Link to="/join-event" className="py-2 font-medium">
            Join Event
          </Link>
          <Link to="/host-event" className="py-2 font-medium">
            Host Event
          </Link>
          <Link to="/about" className="py-2 font-medium">
            About Us
          </Link>
          <Link to="/terms" className="py-2 font-medium">
            Terms & Conditions
          </Link>
          <Link to="/contact" className="py-2 font-medium">
            Contact
          </Link>
          <Link to="/pricing" className="py-2 font-medium">
            Pricing
          </Link>

          {user ? (
            <>
              <Link to="/profile" className="py-2 font-medium">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="py-2 text-red-500 font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signup" className="py-2 font-medium">
                Signup
              </Link>
              <Link to="/login" className="py-2 font-medium">
                Login
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
