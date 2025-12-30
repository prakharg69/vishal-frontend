import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const navigate = useNavigate();
  const { isLoggedIn, logout, user } = useAuth();

  const navItems = [
    { name: "Home", to: "/" },
    { name: "Services", to: "/services" },
    { name: "How It Works", to: "/how-it-works" },
    { name: "About", to: "/about" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleDashboard = () => {
    handleNavClick(
      user?.role === "responder"
        ? "/responder/dashboard"
        : "/user/dashboard"
    );
  };

  // ✅ LOGOUT HANDLER (IMPORTANT)
  const handleLogout = async () => {
    if (loggingOut) return;

    try {
      setLoggingOut(true);
      await logout(); // calls API + clears state
      navigate("/login/user");
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setLoggingOut(false);
      setIsOpen(false);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-blue-100"
            : "bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* LOGO */}
            <div
              onClick={() => handleNavClick("/")}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#2563eb] to-blue-700 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-white rounded-md relative">
                  <div className="absolute top-1/2 left-1/2 w-4 h-0.5 bg-white -translate-x-1/2 -translate-y-1/2" />
                  <div className="absolute top-1/2 left-1/2 w-0.5 h-4 bg-white -translate-x-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <h1 className="text-2xl font-bold text-[#0f172a]">
                  Quick<span className="text-[#2563eb]">Response</span>
                </h1>
                <div className="flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs text-[#64748b] font-medium">
                    System Online
                  </span>
                </div>
              </div>
            </div>

            {/* DESKTOP NAV */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.to}
                  onClick={() => handleNavClick(item.to)}
                  className={({ isActive }) =>
                    `font-medium transition-colors ${
                      isActive
                        ? "text-[#2563eb]"
                        : "text-[#64748b] hover:text-[#2563eb]"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>

            {/* DESKTOP ACTIONS */}
            <div className="hidden md:flex items-center space-x-4">
              {!isLoggedIn ? (
                <>
                  <button
                    onClick={() => handleNavClick("/login/user")}
                    className="px-4 py-2 rounded-lg text-[#2563eb] hover:bg-[#eff6ff] font-medium"
                  >
                    Login
                  </button>

                  <button
                    onClick={() => handleNavClick("/signup/user")}
                    className="px-6 py-2.5 bg-gradient-to-r from-[#2563eb] to-blue-600 text-white rounded-xl font-semibold"
                  >
                    Get Started →
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleDashboard}
                    className="px-4 py-2 rounded-lg text-[#2563eb] hover:bg-[#eff6ff] font-medium"
                  >
                    Dashboard
                  </button>

                  <button
                    onClick={handleLogout}
                    disabled={loggingOut}
                    className="px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 font-medium disabled:opacity-60"
                  >
                    {loggingOut ? "Logging out..." : "Logout"}
                  </button>
                </>
              )}
            </div>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-[#eff6ff]"
            >
              {isOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-blue-100 shadow-lg">
            <div className="px-6 py-4 space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.to)}
                  className="block w-full text-left py-3 px-4 rounded-lg text-[#64748b] hover:bg-[#eff6ff]"
                >
                  {item.name}
                </button>
              ))}

              <div className="pt-4 border-t border-blue-100 space-y-3">
                {!isLoggedIn ? (
                  <>
                    <button
                      onClick={() => handleNavClick("/login/user")}
                      className="w-full py-3 rounded-lg text-[#2563eb]"
                    >
                      Login
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleDashboard}
                      className="w-full py-3 rounded-lg text-[#2563eb]"
                    >
                      Dashboard
                    </button>

                    <button
                      onClick={handleLogout}
                      disabled={loggingOut}
                      className="w-full py-3 rounded-lg text-red-600 disabled:opacity-60"
                    >
                      {loggingOut ? "Logging out..." : "Logout"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer */}
      <div className="h-16 lg:h-20" />
    </>
  );
}
