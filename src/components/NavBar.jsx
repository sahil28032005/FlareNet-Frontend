import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";
import { FaUserCircle, FaSignOutAlt, FaSignInAlt, FaUserPlus, FaBars, FaTimes, FaCode } from "react-icons/fa";
import { FiHome, FiFolder, FiInfo, FiMail } from "react-icons/fi";

const NavBar = () => {
  const { user, removeUserData } = useUser();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authTokenLogin");
    removeUserData();
    setMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-black/20 backdrop-blur-md border-b border-white/10 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent hover:from-blue-500 hover:to-cyan-500 transition-all duration-300">
              FlareNet
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              className="inline-flex items-center justify-center p-2 rounded-md text-blue-400 hover:text-blue-500 hover:bg-black/20 focus:outline-none transition-colors duration-200"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-between flex-1 ml-10">
            <div className="flex space-x-4">
              {[
                { name: "Home", icon: FiHome, path: "/" },
                { name: "My Projects", icon: FiFolder, path: "/projects" },
                { name: "Code Editor", icon: FaCode, path: "/editor/123" },
                { name: "About Us", icon: FiInfo, path: "/about" },
                { name: "Contact Us", icon: FiMail, path: "/contact" }
              ].map(({ name, icon: Icon, path }) => (
                <Button
                  key={name}
                  variant="ghost"
                  onClick={() => navigate(path)}
                  className="text-gray-300 hover:text-blue-400 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-all duration-300 hover:bg-white/10 hover:shadow-glow"
                >
                  <Icon className="h-4 w-4" />
                  {name}
                </Button>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              {!user?.email ? (
                <>
                  <Button
                    variant="ghost"
                    onClick={() => navigate("/login")}
                    className="text-blue-400 hover:text-blue-300 border border-blue-400/50 hover:border-blue-300 px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-glow-blue"
                  >
                    <FaSignInAlt className="mr-2" />
                    Login
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => navigate("/signup")}
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-glow-cyan"
                  >
                    <FaUserPlus className="mr-2" />
                    Sign Up
                  </Button>
                </>
              ) : (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-gray-300 bg-white/5 px-4 py-2 rounded-full">
                    <FaUserCircle className="text-blue-400 h-5 w-5" />
                    <span className="text-sm font-medium">{user.email}</span>
                  </div>
                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="text-red-400 hover:text-red-300 border border-red-400/50 hover:border-red-300 px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-glow-red"
                  >
                    <FaSignOutAlt className="mr-2" />
                    Logout
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black/30 backdrop-blur-md rounded-lg mt-2">
              {[
                { name: "Home", icon: FiHome, path: "/" },
                { name: "My Projects", icon: FiFolder, path: "/projects" },
                { name: "Code Editor", icon: FaCode, path: "/editor/123" },
                { name: "About Us", icon: FiInfo, path: "/about" },
                { name: "Contact Us", icon: FiMail, path: "/contact" }
              ].map(({ name, icon: Icon, path }) => (
                <Button
                  key={name}
                  variant="ghost"
                  onClick={() => {
                    navigate(path);
                    setMenuOpen(false);
                  }}
                  className="w-full text-gray-300 hover:text-blue-400 px-3 py-2 rounded-md text-base font-medium flex items-center gap-2 transition-all duration-300 hover:bg-white/5"
                >
                  <Icon className="h-5 w-5" />
                  {name}
                </Button>
              ))}
              <div className="pt-4 pb-3 border-t border-gray-700">
                {!user?.email ? (
                  <div className="space-y-2">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        navigate("/login");
                        setMenuOpen(false);
                      }}
                      className="w-full text-blue-400 hover:text-blue-300 border border-blue-400/50 hover:border-blue-300 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300"
                    >
                      <FaSignInAlt className="mr-2" />
                      Login
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => {
                        navigate("/signup");
                        setMenuOpen(false);
                      }}
                      className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-300"
                    >
                      <FaUserPlus className="mr-2" />
                      Sign Up
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-300 px-3">
                      <FaUserCircle className="text-blue-400 h-5 w-5" />
                      <span className="text-sm font-medium">{user.email}</span>
                    </div>
                    <Button
                      variant="ghost"
                      onClick={handleLogout}
                      className="w-full text-red-400 hover:text-red-300 border border-red-400/50 hover:border-red-300 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300"
                    >
                      <FaSignOutAlt className="mr-2" />
                      Logout
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;