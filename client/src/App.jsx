import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import JoinEvent from "./pages/JoinEvent";
import HostEvent from "./pages/HostEvent";
import EditEvent from "./pages/EditEvent";
import VerifyOtp from "./pages/VerifyOtp";
import TermsConditions from "./pages/TermsConditions";
import Contact from "./pages/Contact";
import Pricing from "./pages/Pricing";

import WithNavbarLayout from "./layouts/WithNavbarLayout";
import NoNavbarLayout from "./layouts/NoNavbarLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import EventRegister from "./pages/EventRegister";
import AboutUs from "./pages/AboutUs";
import NotFound from "./pages/NotFound";
import TopTeams from "./pages/TopTeams";
import WithFooterLayout from "./layouts/WithFooterLayout";

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <WithNavbarLayout>
            <WithFooterLayout>
              <Home />
            </WithFooterLayout>
          </WithNavbarLayout>
        }
      />
      <Route
        path="/login"
        element={
          <NoNavbarLayout>
            <Login />
          </NoNavbarLayout>
        }
      />
      <Route
        path="/signup"
        element={
          <NoNavbarLayout>
            <Signup />
          </NoNavbarLayout>
        }
      />

      {/* Protected Pages */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <WithNavbarLayout>
              <Profile />
            </WithNavbarLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/join-event"
        element={
          <ProtectedRoute>
            <WithNavbarLayout>
              <JoinEvent />
            </WithNavbarLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/host-event"
        element={
          <ProtectedRoute>
            <WithNavbarLayout>
              <HostEvent />
            </WithNavbarLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/contact"
        element={
          <WithNavbarLayout>
            <Contact />
          </WithNavbarLayout>
        }
      />
      <Route
        path="/top-teams"
        element={
          <WithNavbarLayout>
            <TopTeams />
          </WithNavbarLayout>
        }
      />

      <Route
        path="/join-event/register/:id"
        element={
          <WithNavbarLayout>
            <EventRegister />
          </WithNavbarLayout>
        }
      />

      
      <Route path="*" element={<NotFound />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/terms" element={<TermsConditions />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/" element={<Home />} />
      <Route path="/join-event" element={<JoinEvent />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/join/:id" element={<EventRegister />} />
      <Route path="/edit-event/:id" element={<EditEvent />} />
    </Routes>
  );
};

export default App;
