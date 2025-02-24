import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { jwtDecode } from "jwt-decode";
import { useUser } from "../context/userContext";
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState(null);
  const { setUserData } = useUser();

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/auth";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? "login" : "register";
    const url = `${API_BASE_URL}/${endpoint}`;
    const payload = isLogin ? { email, password } : { email, password, name };

    try {
      const response = await axios.post(url, payload);
      setMessage({ type: "success", text: response.data.message });

      if (isLogin && response.status === 200) {
        const { token } = response.data;
        localStorage.setItem("authTokenLogin", token);
        const decodedToken = jwtDecode(token);

        const userData = {
          id: decodedToken.userId,
          email: decodedToken.email,
          role: decodedToken.role,
        };
        setUserData(userData);
        const expiryTime = new Date(decodedToken.exp * 1000);

        setTimeout(() => {
          localStorage.removeItem("authTokenLogin");
          setUserData(null);
        }, expiryTime - Date.now());

        navigate("/");
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.error || "Something went wrong",
      });
    }
  };

  const handleOAuth = (provider) => {
    window.location.href = `${API_BASE_URL}/oauth/${provider}`;
  };

  return (
    <div className="relative flex min-h-screen flex-col lg:flex-row bg-[#030712] overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/50 via-gray-900 to-black" />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.07]" />
        <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full filter blur-3xl animate-orb-float" />
        <div className="absolute bottom-1/4 right-1/4 w-[35rem] h-[35rem] bg-gradient-to-r from-indigo-500/10 to-blue-500/10 rounded-full filter blur-3xl animate-orb-float-delayed" />
      </div>

      {/* Left side image */}
      <div className="flex-1 relative z-10">
        <div className="login-image-container w-full bg-cover bg-center relative">
          <img 
            src="/assects/images/LoginPage_asset.png" 
            alt="Login" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent lg:bg-gradient-to-l" />
        </div>
      </div>

      {/* Right side form */}
      <div className="flex-1 relative z-10 flex items-center justify-center px-6 py-8">
        <motion.div
          className="w-full max-w-[450px] p-8 rounded-2xl backdrop-blur-xl border border-blue-500/10 bg-slate-900/50"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <motion.h2
            className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {isLogin ? "Welcome Back" : "Create Account"}
          </motion.h2>

          {message && (
            <div className={`text-center p-3 mb-4 rounded-xl backdrop-blur-md ${
              message.type === "success" 
                ? "bg-green-500/20 text-green-300 border border-green-500/30" 
                : "bg-red-500/20 text-red-300 border border-red-500/30"
            }`}>
              {message.text}
            </div>
          )}

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Form fields with enhanced styling */}
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-lg font-medium text-gray-200">
                  Name
                </Label>
                <Input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-800/50 border border-blue-500/20 text-gray-200 
                           placeholder:text-gray-400 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20
                           hover:border-blue-500/30 transition-all duration-300"
                  placeholder="Enter your full name"
                  required={!isLogin}
                />
              </div>
            )}

            {/* Email and Password fields with similar styling */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-lg font-medium text-gray-200">
                Email Address
              </Label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-800/50 border border-blue-500/20 text-gray-200 
                         placeholder:text-gray-400 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20
                         hover:border-blue-500/30 transition-all duration-300"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-lg font-medium text-gray-200">
                Password
              </Label>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-800/50 border border-blue-500/20 text-gray-200 
                         placeholder:text-gray-400 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20
                         hover:border-blue-500/30 transition-all duration-300"
                placeholder="Enter your password"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full p-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold
                       hover:from-blue-500 hover:to-blue-400 transform hover:scale-[1.02] transition-all duration-300
                       focus:ring-2 focus:ring-blue-500/50 shadow-lg shadow-blue-500/20"
            >
              {isLogin ? "Login" : "Register"}
            </Button>
          </motion.form>

          <div className="mt-6 text-center">
            <motion.p
              className="text-lg text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <span
                className="cursor-pointer text-blue-400 hover:text-blue-300 transition-colors duration-300"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Register" : "Login"}
              </span>
            </motion.p>
          </div>

          <div className="mt-8 space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 text-gray-400 bg-slate-900/50">Or continue with</span>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <Button
                onClick={() => handleOAuth("google")}
                className="flex-1 p-3 rounded-xl bg-slate-800/80 border border-blue-500/20 text-gray-200
                         hover:border-blue-500/40 hover:bg-slate-800/90 transition-all duration-300
                         focus:ring-2 focus:ring-blue-500/20"
              >
                Google
              </Button>
              <Button
                onClick={() => handleOAuth("github")}
                className="flex-1 p-3 rounded-xl bg-slate-800/80 border border-blue-500/20 text-gray-200
                         hover:border-blue-500/40 hover:bg-slate-800/90 transition-all duration-300
                         focus:ring-2 focus:ring-blue-500/20"
              >
                GitHub
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
