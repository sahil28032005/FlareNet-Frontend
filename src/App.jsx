/**
 * @license
 * Flarenet - Proprietary Software
 * Copyright (c) 2024 Flarenet
 * All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 */

import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import LandingPage from './components/pages/LandingPage';
import Service from './components/pages/Service';
import DeploymentProgress from './components/pages/DeploymentProgress';
import DeployForm from './components/pages/DeployForm';
import LoginPage from './components/LoginPage';
import ProjectLister from './components/pages/ProjectLister';
import CodeEditorPage from './components/pages/CodeEditorPage';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { useUser } from './context/userContext';
import ProtectedRoute from './components/ProctedRoutes/ProtectedRoute';

// Create a separate component for the main app content
function AppContent() {
  const { user, setUserData } = useUser();
  const location = useLocation(); // Now this is correct

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
        <Route path="/editor/:projectId" element={
          // <ProtectedRoute>
            <CodeEditorPage />
          // </ProtectedRoute>
        } />
      </Routes>
      
      {location.pathname !== '/login' && location.pathname !== '/editor/:projectId' && <Footer />}
    </>
  );
}

// Wrap the entire app with Router
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;