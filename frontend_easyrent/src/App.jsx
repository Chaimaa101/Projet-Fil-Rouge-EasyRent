// App.jsx
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import Contact from "./components/homeComponents/Contact";
import Layout from "./components/Layout";
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
import CheckoutPage from "./pages/Client/CheckoutePage";
import ListVehicules from "./pages/ListVehicules";
import FavoriList from "./components/vehiculesListComponents/FavoritList";
import CarReservationCard from "./pages/Client/CarReservationCard";
import VehiculeForm from "./pages/Admin/Forms/VehiculeForm";
import HowItWorks from "./components/homeComponents/HowToUse";
import Blogs from "./components/homeComponents/Blogs";
import AboutUs from "./components/homeComponents/AboutUs";

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
        <Route path="/confirm/:nom" element={<ConfirmRegestration />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/howitworks" element={<HowItWorks />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/listVehicule" element={<ListVehicules />} />
        <Route path="/register" element={<Register />} />
        <Route path="/favoris" element={<FavoriList />} />
        <Route path="/vehicule/:id" element={<SingleVehicule />} />
        
        <Route path="/client/myReserv" element={<CarReservationCard />} />
        <Route path="/client/completeProfile" element={<CompleteDetails />} />
        <Route path="/client/checkout" element={<CheckoutPage />} />
        <Route path="/profile" element={<Profile />} />
        
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/vehicules" element={<Vehicules />} />
        <Route path="/admin/reservation" element={<Reservations />} />
        <Route path="/admin/brands" element={<Brands />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/avis" element={<Avis />} />
        <Route path="/admin/addVehicule" element={<VehiculeForm />} />
        <Route path="/admin/editVehicule/:id" element={<VehiculeForm isEdit={true} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
