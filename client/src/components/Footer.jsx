import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] text-gray-300 pt-12 pb-6">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 border-b border-purple-800 pb-10">

        {/* Brand Info */}
        <div>
          <h2 className="text-3xl font-bold text-purple-400 mb-3 tracking-tight">
            PopinEvents<span className="text-white">.in</span>
          </h2>
          <p className="text-sm leading-relaxed text-gray-400">
            Where gamers host, join, and conquer. Built for esports, powered by community.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold text-purple-300 mb-4">Explore</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white transition-all">🏠 Home</Link></li>
            <li><Link to="/join-event" className="hover:text-white transition-all">🎮 Events</Link></li>
            <li><Link to="/host-event" className="hover:text-white transition-all">🎤 Host Event</Link></li>
            <li><Link to="/top-teams" className="hover:text-white transition-all">🏆 Top Teams</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold text-purple-300 mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/contact" className="hover:text-white transition-all">📞 Contact</Link></li>
            <li><Link to="/terms" className="hover:text-white transition-all">📄 Terms & Conditions</Link></li>
            <li><Link to="/about" className="hover:text-white transition-all">ℹ️ About Us</Link></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold text-purple-300 mb-4">Social</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="https://instagram.com/" target="_blank" rel="noreferrer" className="hover:text-white transition-all">
                📷 Instagram
              </a>
            </li>
            <li>
              <a href="https://discord.gg/" target="_blank" rel="noreferrer" className="hover:text-white transition-all">
                💬 Discord
              </a>
            </li>
            <li>
              <a href="mailto:teamdevdopz@gmail.com" className="hover:text-white transition-all">
                📧 teamdevdopz@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center text-xs text-gray-500 mt-6">
        &copy; {new Date().getFullYear()} <span className="text-purple-300 font-medium">PopinEvents.in</span> — All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
