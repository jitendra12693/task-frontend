import React, { JSX } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoaderProvider, useLoader } from "./context/LoaderContext";
import Loader from "./components/Loader";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import { useAuth } from "./context/AuthContext";
import Nav from "./components/Nav";

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { token } = useAuth();
  if (!token) return <Navigate to="/login" replace />;
  return children;
};

function AppContent() {
  const { loading } = useLoader();
  return (
    <div className="app-root">
      <ToastContainer position="top-right" autoClose={3000} />
      {loading && <Loader />}
      <Nav />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <LoaderProvider>
      <AppContent />
    </LoaderProvider>
  );
}
