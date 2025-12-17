// App.jsx
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import Contact from "./components/Contact";
import ListVehicules from "./pages/ListVehicules";
import Layout from "./components/Layout";
import ReserveForm from "./pages/Client/ReserveForm";
import Profile from "./pages/Client/Profile";
import ConfirmRegestration from "./pages/Auth/ConfirmRegestration";

function App() {
  return (
    <BrowserRouter>
    <Toaster position="top-center" />
    
      <Routes>
        <Route path="/" element={<Layout/>} >
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/listVehicule" element={<ListVehicules />} />
        <Route path="/register" element={<Register />} />
        <Route path="/client/reserveForm" element={<ReserveForm />} />
        <Route path="/client/profile" element={<Profile />} />
        <Route path="/confirm/:nom" element={<ConfirmRegestration />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
