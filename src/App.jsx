import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import './App.css'
import LandingPage from './components/pages/LandingPage';
import Service from './components/pages/Service';
import DeploymentProgress from './components/pages/DeploymentProgress';
import DeployForm from './components/pages/DeployForm';
import LoginPage from './components/LoginPage';
import ProjectLister from './components/pages/ProjectLister';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { useUser } from './context/userContext';
import ProtectedRoute from './components/ProctedRoutes/ProtectedRoute'; //this will be route which authenticated user is logined or not


function App() {
  const { user, setUserData } = useUser();

  return (
    <>
      <Router>
        {/* plcae navbar here as common shared components */}
        <NavBar />
        <Routes>
          {/* public routes */}
          <Route path="/" element={<LandingPage />} />
          {/* Define Route for Login page */}
          <Route path="/login" element={<LoginPage />} />
          {/* Define Route for LandingPage */}

          {/* private riutes */}
          {/* Define Route for Service */}
          <Route path="/new" element={<ProtectedRoute><Service /></ProtectedRoute>} />

          {/* Define Route for progress page */}
          <Route path="/progress/:id" element={<ProtectedRoute><DeploymentProgress /></ProtectedRoute>} />

          {/* Define Route for actual hosting form */}
          <Route path="/service/:id" element={<ProtectedRoute><DeployForm /></ProtectedRoute>} />

          {/* Define Route for users pages */}
          {/* <Route path="/projects" element={<ProtectedRoute><ProjectLister /></ProtectedRoute>} /> */}
          <Route path="/projects" element={<ProjectLister />} />
        </Routes>
        {/* Conditionally render Footer */}
        {location.pathname !== '/login' && <Footer />}
      </Router>
    </>

  )
}

export default App
