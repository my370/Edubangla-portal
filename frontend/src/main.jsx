import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import "./index.css";

import App from "./App";

import Home from "./pages/Home";
import Institutions from "./pages/Institutions";
import InstitutionDetails from "./pages/InstitutionDetails";
import Admission from "./pages/Admission";
import AdmissionDetails from "./pages/AdmissionDetails";
import Scholarships from "./pages/Scholarships";
import News from "./pages/News";
import SavedInstitutions from "./pages/SavedInstitutions";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import StudentDashboard from "./pages/StudentDashboard";
import Admin from "./pages/Admin";
import ApplicationForm from "./pages/ApplicationForm";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import ProtectedRoute from "./components/auth/ProtectedRoute";

import { LanguageProvider } from "./context/LanguageContext";

import { ThemeProvider } from "./context/ThemeContext";

import AuthProvider from "./context/AuthContext";

const router = createBrowserRouter([

  {
    path: "/",
    element: <App />,
    children: [

      {
        index: true,
        element: <Home />,
      },

      {
        path: "institutions",
        element: <Institutions />,
      },

      {
        path: "institutions/:id",
        element: <InstitutionDetails />,
      },

      {
        path: "admission",
        element: <Admission />,
      },

      {
        path: "admission/:id",
        element: <AdmissionDetails />,
      },

      {
        path: "scholarships",
        element: <Scholarships />,
      },

      {
        path: "news",
        element: <News />,
      },

      {
        path: "saved",
        element: <SavedInstitutions />,
      },

      {
        path: "login",
        element: <Login />,
      },
      
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },

      {
        path: "reset-password/:token",
        element: <ResetPassword />,
      },

      {
        path: "register",
        element: <Register />,
      },

      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },

      {
        path: "student-dashboard",
         element: (
           <ProtectedRoute>
             <StudentDashboard />
           </ProtectedRoute>
        ),
      },

      {
        path: "apply/:id",
        element: (
          <ProtectedRoute>
            <ApplicationForm />
          </ProtectedRoute>
        ),
      },

      {
        path: "admin",
        element: (
          <ProtectedRoute role="Admin">
            <Admin />
          </ProtectedRoute>
        ),
      },

    ],
  },

]);


ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <React.StrictMode>

    <AuthProvider>
  <LanguageProvider>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </LanguageProvider>
</AuthProvider>

  </React.StrictMode>

);

