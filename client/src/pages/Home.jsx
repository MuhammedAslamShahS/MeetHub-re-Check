import { FaYoutube, FaTelegram, FaInstagram } from "react-icons/fa";
import { SiFacebook, SiTwitch } from "react-icons/si";
import { Link } from "react-router-dom";
import heroImg from "/src/assets/Hero.png"; // replace with your actual image file name

const Home = () => {
  return (
    <section className="w-full h-[calc(100vh-80px)] bg-white flex flex-col-reverse lg:flex-row items-center justify-between px-6 md:px-20 lg:py-0 gap-10">
      {/* Left Content */}
      <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
        <h2 className="text-2xl font-medium text-gray-800">
          When your <span className="text-blue-600">❤</span>
        </h2>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
          Event Success
        </h1>
        <p className="text-gray-500 max-w-md mx-auto lg:mx-0">
          “ Once in a while, right in the middle of an ordinary life, love gives
          us a fairy tale. ”
        </p>

        <div className="flex justify-center lg:justify-start gap-4">
          <Link to="/join-event">
            <button className="bg-[#5465FF] hover:bg-[#3f4fd0] text-white px-6 py-2 rounded-md font-semibold shadow-md">
              Join Now
            </button>
          </Link>

          <Link to="/host-event">
            <button className="bg-white border border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-2 rounded-md font-semibold shadow-sm">
              Host Now
            </button>
          </Link>
        </div>

        {/* Social Icons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 justify-items-center lg:justify-items-start">
          <div className="flex items-center gap-2 text-gray-700">
            <FaYoutube className="text-xl text-red-600" />
            @MeetHub.gg
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <SiFacebook className="text-xl text-blue-700" />
            @MeetHub.gg
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <FaTelegram className="text-xl text-blue-500" />
            @MeetHub.gg
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <FaInstagram className="text-xl text-pink-500" />
            @MeetHub.gg
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <SiTwitch className="text-xl text-purple-600" />
            @MeetHub.gg
          </div>
        </div>
      </div>

      {/* Right Image */}
      <div className="w-full lg:w-1/2 h-full flex justify-center items-start">
        <img src={heroImg} alt="Hero" className="w-full h-full object-cover" />
      </div>
    </section>
  );
};

export default Home;
