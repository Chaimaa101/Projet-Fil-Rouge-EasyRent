// App.jsx
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import Contact from "./components/homeComponents/Contact";
import ListVehicules from "./pages/ListVehicules";
import Layout from "./components/Layout";
import ReserveForm from "./pages/Client/ReserveForm";
import Profile from "./pages/Profile";
import ConfirmRegestration from "./pages/Auth/ConfirmRegestration";
import SingleVehicule from "./components/vehiculesListComponents/SingleVehicule";
import ToastMessage from "./components/common/ToastMessage";
import Dashboard from "./pages/Admin/Dashboard";
import Vehicules from "./pages/Admin/Vehicules";
import Reservations from "./pages/Admin/Reservations";
import Brands from "./pages/Admin/Brands";
import GlobalLoader from "./components/common/GlobalLoader";
import CompleteDetails from "./pages/Client/CompleteDetails";
import Users from "./pages/Admin/Users";
import Avis from "./pages/Admin/Avis";
import CheckoutForm from "./pages/Client/CheckoutForm";
import CheckoutPage from "./pages/Client/CheckoutePage";

function App() {
  const [appLoading,setAppLoading] = useState(true)
  useEffect(() => {
    const timer = setTimeout(() => {
      setAppLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (appLoading) {
    return <GlobalLoader />;
  }
  return (
    <BrowserRouter>
    <Toaster position="top-center" />
     <ToastMessage />
    
      <Routes>
        <Route path="/" element={<Layout/>} >
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/listVehicule" element={<ListVehicules />} />
        <Route path="/register" element={<Register />} />
        <Route path="/client/reserveForm" element={<ReserveForm />} />
        <Route path="/client/completeProfile" element={<CompleteDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/confirm/:nom" element={<ConfirmRegestration />} />
        <Route path="/VehiculeDetails/:id" element={<SingleVehicule />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/vehicules" element={<Vehicules />} />
        <Route path="/admin/reservation" element={<Reservations />} />
        <Route path="/admin/brands" element={<Brands />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/avis" element={<Avis />} />
        <Route path="/client/checkout" element={<CheckoutPage />} />


        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
