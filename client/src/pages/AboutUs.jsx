import React from "react";
import { Link } from "react-router-dom";
const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-8 lg:px-16 text-gray-800">
      <section className="mb-12">
        <Link to='/'>Home</Link>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#5465FF] mb-4">
          About MeetHub
        </h1>
        <p className="text-lg sm:text-xl text-gray-600">
          MeetHub is a modern platform built to bring gamers together through
          seamless online event hosting, participation, and community-driven
          competition. Whether you're into Valorant, BGMI, Free Fire, or PUBG
          PC, MeetHub helps you find or host events easily — with plans to bring
          offline tournaments in the future.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-[#333] mb-2">
          Our Mission
        </h2>
        <p className="text-gray-700 text-base">
          Our mission is to build a thriving hub for gaming communities across
          India and beyond, allowing anyone to organize or participate in
          thrilling tournaments with ease. We empower individuals, brands, and
          creators to run tournaments, connect with players, and build a
          reputation in the gaming ecosystem.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-[#333] mb-2">
          What Makes Us Unique?
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-base text-gray-700">
          <li>
            🕹️ Simple and intuitive interface to host or join events in just a
            few clicks.
          </li>
          <li>
            🛡️ Every event goes through a review system for fairness and
            quality.
          </li>
          <li>
            🌐 Supporting top games like Valorant, Free Fire, BGMI, and more.
          </li>
          <li>
            🤝 We're working on bringing offline community tournaments to your
            city soon.
          </li>
          <li>
            📈 Track your profile, past games, and build your gaming portfolio.
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-[#333] mb-2">
          Who We Are
        </h2>
        <p className="text-base text-gray-700">
          MeetHub is proudly built by{" "}
          <span className="font-semibold">DevDopz</span>, a youth-led software
          company founded by passionate gamers and developers. We're a team of
          dreamers from Kerala 🇮🇳, hustling to change how online and offline
          gaming tournaments work in India. We believe in fair play, community
          growth, and providing a platform where everyone — from casual players
          to competitive pros — can shine.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-[#333] mb-2">Contact Us</h2>
        <p className="text-base text-gray-700">
          Got questions, ideas, or want to partner? Hit us up!
        </p>
        <ul className="mt-2 list-disc pl-6 text-sm text-gray-700">
          <li>
            Email:{" "}
            <a
              href="mailto:support@meethub.live"
              className="text-blue-600 underline"
            >
              support@meethub.live
            </a>
          </li>
          <li>
            Contact Page:{" "}
            <a href="/contact" className="text-blue-600 underline">
              meethub.live/contact
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default AboutUs;
