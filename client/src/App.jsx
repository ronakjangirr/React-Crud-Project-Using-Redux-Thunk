import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Register from './auth/register/Register'
import Login from './auth/login/Login'
import AdminDashboard from './dashboards/admin/AdminDashboard';
import UserDashboard from './dashboards/user/UserDashboard';
// import AdminProtectedRoute from "./routes/AdminProtectedRoute";

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="admin/dashboard" element={<AdminDashboard />}/>
        <Route path="user/dashboard" element={<UserDashboard />}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
