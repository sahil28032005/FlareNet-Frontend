import React, { useState, useEffect } from 'react';
import NavBar from '../NavBar';
import HeroSection from '../HeroSection';
import FeaturesSection from '../FeaturesSection';
import Footer from '../Footer';
import { jwtDecode } from "jwt-decode";
import { useUser } from '../../context/userContext';
const LandingPage = () => {
  const { user, setUserData, removeUserData } = useUser();
  // Check if the user is logged in
  useEffect(() => {
    const token = localStorage.getItem("authTokenLogin");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (Date.now() < decodedToken.exp * 1000) {
          //user still loggeed in
          setUserData({
            email: decodedToken.email,
            role: decodedToken.role,
            id: decodedToken.userId,
          });
        }
      } catch (error) {
        console.error("Invalid token:", error.message);
        removeUserData();
      }
    }
  }, []);
  return (
    <div className="">
      {/* <NavBar username={username} /> */}
      <HeroSection />
      <FeaturesSection />
    </div>
  )
}

export default LandingPage