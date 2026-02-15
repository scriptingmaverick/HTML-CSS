import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Doctors from "./pages/doctors";
import Login from "./pages/login";
import About from "./pages/about";
import Myprofile from "./pages/myprofile";
import Appointment from "./pages/Appointment";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import Myappointments from "./pages/Myappointments";
import Contact from "./pages/Contact";

const App = () => {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/my-profile" element={<Myprofile />} />
        <Route path="/my-appointments" element={<Myappointments />} />
        <Route path="/appointment/:docId" element={<Appointment />} />
      </Routes>
      <Footer />
    </div>
  );
};
export default App;