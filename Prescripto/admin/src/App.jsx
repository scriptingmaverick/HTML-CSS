import React, { useContext } from "react";
import Login from "./pages/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminContext } from "./context/AdminContext";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/admin/Dashboard";
import AddDoctor from "./pages/admin/AddDoctor";
import AllAppointments from "./pages/admin/AllAppointments";
import DoctorList from "./pages/admin/DoctorList";

import { DoctorContext } from "./context/DoctorContext";
import DoctorAppointment from "./pages/doctor/DoctorAppointment";
import DoctorProfile from "./pages/doctor/DoctorProfile";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";

const App = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  return aToken || dToken ? (
    <div className="bg-[#f8f7fd]">
      <ToastContainer />
      <NavBar />
      <div className="flex items-start ">
        <SideBar />
        <Routes>
          {/* ------------  Admin Routes ----------- */}

          <Route path="/" element={<></>} />
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/all-appointments" element={<AllAppointments />} />
          <Route path="/add-doctor" element={<AddDoctor />} />
          <Route path="/doctor-list" element={<DoctorList />} />

          {/* ------------  Doctor Routes ----------- */}

          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/doctor-appointments" element={<DoctorAppointment />} />
          <Route path="/doctor-profile" element={<DoctorProfile />} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  );
};

export default App;
