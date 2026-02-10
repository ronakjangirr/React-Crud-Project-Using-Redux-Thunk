import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css'
import Register from './auth/register/Register'
import Login from './auth/login/Login'
import AdminDashboard from './dashboards/admin/AdminDashboard';
import UserDashboard from './dashboards/user/UserDashboard';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* <Route path="admin/dashboard" element={<AdminDashboard />}/>
        <Route path="user/dashboard" element={<UserDashboard />}/> */}

         {/* Admin Protected Route */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* User Protected Route */}
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute role="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
