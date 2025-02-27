import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { FirewallProvider } from './contexts/FirewallContext';
import ProtectedRoute from './components/ProtectedRoute';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NetworkTopology from './pages/NetworkTopology';
import FirewallRules from './pages/FirewallRules';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Notifications from './pages/Notifications';

function App() {
  return (
    <Router>
      <AuthProvider>
        <NotificationProvider>
          <FirewallProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/*"
                element={
                  <ProtectedRoute>
                    <div className="min-h-screen bg-purple-50">
                      <Sidebar />
                      <div className="ml-64">
                        <Header />
                        <main className="mt-16">
                          <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/topology" element={<NetworkTopology />} />
                            <Route path="/firewall" element={<FirewallRules />} />
                            <Route path="/analytics" element={<Analytics />} />
                            <Route path="/settings" element={<Settings />} />
                            <Route path="/notifications" element={<Notifications />} />
                          </Routes>
                        </main>
                      </div>
                    </div>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </FirewallProvider>
        </NotificationProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;