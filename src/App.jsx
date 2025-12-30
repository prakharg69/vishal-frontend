import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Services from "./pages/Services";
import HowItWorks from "./pages/HowItWorks";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ResponderDashboard from "./pages/ResponderDashboard";
import UserDashboard from "./pages/UserDashboard";

export default function App() {
  const { isLoggedIn, user, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/about" element={<About />} />

        {/* Auth Routes */}
        <Route
          path="/login/:role"
          element={!isLoggedIn ? <Login /> : <Navigate to={`/${user.role}/dashboard`} />}
        />
        <Route
          path="/signup/:role"
          element={!isLoggedIn ? <Signup /> : <Navigate to={`/${user.role}/dashboard`} />}
        />

        {/* Protected Dashboards */}
        <Route
          path="/user/dashboard"
          element={
            isLoggedIn && user?.role === "user" ? (
              <UserDashboard />
            ) : (
              <Navigate to="/login/user" />
            )
          }
        />

        <Route
          path="/responder/dashboard"
          element={
            isLoggedIn && user?.role === "responder" ? (
              <ResponderDashboard />
            ) : (
              <Navigate to="/login/responder" />
            )
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
