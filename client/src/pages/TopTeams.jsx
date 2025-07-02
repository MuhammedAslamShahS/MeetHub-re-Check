import React from "react";

const topTeams = [
  {
    name: "G2",
    logo: "https://preview.redd.it/my-take-on-the-g2-logo-details-in-my-comment-v0-3rwwsqhjvis81.jpg?width=640&crop=smart&auto=webp&s=ddf12be392d8e43efcbdb2f2ac46bcb721e9106e",
    tagline: "G2",
    members: 8,
    region: "India",
  },
  {
    name: "Sentinels",
    logo: "https://prosettings.net/cdn-cgi/image/dpr=1%2Cf=auto%2Cfit=cover%2Ch=217%2Cq=95%2Cw=217/wp-content/uploads/sentinels.png",
    tagline: "Swift and Silent",
    members: 6,
    region: "South Korea",
  },
  {
    name: "DRX",
    logo: "https://i.namu.wiki/i/ipqP0FGVYMF_jd39iBrHY4AC0IdJxXZ1SH28k8x3ZFj0vDXFOd4pDNhjjzExAIuozw_5D0Ke3sU_N9cUdqLNYQ.webp",
    tagline: "Dominate the Arena",
    members: 10,
    region: "United States",
  },
  {
    name: "IRONFURY",
    logo: "/src/assets/Screenshot 2025-06-24 220511.png",
    tagline: "Dominate the Arena",
    members: 50,
    region: "India",
  },
];

const TopTeams = () => {
  return (
    <div className="min-h-screen text-white py-16 px-4 sm:px-10 font-sans">
      <h1 className="text-center text-5xl text-black mb-16">
        🌟 Featured Esports Teams
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {topTeams.map((team, i) => (
          <div
            key={i}
            className="group relative rounded-2xl overflow-hidden bg-white/5 backdrop-blur-xl shadow-2xl border border-white/10 hover:scale-[1.02] hover:shadow-blue-600/40 transition-all duration-300"
          >
            {/* Diagonal Accent */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-tr from-purple-600 to-pink-500 rotate-45 transform origin-top-right -translate-y-12 translate-x-12 z-0 blur-[2px]" />

            {/* Card Content */}
            <div className="relative z-10 p-6 flex flex-col items-center text-center">
              <img
                src={team.logo}
                alt={team.name}
                className="w-24 h-24 object-cover shadow-md  mb-4"
              />
              <h2 className="text-2xl font-bold text-black mb-1">
                {team.name}
              </h2>
              <p className="text-gray-600 text-sm italic mb-4">{team.tagline}</p>
              <div className="text-sm text-gray-600 space-y-1">
                <p>🌍 Region: <span className="text-gray-600 font-medium">{team.region}</span></p>
                <p>👥 Players: <span className="text-gray-600 font-medium">{team.members}</span></p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopTeams;
