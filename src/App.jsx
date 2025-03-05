import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import LandingPage from './components/pages/LandingPage';
import Service from './components/pages/Service';
import DeploymentProgress from './components/pages/DeploymentProgress';
import DeployForm from './components/pages/DeployForm';
import LoginPage from './components/LoginPage';
import ProjectLister from './components/pages/ProjectLister';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { useUser } from './context/userContext';
import ProtectedRoute from './components/ProctedRoutes/ProtectedRoute';

function App() {
  const { user, setUserData } = useUser();
  const location = useLocation(); // Move this inside the Router

  return (
    <>
      <NavBar />
      <Routes>
        {/* public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* private routes */}
        <Route path="/new" element={
          <ProtectedRoute>
            <Service />
          </ProtectedRoute>
        } />
        <Route path="/new/callback" element={
          <ProtectedRoute>
            <Service />
          </ProtectedRoute>
        } />
        
        <Route path="/progress/:id" element={
          <ProtectedRoute>
            <DeploymentProgress />
          </ProtectedRoute>
        } />
        <Route path="/service/:id" element={
          <ProtectedRoute>
            <DeployForm />
          </ProtectedRoute>
        } />
        <Route path="/projects" element={<ProjectLister />} />
      </Routes>
      
      {location.pathname !== '/login' && <Footer />}
    </>
  );
}

export default App;